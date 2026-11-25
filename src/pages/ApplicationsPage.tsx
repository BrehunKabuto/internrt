import { useState } from 'react'
import { CheckCircleIcon, ServerIcon } from '../components/Icons'
import { PastelCard } from '../components/PastelCard'

type AppCategory = 'all' | 'web' | 'cloud' | 'streaming' | 'iot'

const applications: {
  id: string
  category: Exclude<AppCategory, 'all'>
  badge: string
  title: string
  desc: string
  tech: string[]
}[] = [
  {
    id: 'web',
    category: 'web',
    badge: 'ВЕБЗАСТОСУНКИ',
    title: 'Соціальні мережі, месенджери та портали',
    desc: 'Браузер завантажує інтерфейс (SPA), а всі нові повідомлення та оновлення стрічки підтягуються у фоні через API та WebSockets.',
    tech: ['HTTP/2', 'REST API', 'WebSockets'],
  },
  {
    id: 'cloud',
    category: 'cloud',
    badge: 'ХМАРНІ СЕРВІСИ',
    title: 'Онлайн-документи, диски та відеоконференції',
    desc: 'Замість збереження файлів на одному пристрої дані синхронізуються між розподіленими серверами у хмарі для спільної роботи.',
    tech: ['Синхронізація', 'WebRTC', 'Балансування навантаження'],
  },
  {
    id: 'stream',
    category: 'streaming',
    badge: 'СТРИМІНГ',
    title: 'Відеосервіси (4K) та музичні платформи',
    desc: 'Відео розбивається на короткі фрагменти по 2–4 секунди. Адаптивний плеєр автоматично підбирає якість під поточну швидкість інтернету.',
    tech: ['HLS / DASH', 'CDN-кешування', 'Буферизація'],
  },
  {
    id: 'iot',
    category: 'iot',
    badge: 'ІНТЕРНЕТ РЕЧЕЙ (IoT)',
    title: 'Розумний дім, датчики та міська інфраструктура',
    desc: 'Мільярди сенсорів передають показники температури, освітлення чи руху на сервери через легкі мережеві протоколи.',
    tech: ['MQTT', 'Wi-Fi / LoRaWAN', 'Хмарна телеметрія'],
  },
]

const filterButtons: { key: AppCategory; label: string }[] = [
  { key: 'all', label: 'Усі напрями' },
  { key: 'web', label: 'Вебзастосунки' },
  { key: 'cloud', label: 'Хмарні сервіси' },
  { key: 'streaming', label: 'Стримінг' },
  { key: 'iot', label: 'IoT' },
]

const httpCodes = [
  {
    code: '200 OK',
    meaning: 'Успішна відповідь',
    desc: 'Сервер знайшов ресурс, обробив запит і повернув HTML-сторінку або JSON-дані браузеру.',
    tone: 'text-[#2d6a4f] bg-[#e6f6ec] border-[#95d5b2]',
  },
  {
    code: '301 Moved',
    meaning: 'Постійне перенаправлення',
    desc: 'Сторінка переїхала на нову адресу (наприклад, з http:// на захищений https://). Браузер автоматично робить новий запит.',
    tone: 'text-[#2d6a4f] bg-[#f1faf4] border-[#b7e4c7]',
  },
  {
    code: '404 Not Found',
    meaning: 'Ресурс не знайдено',
    desc: 'Сервер працює, але за вказаним URL немає жодної сторінки або файлу — зазвичай через одруківку в адресі.',
    tone: 'text-amber-800 bg-amber-50 border-amber-200',
  },
  {
    code: '500 Server Error',
    meaning: 'Внутрішня помилка сервера',
    desc: 'Запит дійшов до сервера, але в його коді або базі даних стався збій під час формування відповіді.',
    tone: 'text-rose-800 bg-rose-50 border-rose-200',
  },
]

export function ApplicationsPage() {
  const [filter, setFilter] = useState<AppCategory>('all')
  const [selectedCode, setSelectedCode] = useState(httpCodes[0].code)

  const visibleApps =
    filter === 'all' ? applications : applications.filter((a) => a.category === filter)

  const activeHttp = httpCodes.find((h) => h.code === selectedCode) ?? httpCodes[0]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#40916c]">
          РОЗДІЛ 04 • ПРАКТИКА
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1b4332] tracking-tight">
          Практичне застосування
        </h1>
        <p className="text-base sm:text-lg text-[#3a5a40] leading-relaxed">
          Розуміння того, як браузер спілкується із сервером, лежить в основі веб-розробки,
          адміністрування мереж, хмарних технологій та щоденної роботи онлайн-сервісів.
        </p>
      </section>

      {/* Filter + Applications */}
      <section className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              type="button"
              onClick={() => setFilter(btn.key)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                filter === btn.key
                  ? 'bg-[#2d6a4f] text-white shadow-sm'
                  : 'border border-[#cbe7d5] bg-white/80 text-[#3a5a40] hover:bg-[#e6f6ec]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visibleApps.map((app) => (
            <PastelCard key={app.id} className="flex flex-col justify-between">
              <div>
                <div className="font-mono text-[11px] font-semibold text-[#40916c]">
                  {app.badge}
                </div>
                <h2 className="mt-2 text-xl font-bold text-[#1b4332]">{app.title}</h2>
                <p className="mt-2 text-sm text-[#4a6b5b] leading-relaxed">{app.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#e2f3e8] flex flex-wrap gap-2">
                {app.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbe7d5] bg-[#f4fbf6] px-2.5 py-1 text-xs font-medium text-[#2d6a4f]"
                  >
                    <CheckCircleIcon className="h-3.5 w-3.5 text-[#52b788]" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>
            </PastelCard>
          ))}
        </div>
      </section>

      {/* Interactive HTTP Status Inspector */}
      <section className="rounded-3xl border border-[#b7e4c7] bg-white/90 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#40916c]">
              <ServerIcon className="h-4 w-4" />
              <span>ІНТЕРАКТИВНИЙ ІНСПЕКТОР</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold text-[#1b4332]">
              Що відповідає сервер: коди стану HTTP
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {httpCodes.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setSelectedCode(item.code)}
                className={`rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCode === item.code
                    ? 'bg-[#2d6a4f] text-white'
                    : 'border border-[#cbe7d5] bg-[#f4fbf6] text-[#2d6a4f] hover:bg-[#d8f3dc]'
                }`}
              >
                {item.code}
              </button>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl border p-5 sm:p-6 ${activeHttp.tone}`}>
          <div className="font-mono text-sm font-bold">{activeHttp.code}</div>
          <div className="mt-1 text-lg font-bold">{activeHttp.meaning}</div>
          <p className="mt-2 text-sm leading-relaxed opacity-90">{activeHttp.desc}</p>
        </div>
      </section>
    </div>
  )
}
