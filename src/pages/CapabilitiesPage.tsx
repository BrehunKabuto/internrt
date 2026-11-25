import { useState } from 'react'
import {
  ActivityIcon,
  GlobeIcon,
  LayersIcon,
  LockIcon,
  ServerIcon,
  WifiIcon,
  ZapIcon,
} from '../components/Icons'
import { PastelCard } from '../components/PastelCard'

const capabilities = [
  {
    tag: 'DNS',
    title: 'Система доменних імен (DNS)',
    desc: 'Працює як глобальна адресна книга: перетворює зручні назви на кшталт google.com на числові IP-адреси серверів.',
    chips: ['A / AAAA записи', 'Кешування', 'Anycast'],
    icon: GlobeIcon,
  },
  {
    tag: 'HTTPS / TLS',
    title: 'Шифрування трафіку (TLS 1.3)',
    desc: 'Захищає дані між браузером і сервером так, що паролі та повідомлення неможливо прочитати або підмінити дорогою.',
    chips: ['SSL-сертифікати', 'Асиметричні ключі', 'Замок у браузері'],
    icon: LockIcon,
  },
  {
    tag: 'HTTP/2 & HTTP/3',
    title: 'Сучасні протоколи передачі',
    desc: 'Мультиплексування дозволяє завантажувати десятки файлів одночасно в одному з’єднанні, а HTTP/3 на базі QUIC усуває затримки при втраті пакетів.',
    chips: ['QUIC', 'Мультиплексування', 'Стиснення заголовків'],
    icon: ZapIcon,
  },
  {
    tag: 'CDN',
    title: 'Мережі доставки контенту (CDN)',
    desc: 'Зберігають копії зображень і відео на серверах у десятках країн, щоб користувач отримував контент із найближчого вузла.',
    chips: ['Edge-сервери', 'Мінімальний пінг', 'Захист від DDoS'],
    icon: ServerIcon,
  },
  {
    tag: 'WEBSOCKETS',
    title: 'Двосторонній зв’язок у реальному часі',
    desc: 'Постійний відкритий канал між браузером і сервером для миттєвих чатів, онлайн-ігор, біржових котирувань і спільного редагування.',
    chips: ['Full-Duplex', 'Низька затримка', 'Real-Time'],
    icon: WifiIcon,
  },
  {
    tag: 'REST & GRAPHQL',
    title: 'Взаємодія через API',
    desc: 'Сервери обмінюються структурованими даними (JSON) із мобільними додатками та фронтендом, розділяючи інтерфейс і логіку.',
    chips: ['JSON', 'RESTful API', 'Мікросервіси'],
    icon: LayersIcon,
  },
]

export function CapabilitiesPage() {
  const [fileSizeMb, setFileSizeMb] = useState(250)
  const [speedMbps, setSpeedMbps] = useState(100)
  const [cdnEnabled, setCdnEnabled] = useState(true)

  const effectiveSpeed = cdnEnabled ? speedMbps : Math.round(speedMbps * 0.65)
  const seconds = Math.max(0.1, (fileSizeMb * 8) / effectiveSpeed).toFixed(1)
  const pingMs = cdnEnabled ? 14 : 78

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#40916c]">
          РОЗДІЛ 03 • ТЕХНОЛОГІЇ ТА ПРОТОКОЛИ
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1b4332] tracking-tight">
          Основні можливості інтернету
        </h1>
        <p className="text-base sm:text-lg text-[#3a5a40] leading-relaxed">
          Сучасна мережа поєднує протоколи надійної доставки, криптографічний захист і
          розподілену інфраструктуру для миттєвого обміну даними по всій планеті.
        </p>
      </section>

      {/* Capabilities Grid */}
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => {
          const Icon = cap.icon
          return (
            <PastelCard key={cap.title} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#b7e4c7] bg-[#e6f6ec] text-[#2d6a4f]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-[#52796f]">
                    {cap.tag}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#1b4332]">{cap.title}</h2>
                <p className="mt-2 text-sm text-[#4a6b5b] leading-relaxed">{cap.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#e2f3e8] flex flex-wrap gap-2">
                {cap.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-lg border border-[#cbe7d5] bg-[#f4fbf6] px-2.5 py-1 text-xs font-medium text-[#2d6a4f]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </PastelCard>
          )
        })}
      </section>

      {/* Interactive Network Speed & CDN Calculator */}
      <section className="rounded-3xl border border-[#b7e4c7] bg-white/90 p-6 sm:p-8 shadow-[0_12px_36px_-16px_rgba(45,106,79,0.2)]">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2d6a4f]">
              <ActivityIcon className="h-4 w-4 text-[#40916c]" />
              <span>ІНТЕРАКТИВНИЙ КАЛЬКУЛЯТОР</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
              Швидкість завантаження та вплив CDN
            </h2>
            <p className="text-sm text-[#4a6b5b] leading-relaxed">
              Пам’ятайте: швидкість інтернету вимірюється у мегабітах за секунду (Мбіт/с),
              а розмір файлів — у мегабайтах (1 байт = 8 біт). Перевірте, як розмір файлу
              та близькість сервера впливають на час завантаження.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-[#1b4332] mb-1.5">
                  <span>Розмір файлу (МБ)</span>
                  <span className="font-mono font-bold text-[#2d6a4f]">{fileSizeMb} МБ</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={2000}
                  step={10}
                  value={fileSizeMb}
                  onChange={(e) => setFileSizeMb(Number(e.target.value))}
                  className="w-full accent-[#2d6a4f] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-[#1b4332] mb-1.5">
                  <span>Швидкість каналу (Мбіт/с)</span>
                  <span className="font-mono font-bold text-[#2d6a4f]">{speedMbps} Мбіт/с</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={10}
                  value={speedMbps}
                  onChange={(e) => setSpeedMbps(Number(e.target.value))}
                  className="w-full accent-[#2d6a4f] cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => setCdnEnabled((v) => !v)}
                className={`w-full flex items-center justify-between rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                  cdnEnabled
                    ? 'border-[#95d5b2] bg-[#e6f6ec] text-[#1b4332]'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <span>Завантаження з найближчого CDN-сервера</span>
                <span className="font-mono">{cdnEnabled ? 'УВІМКНЕНО' : 'ВИМКНЕНО'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#cbe7d5] bg-[#f4fbf6] p-5">
              <div className="text-xs font-medium text-[#52796f]">ЧАС ЗАВАНТАЖЕННЯ</div>
              <div className="mt-2 font-mono text-3xl font-bold text-[#1b4332]">
                {seconds} <span className="text-sm font-normal text-[#4a6b5b]">сек</span>
              </div>
              <p className="mt-1 text-xs text-[#4a6b5b]">
                при ефективній швидкості {effectiveSpeed} Мбіт/с
              </p>
            </div>

            <div className="rounded-2xl border border-[#cbe7d5] bg-[#f4fbf6] p-5">
              <div className="text-xs font-medium text-[#52796f]">ОРІЄНТОВНИЙ ПІНГ</div>
              <div className="mt-2 font-mono text-3xl font-bold text-[#2d6a4f]">
                {pingMs} <span className="text-sm font-normal text-[#4a6b5b]">мс</span>
              </div>
              <p className="mt-1 text-xs text-[#4a6b5b]">
                {cdnEnabled ? 'Локальний Edge-вузол' : 'Віддалений сервер'}
              </p>
            </div>

            <div className="sm:col-span-2 rounded-2xl border border-[#b7e4c7] bg-[#e6f6ec] p-5">
              <div className="text-xs font-semibold text-[#2d6a4f]">ФОРМУЛА РОЗРАХУНКУ</div>
              <p className="mt-1 font-mono text-xs sm:text-sm text-[#1b4332]">
                ({fileSizeMb} МБ × 8 біт) ÷ {effectiveSpeed} Мбіт/с = {seconds} секунд
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
