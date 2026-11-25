import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ActivityIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeIcon,
  LayersIcon,
  LockIcon,
  ServerIcon,
  SparklesIcon,
  WifiIcon,
} from '../components/Icons'
import { PastelCard } from '../components/PastelCard'

const quickSections = [
  {
    to: '/about',
    tag: 'Розділ 02',
    title: 'Про тему',
    desc: 'Модель TCP/IP, пакетна передача даних, маршрутизація та архітектура клієнт–сервер.',
    icon: LayersIcon,
  },
  {
    to: '/capabilities',
    tag: 'Розділ 03',
    title: 'Основні можливості',
    desc: 'DNS, HTTPS/TLS, HTTP/3, CDN, WebSockets та калькулятор швидкості завантаження.',
    icon: LockIcon,
  },
  {
    to: '/applications',
    tag: 'Розділ 04',
    title: 'Практичне застосування',
    desc: 'Веб-сервіси, стримінг, хмарні обчислення, IoT та інтерактивний інспектор HTTP-статусів.',
    icon: ServerIcon,
  },
  {
    to: '/facts',
    tag: 'Розділ 05',
    title: 'Цікаві факти',
    desc: 'Перше повідомлення в ARPANET, підводні кабелі, IPv6 та історія першого вебсайту.',
    icon: SparklesIcon,
  },
]

const journeySteps = [
  { label: 'DNS-запит', detail: 'Перетворення домену в IP-адресу (93.184.216.34)', ms: '12 мс' },
  { label: 'TCP Handshake', detail: 'Встановлення надійного з’єднання (SYN → SYN-ACK → ACK)', ms: '18 мс' },
  { label: 'TLS 1.3', detail: 'Узгодження криптографічних ключів для HTTPS', ms: '15 мс' },
  { label: 'HTTP/2 GET', detail: 'Надсилання запиту браузера на вебсервер', ms: '22 мс' },
  { label: '200 OK & DOM', detail: 'Отримання HTML/CSS/JS та відмальовування сторінки', ms: '28 мс' },
]

export function HomePage() {
  const [domain, setDomain] = useState('wikipedia.org')
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const runTrace = () => {
    setDone(false)
    setActiveStep(0)
    journeySteps.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStep(idx + 1)
        if (idx === journeySteps.length - 1) {
          setDone(true)
        }
      }, (idx + 1) * 420)
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      {/* Hero Section */}
      <section className="grid gap-10 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#a3d9b8] bg-[#e6f6ec] px-3.5 py-1.5 text-xs font-semibold text-[#2d6a4f]">
            <WifiIcon className="h-3.5 w-3.5 text-[#40916c]" />
            <span>ШЛЯХ ДАНИХ ЗА ЛІЧЕНІ МІЛІСЕКУНДИ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1b4332] leading-[1.1]">
            Як працює інтернет:{' '}
            <span className="bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#52b788] bg-clip-text text-transparent">
              від браузера до сервера
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#3a5a40] max-w-2xl leading-relaxed">
            Що відбувається за кулісами, коли ви натискаєте Enter в адресному рядку?
            Дізнайтеся про DNS, пакети TCP/IP, шифрування HTTPS, маршрутизацію та роботу
            сучасних серверів.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_-6px_rgba(45,106,79,0.45)] hover:bg-[#1b4332] transition-all"
            >
              <span>Розібрати архітектуру</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to="/capabilities"
              className="inline-flex items-center gap-2 rounded-xl border border-[#95d5b2] bg-white/85 px-5 py-3 text-sm font-semibold text-[#1b4332] hover:bg-[#d8f3dc] transition-all"
            >
              <span>Основні можливості</span>
            </Link>
          </div>
        </div>

        {/* Interactive Request Journey Tracer */}
        <div className="lg:col-span-5">
          <PastelCard className="p-6 space-y-4 bg-white/90">
            <div className="flex items-center justify-between border-b border-[#d8f3dc] pb-3">
              <div className="flex items-center gap-2">
                <GlobeIcon className="h-4 w-4 text-[#2d6a4f]" />
                <span className="font-mono text-xs font-semibold text-[#2d6a4f]">
                  REQUEST_TRACER
                </span>
              </div>
              <span className="rounded-full bg-[#d8f3dc] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#1b4332]">
                HTTPS
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                aria-label="Доменне ім'я для симуляції"
                className="flex-1 rounded-xl border border-[#cbe7d5] bg-[#f4fbf6] px-3.5 py-2 font-mono text-xs text-[#1b4332] focus:border-[#40916c] focus:outline-none"
              />
              <button
                type="button"
                onClick={runTrace}
                className="rounded-xl bg-[#2d6a4f] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1b4332] transition-colors cursor-pointer shrink-0"
              >
                Надіслати
              </button>
            </div>

            <div className="space-y-2 rounded-xl border border-[#e2f3e8] bg-[#f8fcfa] p-3.5">
              {activeStep === null ? (
                <p className="text-xs text-[#52796f] leading-relaxed">
                  Натисніть «Надіслати», щоб простежити 5 етапів запиту до{' '}
                  <span className="font-mono font-semibold text-[#1b4332]">
                    {domain || 'example.com'}
                  </span>
                  .
                </p>
              ) : (
                <div className="space-y-2">
                  {journeySteps.map((step, i) => {
                    const completed = activeStep > i
                    const current = activeStep === i
                    return (
                      <div
                        key={step.label}
                        className={`rounded-lg border px-3 py-2 transition-all ${
                          completed
                            ? 'border-[#a3d9b8] bg-[#e6f6ec]'
                            : current
                              ? 'border-[#74c69d] bg-white'
                              : 'border-transparent bg-transparent opacity-45'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#1b4332]">
                          <span>
                            {i + 1}. {step.label}
                          </span>
                          <span className="font-mono text-[11px] text-[#40916c]">
                            {completed ? step.ms : current ? '...' : ''}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#4a6b5b]">{step.detail}</p>
                      </div>
                    )
                  })}
                  {done && (
                    <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-[#2d6a4f]">
                      <CheckCircleIcon className="h-4 w-4 text-[#40916c]" />
                      <span>Сторінку {domain || 'example.com'} завантажено за 95 мс!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </PastelCard>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { value: '5.5 млрд+', label: 'користувачів інтернету у світі' },
          { value: '< 100 мс', label: 'середній час відгуку сучасних вебсерверів' },
          { value: '1.4M+ км', label: 'підводних оптоволоконних кабелів на дні океанів' },
          { value: '95%+', label: 'вебтрафіку сьогодні захищено протоколом HTTPS' },
        ].map((stat) => (
          <PastelCard key={stat.label} tone="sage" className="p-5">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#2d6a4f]">
              {stat.value}
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-[#4a6b5b] leading-snug">
              {stat.label}
            </p>
          </PastelCard>
        ))}
      </section>

      {/* Sections Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#40916c]">
              СТРУКТУРА ГІДУ
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-[#1b4332]">
              Основні розділи сайту
            </h2>
          </div>
          <p className="text-sm text-[#4a6b5b] max-w-md">
            Вивчайте мережеві технології крок за кроком: теорія, протоколи, практика та факти.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickSections.map((sec) => {
            const Icon = sec.icon
            return (
              <Link key={sec.to} to={sec.to} className="block h-full">
                <PastelCard className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#b7e4c7] bg-[#e6f6ec] text-[#2d6a4f]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-[#52796f]">{sec.tag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1b4332] group-hover:text-[#2d6a4f] transition-colors">
                      {sec.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4a6b5b] leading-relaxed">{sec.desc}</p>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2d6a4f]">
                    <span>Відкрити</span>
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </PastelCard>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Callout */}
      <section className="rounded-3xl border border-[#b7e4c7] bg-gradient-to-r from-[#e6f6ec] via-[#f1faf4] to-[#e9f5db] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#95d5b2] bg-white/80 text-[#2d6a4f]">
            <ActivityIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1b4332]">
              Хочете перевірити швидкість передачі даних або HTTP-коди?
            </h3>
            <p className="mt-1 text-sm text-[#3a5a40]">
              Скористайтеся калькулятором завантаження файлів або інтерактивним інспектором відповідей сервера.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            to="/capabilities"
            className="rounded-xl bg-[#2d6a4f] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1b4332] transition-colors"
          >
            Калькулятор мережі
          </Link>
          <Link
            to="/applications"
            className="rounded-xl border border-[#95d5b2] bg-white px-4 py-2.5 text-sm font-medium text-[#1b4332] hover:bg-[#d8f3dc] transition-colors"
          >
            Інспектор HTTP
          </Link>
        </div>
      </section>
    </div>
  )
}
