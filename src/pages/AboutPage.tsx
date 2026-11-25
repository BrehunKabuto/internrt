import { useState } from 'react'
import { GlobeIcon, LayersIcon, ServerIcon } from '../components/Icons'
import { PastelCard } from '../components/PastelCard'

const tcpIpLayers = [
  {
    id: 'app',
    num: 'РІВЕНЬ 4',
    title: 'Прикладний рівень (Application)',
    short: 'Протоколи, з якими безпосередньо взаємодіють браузер і вебсервер.',
    desc: 'Саме тут формуються HTTP-запити на отримання вебсторінки, DNS-запити на пошук IP-адреси чи поштові повідомлення. Дані готуються до відправлення в мережу.',
    protocols: ['HTTP / HTTPS', 'DNS', 'WebSocket', 'SMTP'],
  },
  {
    id: 'transport',
    num: 'РІВЕНЬ 3',
    title: 'Транспортний рівень (Transport)',
    short: 'Розбиває дані на сегменти та гарантує їхню доставку без втрат.',
    desc: 'Протокол TCP нумерує кожен фрагмент даних, перевіряє цілісність і просить повторно надіслати загублені частини. Для відеодзвінків чи ігор частіше використовують швидкий UDP.',
    protocols: ['TCP', 'UDP', 'QUIC', 'Порти (80, 443)'],
  },
  {
    id: 'internet',
    num: 'РІВЕНЬ 2',
    title: 'Мережевий рівень (Internet)',
    short: 'Визначає IP-адреси відправника й отримувача та прокладає маршрут.',
    desc: 'Кожен фрагмент стає IP-пакетом із заголовком, де вказано IP-адресу призначення. Маршрутизатори (роутери) по всьому світу передають пакет від вузла до вузла за протоколом BGP.',
    protocols: ['IPv4 / IPv6', 'BGP маршрутизація', 'ICMP (ping)'],
  },
  {
    id: 'link',
    num: 'РІВЕНЬ 1',
    title: 'Канальний рівень (Network Access)',
    short: 'Фізична передача бітів через кабелі, Wi-Fi або оптичне волокно.',
    desc: 'Пакети перетворюються на електричні імпульси, радіохвилі (Wi-Fi / 5G) або світлові сигнали в оптоволоконних кабелях, що з’єднують континенти.',
    protocols: ['Ethernet', 'Wi-Fi (802.11)', 'Оптоволокно', 'MAC-адреси'],
  },
]

export function AboutPage() {
  const [selectedId, setSelectedId] = useState('app')
  const activeLayer = tcpIpLayers.find((l) => l.id === selectedId) ?? tcpIpLayers[0]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#40916c]">
          РОЗДІЛ 02 • АРХІТЕКТУРА МЕРЕЖІ
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1b4332] tracking-tight">
          Про тему: як влаштований інтернет
        </h1>
        <p className="text-base sm:text-lg text-[#3a5a40] leading-relaxed">
          Інтернет — це глобальна децентралізована «мережа мереж», яка з’єднує мільярди
          пристроїв. Вона не має єдиного центру керування: дані подорожують у вигляді
          маленьких пакетів найшвидшим доступним маршрутом.
        </p>
      </section>

      {/* Interactive TCP/IP Stack */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
            Чотири рівні моделі TCP/IP
          </h2>
          <p className="mt-1 text-sm text-[#4a6b5b]">
            Натисніть на будь-який рівень, щоб побачити його роль у доставці сторінки від сервера до браузера.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-3">
            {tcpIpLayers.map((layer) => {
              const isSelected = layer.id === activeLayer.id
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedId(layer.id)}
                  className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#52b788] bg-[#e6f6ec] shadow-[0_10px_25px_-12px_rgba(45,106,79,0.28)]'
                      : 'border-[#cde2d4] bg-white/80 hover:border-[#95d5b2]'
                  }`}
                >
                  <div className="font-mono text-[11px] font-semibold text-[#40916c]">
                    {layer.num}
                  </div>
                  <div className="mt-1 text-base sm:text-lg font-bold text-[#1b4332]">
                    {layer.title}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[#4a6b5b]">{layer.short}</p>
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-7">
            <PastelCard className="p-6 sm:p-8 space-y-6 bg-white/95">
              <div className="flex items-center justify-between border-b border-[#d8f3dc] pb-4">
                <div>
                  <div className="font-mono text-xs font-semibold text-[#40916c]">
                    {activeLayer.num}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-[#1b4332]">
                    {activeLayer.title}
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8f3dc] text-[#1b4332]">
                  <LayersIcon className="h-6 w-6" />
                </div>
              </div>

              <p className="text-[#3a5a40] leading-relaxed">{activeLayer.desc}</p>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#52796f] mb-2.5">
                  Ключові протоколи та технології
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.protocols.map((proto) => (
                    <span
                      key={proto}
                      className="rounded-xl border border-[#b7e4c7] bg-[#f1faf4] px-3 py-1.5 font-mono text-xs font-medium text-[#1b4332]"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>
            </PastelCard>
          </div>
        </div>
      </section>

      {/* Client-Server vs Packets */}
      <section className="grid gap-5 md:grid-cols-3">
        <PastelCard tone="mint">
          <GlobeIcon className="h-6 w-6 text-[#2d6a4f] mb-3" />
          <h3 className="text-lg font-bold text-[#1b4332]">Клієнт (Браузер)</h3>
          <p className="mt-2 text-sm text-[#4a6b5b] leading-relaxed">
            Формує запит, отримує файли HTML, CSS, JavaScript і зображення та збирає з них
            інтерактивну вебсторінку на вашому екрані.
          </p>
        </PastelCard>

        <PastelCard tone="sage">
          <LayersIcon className="h-6 w-6 text-[#2d6a4f] mb-3" />
          <h3 className="text-lg font-bold text-[#1b4332]">Пакетна передача</h3>
          <p className="mt-2 text-sm text-[#4a6b5b] leading-relaxed">
            Великі файли не передаються суцільним потоком — вони діляться на тисячі пакетів,
            кожен з яких може йти власним маршрутом і збирається на фініші.
          </p>
        </PastelCard>

        <PastelCard tone="pistachio">
          <ServerIcon className="h-6 w-6 text-[#2d6a4f] mb-3" />
          <h3 className="text-lg font-bold text-[#1b4332]">Вебсервер</h3>
          <p className="mt-2 text-sm text-[#4a6b5b] leading-relaxed">
            Потужний комп’ютер у дата-центрі, який постійно слухає запити, звертається до
            бази даних і повертає потрібні дані клієнту.
          </p>
        </PastelCard>
      </section>
    </div>
  )
}
