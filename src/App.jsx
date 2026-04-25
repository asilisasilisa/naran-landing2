import { useState } from 'react'

// ==================== DATA ====================

const motos = [
  {
    id: 'hero-eco-t',
    name: 'Hero Eco T',
    year: 2027,
    condition: 'New',
    deposit: 500000,
    price12: 200000,
    price18: 160000,
    specs: { cc: '97.2 cc', motor: '4 Stroke', hp: '8.2 HP', tank: '9.1 L' },
  },
  {
    id: 'akt-nkd-125',
    name: 'AKT NKD 125',
    year: 2027,
    condition: 'New',
    deposit: 500000,
    price12: 200000,
    price18: 160000,
    specs: { cc: '124 cc', motor: '4 Stroke', hp: '10.34 HP', tank: '9.8 L' },
  },
  {
    id: 'hero-eco-deluxe',
    name: 'Hero Eco Deluxe',
    year: 2027,
    condition: 'New',
    deposit: 600000,
    price12: 240000,
    price18: 200000,
    specs: { cc: '97.2 cc', motor: '4 Stroke', hp: '8.2 HP', tank: '9.5 L' },
  },
  {
    id: 'hero-splendor-xpro',
    name: 'Hero Splendor XPro',
    year: 2027,
    condition: 'New',
    deposit: 600000,
    price12: 250000,
    price18: 205000,
    specs: { cc: '109.15 cc', motor: '4 Stroke', hp: '9.1 HP', tank: '9.5 L' },
  },
]

const reviews = [
  {
    name: 'Juan G.',
    platform: 'Rappi · 8 months with naran',
    text: "I couldn't afford a moto. With naran I started working fast. 8 months in, everything's good — paying little by little.",
  },
  {
    name: 'José R.',
    platform: 'Rappi + DiDi · 5 months with naran',
    text: "No bank, no hassle. Got my moto fast and I'm already earning. Pretty simple.",
  },
  {
    name: 'Camilo L.',
    platform: 'Rappi + Yango · 11 months with naran',
    text: "Had doubts at first, but it's worked out. I work at my own pace and I'm almost done paying off the moto.",
  },
]

const faqs = [
  {
    q: 'What if the moto breaks down?',
    a: "Gas and maintenance are on you, but remember — the moto will be yours at the end! We're always here to help.",
  },
  {
    q: 'Do I need a deposit?',
    a: "Yes! But it's flexible — from $500.000 COP. Pay in full or split into weekly payments within 1 month.",
  },
  {
    q: 'Can I work on any platform?',
    a: 'Yes! Rappi, DiDi Food, Yango, or any delivery app. Work the hours you want, on the platform you choose.',
  },
  {
    q: 'Will the moto be mine?',
    a: "Yes! Complete all payments and it's 100% yours. You're paying it off while you earn.",
  },
]

// ==================== HELPERS ====================

const fmt = (n) => '$' + Math.round(n).toLocaleString('es-CO')

const HOURLY_RATE = 24000
const COMMISSION_PCT = 0.104
const GAS_PCT = 0.074

// ==================== HEADER ====================

function Header({ goHome }) {
  return (
    <header className="sticky top-0 z-50 bg-[#C8F437] px-5 py-3 flex items-center justify-between">
      <button onClick={goHome} className="text-black font-black text-2xl tracking-tight">
        naran.
      </button>
      <span className="text-black/60 text-sm font-medium">Bogotá</span>
    </header>
  )
}

// ==================== CATALOG ====================

function MotoCard({ moto, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#111820] border border-gray-800 rounded-2xl p-4 cursor-pointer hover:border-[#C8F437]/30 transition-all"
    >
      <div className="bg-[#1A2230] rounded-xl h-40 flex items-center justify-center mb-3">
        <span className="text-5xl">🏍️</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="bg-[#C8F437] text-black text-xs font-bold px-2 py-0.5 rounded-full">
          {moto.condition}
        </span>
        <span className="text-gray-500 text-sm">{moto.year}</span>
      </div>
      <h3 className="text-white font-bold text-lg">{moto.name}</h3>
      <p className="text-[#C8F437] font-bold text-2xl mt-1">
        {fmt(moto.price18)}
        <span className="text-gray-500 text-sm font-normal"> /week</span>
      </p>
      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-[#1A2230] border border-gray-700 text-white text-sm py-2.5 rounded-xl font-medium">
          See details
        </button>
        <button className="flex-1 bg-[#C8F437] text-black text-sm font-bold py-2.5 rounded-xl">
          Apply now →
        </button>
      </div>
    </div>
  )
}

function CatalogSection({ openMoto }) {
  return (
    <section className="px-4 py-8">
      <h1 className="text-white text-2xl font-bold mb-1">Your moto for delivery work</h1>
      <p className="text-gray-400 text-sm mb-6">
        Choose your moto. Pay it off with what you earn.
      </p>
      <div className="space-y-4">
        {motos.map((moto) => (
          <MotoCard key={moto.id} moto={moto} onClick={() => openMoto(moto.id)} />
        ))}
      </div>
    </section>
  )
}

// ==================== ADVANTAGES ====================

function AdvantagesSection() {
  const items = [
    { icon: '🚀', title: 'Approved in 24h', desc: 'Reserve, we check docs, you ride' },
    { icon: '📄', title: 'Only 4 documents', desc: 'ID · License · Utility bill · Reference' },
    { icon: '💰', title: 'Flexible deposit', desc: 'From $500K — pay full or weekly within 1 month' },
    { icon: '🛡️', title: 'Everything included', desc: 'SOAT + GPS + 24/7 support' },
  ]

  return (
    <section className="px-4 py-8">
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <div key={i} className="bg-[#111820] border border-gray-800 rounded-xl p-4">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-white font-bold text-sm mt-2">{item.title}</h3>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-gray-600 text-xs text-center mt-4">
        No bank · No co-signer · No credit history needed
      </p>
    </section>
  )
}

// ==================== PROCESS ====================

function ProcessSection() {
  const steps = [
    { icon: '🏍️', label: 'Choose', sub: 'your moto' },
    { icon: '📄', label: 'Upload', sub: 'your docs now' },
    { icon: '✍️', label: 'Sign', sub: 'at our office' },
    { icon: '🔑', label: 'Ride', sub: 'out!' },
  ]

  return (
    <section className="px-4 py-8">
      <h2 className="text-white text-xl font-bold text-center mb-6">4 steps. That's it.</h2>
      <div className="grid grid-cols-4 gap-2">
        {steps.map((s, i) => (
          <div key={i} className="text-center">
            <span className="text-3xl">{s.icon}</span>
            <p className="text-white font-bold text-sm mt-2">{s.label}</p>
            <p className="text-gray-500 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ==================== REVIEWS ====================

function ReviewsSection() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-white text-xl font-bold mb-4">What our drivers say</h2>
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="bg-[#111820] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {r.name[0]}
              </div>
              <div>
                <p className="text-white font-bold text-sm">{r.name}</p>
                <p className="text-gray-500 text-xs">{r.platform}</p>
              </div>
            </div>
            <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-gray-300 text-sm italic leading-relaxed">"{r.text}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ==================== FAQ ====================

function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="px-4 py-8">
      <h2 className="text-white text-xl font-bold mb-4">FAQ</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-[#111820] border border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left p-4 flex justify-between items-center"
            >
              <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
              <span className="text-gray-500 text-xl flex-shrink-0">
                {open === i ? '−' : '+'}
              </span>
            </button>
            {open === i && (
              <div className="px-4 pb-4">
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ==================== FORM ====================

function FormSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    moto: '',
    term: '18',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `Hola! Quiero aplicar:\n\nNombre: ${form.name}\nTeléfono: ${form.phone}\nCiudad: Bogotá\nMoto: ${form.moto}\nPlazo: ${form.term} meses`
    window.open(`https://wa.me/573001234567?text=${encodeURIComponent(msg)}`)
  }

  return (
    <section className="px-4 py-8">
      <h2 className="text-white text-xl font-bold mb-1">Apply now</h2>
      <p className="text-gray-400 text-sm mb-4">Get your moto in 24h</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-[#111820] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:border-[#C8F437] outline-none"
          required
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-[#111820] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:border-[#C8F437] outline-none"
          required
        />
        <div className="bg-[#111820] border border-gray-800 text-gray-400 rounded-xl px-4 py-3 text-sm">
          📍 Bogotá
        </div>
        <select
          value={form.moto}
          onChange={(e) => setForm({ ...form, moto: e.target.value })}
          className="w-full bg-[#111820] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm focus:border-[#C8F437] outline-none"
          required
        >
          <option value="">Select a moto</option>
          {motos.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name} — {fmt(m.price18)}/wk
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          {['18', '12'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm({ ...form, term: t })}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${
                form.term === t
                  ? 'bg-[#C8F437] text-black'
                  : 'bg-[#111820] border border-gray-800 text-gray-500'
              }`}
            >
              {t} months
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-[#C8F437] text-black font-bold py-3.5 rounded-xl text-lg hover:bg-[#d4f94d] transition"
        >
          Apply now →
        </button>
      </form>
    </section>
  )
}

// ==================== FOOTER ====================

function Footer() {
  return (
    <footer className="px-4 py-8 border-t border-gray-800/50">
      <div className="text-center">
        <p className="text-white font-black text-2xl mb-2">naran.</p>
        <p className="text-gray-600 text-xs">© 2025 naran. All rights reserved.</p>
      </div>
    </footer>
  )
}

// ==================== MOTO PAGE ====================

function MotoPage({ moto, goHome }) {
  const [term, setTerm] = useState('18')
  const [showCalc, setShowCalc] = useState(false)
  const [hours, setHours] = useState(8)
  const [days, setDays] = useState(6)

  const price = term === '18' ? moto.price18 : moto.price12

  const defaultGross = 8 * 6 * HOURLY_RATE
  const defaultCommission = defaultGross * COMMISSION_PCT
  const defaultGas = defaultGross * GAS_PCT
  const defaultNet = defaultGross - price - defaultCommission - defaultGas

  const gross = hours * days * HOURLY_RATE
  const commission = gross * COMMISSION_PCT
  const gas = gross * GAS_PCT
  const net = gross - price - commission - gas
  const monthly = net * 4.33

  return (
    <div className="min-h-screen bg-[#070B10]">
      <Header goHome={goHome} />

      <div className="px-4 py-4">
        <button
          onClick={goHome}
          className="text-gray-500 text-sm mb-4 flex items-center gap-1 hover:text-gray-300 transition"
        >
          ← All motos
        </button>

        <div className="bg-[#1A2230] rounded-2xl h-52 flex items-center justify-center mb-4">
          <span className="text-7xl">🏍️</span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#C8F437] text-black text-xs font-bold px-2 py-0.5 rounded-full">
            {moto.condition}
          </span>
          <span className="text-gray-500 text-sm">{moto.year}</span>
        </div>
        <h1 className="text-white text-3xl font-bold mb-5">{moto.name}</h1>

        {/* Specs */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: 'Engine', value: moto.specs.cc },
            { label: 'Motor', value: moto.specs.motor },
            { label: 'Power', value: moto.specs.hp },
            { label: 'Tank', value: moto.specs.tank },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#111820] border border-gray-800 rounded-xl p-3 text-center"
            >
              <p className="text-gray-500 text-[10px] uppercase">{s.label}</p>
              <p className="text-white font-bold text-xs mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Term */}
        <p className="text-gray-500 text-sm mb-2">Term</p>
        <div className="flex gap-2 mb-3">
          {['18', '12'].map((t) => (
            <button
              key={t}
              onClick={() => setTerm(t)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${
                term === t
                  ? 'bg-[#C8F437] text-black'
                  : 'bg-[#111820] border border-gray-800 text-gray-500'
              }`}
            >
              {t} months
            </button>
          ))}
        </div>

        {/* Deposit */}
        <p className="text-gray-500 text-sm mb-6">
          Deposit: {fmt(moto.deposit)} · Pay full or weekly within 1 month
        </p>

        {/* Payment + Earnings */}
        <div className="bg-[#111820] border border-gray-800 rounded-2xl p-5 mb-3">
          <p className="text-gray-500 text-sm">Your weekly payment</p>
          <div className="flex items-end justify-between mb-4">
            <p className="text-[#C8F437] font-bold text-4xl">{fmt(price)}</p>
            <p className="text-gray-500 text-sm">for {term} months</p>
          </div>

          <hr className="border-gray-800 mb-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Delivery earnings (8h/day, 6 days)</span>
              <span className="text-[#C8F437]">{fmt(defaultGross)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">🏍️ Moto payment</span>
              <span className="text-red-400">−{fmt(price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">📱 Platform commission</span>
              <span className="text-red-400">−{fmt(defaultCommission)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">⛽ Gas</span>
              <span className="text-red-400">−{fmt(defaultGas)}</span>
            </div>
          </div>

          <hr className="border-gray-800 my-4" />

          <div className="flex justify-between items-center">
            <span className="text-white font-bold">You keep each week</span>
            <span className="text-green-400 font-bold text-xl">{fmt(defaultNet)} ✅</span>
          </div>

          <p className="text-gray-600 text-[11px] mt-3">
            *Estimated earnings. Actual results may vary by platform and zone.
          </p>
        </div>

        {/* Calculator toggle */}
        <button
          onClick={() => setShowCalc(!showCalc)}
          className="w-full text-center text-[#C8F437] text-sm py-2 mb-4"
        >
          {showCalc ? 'Close calculator' : 'Work more or fewer hours? Calculate exactly →'}
        </button>

        {/* Calculator */}
        {showCalc && (
          <div className="bg-[#111820] border border-gray-800 rounded-2xl p-5 mb-6">
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm">Hours/day</span>
                <span className="text-white font-bold">{hours}h</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>4h</span>
                <span>12h</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm">Days/week</span>
                <span className="text-white font-bold">{days}</span>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>3</span>
                <span>7</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Gross earnings</span>
                <span className="text-[#C8F437]">{fmt(gross)}/wk</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">🏍️ Moto payment</span>
                <span className="text-red-400">−{fmt(price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">📱 Platform commission</span>
                <span className="text-red-400">−{fmt(commission)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">⛽ Gas</span>
                <span className="text-red-400">−{fmt(gas)}</span>
              </div>
              <hr className="border-gray-800" />
              <div className="flex justify-between font-bold">
                <span className="text-white">You keep</span>
                <span className={net > 0 ? 'text-green-400' : 'text-red-400'}>
                  {fmt(net)}/wk
                </span>
              </div>
              <p className="text-center text-[#C8F437] font-bold text-xl mt-2">
                {fmt(monthly)}/month
              </p>
            </div>

            <p className="text-gray-600 text-[11px] mt-3 text-center">
              *Estimated earnings. Actual results may vary by platform and zone.
            </p>
          </div>
        )}

        {/* Apply form */}
        <div className="bg-[#111820] border border-gray-800 rounded-2xl p-5 mb-8">
          <h2 className="text-white font-bold text-lg mb-4">Apply for this moto</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const n = e.target.elements.fullname.value
              const p = e.target.elements.phone.value
              const msg = `Hola! Quiero aplicar:\n\nNombre: ${n}\nTeléfono: ${p}\nCiudad: Bogotá\nMoto: ${moto.name}\nPlazo: ${term} meses`
              window.open(
                `https://wa.me/573001234567?text=${encodeURIComponent(msg)}`
              )
            }}
            className="space-y-3"
          >
            <input
              name="fullname"
              type="text"
              placeholder="Full name"
              className="w-full bg-[#070B10] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:border-[#C8F437] outline-none"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone number"
              className="w-full bg-[#070B10] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:border-[#C8F437] outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#C8F437] text-black font-bold py-3.5 rounded-xl text-lg hover:bg-[#d4f94d] transition"
            >
              Apply now →
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// ==================== PAGES ====================

function HomePage({ openMoto }) {
  return (
    <div className="min-h-screen bg-[#070B10]">
      <Header goHome={() => window.scrollTo(0, 0)} />
      <CatalogSection openMoto={openMoto} />
      <AdvantagesSection />
      <ProcessSection />
      <ReviewsSection />
      <FAQSection />
      <FormSection />
      <Footer />
    </div>
  )
}

// ==================== APP ====================

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedMotoId, setSelectedMotoId] = useState(null)

  const openMoto = (id) => {
    setSelectedMotoId(id)
    setPage('moto')
    window.scrollTo(0, 0)
  }

  const goHome = () => {
    setPage('home')
    window.scrollTo(0, 0)
  }

  if (page === 'moto') {
    const moto = motos.find((m) => m.id === selectedMotoId)
    if (!moto) { goHome(); return null }
    return <MotoPage moto={moto} goHome={goHome} />
  }

  return <HomePage openMoto={openMoto} />
}
