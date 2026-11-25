import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { CloseIcon, GlobeIcon, MenuIcon, WifiIcon } from './Icons'

const navItems = [
  { to: '/', label: 'Головна' },
  { to: '/about', label: 'Про тему' },
  { to: '/capabilities', label: 'Основні можливості' },
  { to: '/applications', label: 'Практичне застосування' },
  { to: '/facts', label: 'Цікаві факти' },
]

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f4faf6] text-[#183828] overflow-x-hidden">
      {/* Pastel green ambient background */}
      <div className="pointer-events-none fixed inset-0 net-dots opacity-65" />
      <div className="pointer-events-none fixed -top-40 -left-24 h-[420px] w-[420px] rounded-full bg-[#b7e4c7]/45 blur-[110px]" />
      <div className="pointer-events-none fixed top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-[#d8f3dc]/75 blur-[110px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 h-[320px] w-[520px] rounded-full bg-[#e9f5db]/60 blur-[120px]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#cbe7d5] bg-[#f7fcf9]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#95d5b2] bg-[#d8f3dc] text-[#1b4332] shadow-sm group-hover:bg-[#b7e4c7] transition-colors">
                <GlobeIcon className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-base font-bold tracking-tight text-[#1b4332]">
                  Net<span className="text-[#40916c]">Flow</span>
                </div>
                <div className="text-[11px] font-medium text-[#52796f]">
                  Від браузера до сервера
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#d8f3dc] text-[#1b4332] border border-[#95d5b2] shadow-sm font-semibold'
                        : 'text-[#3a5a40] hover:text-[#1b4332] hover:bg-[#e9f5ee] border border-transparent'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Status Badge + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#a3d9b8] bg-[#e6f6ec] px-3 py-1 text-xs font-medium text-[#2d6a4f]">
                <WifiIcon className="h-3.5 w-3.5 text-[#40916c]" />
                <span>HTTPS • TCP/IP</span>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center rounded-xl border border-[#b7e4c7] bg-white/80 p-2 text-[#1b4332] hover:bg-[#d8f3dc] transition-colors"
                aria-label="Відкрити меню навігації"
              >
                {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <nav className="lg:hidden border-t border-[#d8f3dc] py-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold'
                        : 'text-[#3a5a40] hover:bg-[#eaf6ee] hover:text-[#1b4332]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#cbe7d5] bg-[#eef7f1]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div>
              <div className="flex items-center gap-2.5 font-display text-base font-bold text-[#1b4332]">
                <GlobeIcon className="h-5 w-5 text-[#40916c]" />
                <span>NetFlow</span>
              </div>
              <p className="mt-3 text-sm text-[#4a6b5b] max-w-sm leading-relaxed">
                Освітній гід про те, як працює інтернет: від введення URL у браузері та DNS-запиту до маршрутизації пакетів, TLS-шифрування й відповіді сервера.
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2d6a4f] mb-3">
                Розділи
              </div>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-[#4a6b5b] hover:text-[#1b4332] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:text-right">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2d6a4f] mb-3">
                Стек проєкту
              </div>
              <div className="inline-flex flex-wrap md:justify-end gap-2 text-xs font-medium">
                <span className="rounded-lg border border-[#b7e4c7] bg-white/80 px-2.5 py-1 text-[#2d6a4f]">
                  React 19
                </span>
                <span className="rounded-lg border border-[#b7e4c7] bg-white/80 px-2.5 py-1 text-[#2d6a4f]">
                  Tailwind CSS
                </span>
                <span className="rounded-lg border border-[#95d5b2] bg-[#d8f3dc] px-2.5 py-1 text-[#1b4332]">
                  Pastel Green
                </span>
              </div>
              <p className="mt-4 text-xs text-[#52796f]">
                © {new Date().getFullYear()} NetFlow • Як працює інтернет
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
