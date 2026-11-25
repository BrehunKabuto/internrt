import { useState } from 'react'
import { SparklesIcon, ZapIcon } from '../components/Icons'
import { PastelCard } from '../components/PastelCard'

type FactCategory = 'all' | 'history' | 'infra' | 'protocols'

interface NetFact {
  id: number
  category: Exclude<FactCategory, 'all'>
  badge: string
  metric: string
  title: string
  desc: string
}

const facts: NetFact[] = [
  {
    id: 1,
    category: 'history',
    badge: 'ІСТОРІЯ • 1969',
    metric: '«LO»',
    title: 'Перше повідомлення в інтернеті обірвалося на двох літерах',
    desc: 'У жовтні 1969 року дослідники намагалися передати слово «LOGIN» між двома комп’ютерами мережі ARPANET. Після перших двох літер «LO» система зависла — саме так увійшло в історію перше мережеве повідомлення.',
  },
  {
    id: 2,
    category: 'history',
    badge: 'ВЕБ • 1991',
    metric: 'CERN',
    title: 'Перший у світі вебсайт досі працює',
    desc: 'Тім Бернерс-Лі створив перший вебсайт у 1991 році в лабораторії CERN на комп’ютері NeXT. Він складався лише з простого тексту й гіперпосилань, що пояснювали, як користуватися Всесвітньою павутиною.',
  },
  {
    id: 3,
    category: 'infra',
    badge: 'ІНФРАСТРУКТУРА',
    metric: '99%',
    title: 'Майже весь міжнародний трафік іде не через супутники, а під водою',
    desc: 'Близько 99% міжконтинентальних даних передається по оптоволоконних кабелях на дні океанів. Світловий сигнал у скляному волокні набагато швидший і стабільніший за супутниковий зв’язок.',
  },
  {
    id: 4,
    category: 'protocols',
    badge: 'ПРОТОКОЛИ',
    metric: '3.4×10³⁸',
    title: 'IPv6 вистачить, щоб дати адресу кожній піщинці на Землі',
    desc: 'Старий стандарт IPv4 мав близько 4.3 мільярда адрес і вже вичерпався. Новий IPv6 використовує 128-бітні адреси — це 340 ундецильйонів комбінацій.',
  },
  {
    id: 5,
    category: 'history',
    badge: 'ІСТОРІЯ • 1993',
    metric: 'Кавоварка',
    title: 'Першу вебкамеру винайшли, щоб не ходити дарма по каву',
    desc: 'У 1991–1993 роках дослідники Кембриджського університету встановили камеру навпроти кавоварки в коридорі, щоб бачити по локальній мережі, чи залишилася там свіжа кава.',
  },
  {
    id: 6,
    category: 'protocols',
    badge: 'ПРОТОКОЛИ',
    metric: '404',
    title: 'Помилка 404 — це просто числовий код категорії «Клієнтська помилка»',
    desc: 'У стандарті HTTP усі коди на 4xx означають помилку на боці клієнта, а 404 закріплено за відсутнім ресурсом. Популярна легенда про «кімнату 404 у CERN» — це міф, але код став одним із найвідоміших символів мережі.',
  },
]

const categories: { key: FactCategory; label: string }[] = [
  { key: 'all', label: 'Усі факти' },
  { key: 'history', label: 'Історія' },
  { key: 'infra', label: 'Інфраструктура' },
  { key: 'protocols', label: 'Протоколи' },
]

export function FactsPage() {
  const [category, setCategory] = useState<FactCategory>('all')
  const [spotlightIndex, setSpotlightIndex] = useState(0)

  const filteredFacts =
    category === 'all' ? facts : facts.filter((f) => f.category === category)

  const spotlight = facts[spotlightIndex]

  const nextFact = () => {
    setSpotlightIndex((prev) => (prev + 1) % facts.length)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#40916c]">
          РОЗДІЛ 05 • ПІЗНАВАЛЬНО
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1b4332] tracking-tight">
          Цікаві факти про інтернет
        </h1>
        <p className="text-base sm:text-lg text-[#3a5a40] leading-relaxed">
          Несподівані історії створення глобальної мережі, океанські кабелі та цифри, які
          стоять за кожним відкритим сайтом.
        </p>
      </section>

      {/* Spotlight Card */}
      <section className="rounded-3xl border border-[#95d5b2] bg-gradient-to-br from-[#e6f6ec] via-[#f4fbf6] to-[#e9f5db] p-6 sm:p-8 shadow-[0_12px_34px_-16px_rgba(45,106,79,0.25)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2d6a4f]">
              <SparklesIcon className="h-4 w-4 text-[#40916c]" />
              <span>ФАКТ У ФОКУСІ • {spotlight.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b4332]">
              {spotlight.title}
            </h2>
            <p className="text-sm sm:text-base text-[#3a5a40] leading-relaxed">
              {spotlight.desc}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
            <div className="rounded-2xl border border-[#a3d9b8] bg-white/90 px-5 py-3 font-mono text-2xl font-bold text-[#2d6a4f]">
              {spotlight.metric}
            </div>
            <button
              type="button"
              onClick={nextFact}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2d6a4f] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1b4332] transition-colors cursor-pointer"
            >
              <ZapIcon className="h-4 w-4" />
              <span>НАСТУПНИЙ ФАКТ</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter + Facts */}
      <section className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategory(cat.key)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                category === cat.key
                  ? 'bg-[#2d6a4f] text-white'
                  : 'border border-[#cbe7d5] bg-white/80 text-[#3a5a40] hover:bg-[#e6f6ec]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredFacts.map((fact) => (
            <PastelCard key={fact.id} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] font-semibold text-[#40916c]">
                  {fact.badge}
                </span>
                <span className="rounded-lg border border-[#b7e4c7] bg-[#e6f6ec] px-2.5 py-0.5 font-mono text-xs font-bold text-[#1b4332]">
                  {fact.metric}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1b4332]">{fact.title}</h3>
              <p className="text-sm text-[#4a6b5b] leading-relaxed">{fact.desc}</p>
            </PastelCard>
          ))}
        </div>
      </section>
    </div>
  )
}
