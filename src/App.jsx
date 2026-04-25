import { useMemo, useRef, useState } from 'react'

// ==================== DATA ====================

const motos = [
  {
    id: 'hero-eco-t',
    name: 'Hero Eco T',
    year: 2027,
    condition: 'New',
    deposit: 500000,
    price12: 200000,
    price18: 155000,
    img: '🏍️',
  },
  {
    id: 'akt-nkd-125',
    name: 'AKT NKD 125',
    year: 2027,
    condition: 'New',
    deposit: 500000,
    price12: 200000,
    price18: 160000,
    img: '🏍️',
  },
  {
    id: 'hero-eco-deluxe',
    name: 'Hero Eco Deluxe',
    year: 2027,
    condition: 'New',
    deposit: 600000,
    price12: 240000,
    price18: 180000,
    img: '🏍️',
  },
  {
    id: 'victory-combat',
    name: 'Victory Combat',
    year: 2025,
    condition: 'Used',
    deposit: 400000,
    price12: 140000,
    price18: 110000,
    img: '🏍️',
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
    q: 'How fast can I start?',
    a: 'Most drivers can start in 1–2 days. We review your documents in under 24 hours.',
  },
  {
    q: 'Do I need a deposit?',
    a: 'Yes. Initial payment starts from $400,000 COP and can be split into payments.',
  },
  {
    q: 'What do I need to apply?',
    a: 'ID, driver’s license, utility bill and 2 references. No credit history needed.',
  },
  {
    q: 'Can I work on any platform?',
    a: 'Yes. Rappi, DiDi Food, Yango, or any delivery app. You choose where and when to work.',
  },
  {
    q: 'What if the moto breaks down?',
    a: 'Fuel and maintenance are paid by the driver. We are always here to help.',
  },
  {
    q: 'Will the moto be mine?',
    a: 'Yes. The moto is yours at the end of the contract after completing payments.',
  },
]

// ==================== HELPERS ====================

const fmt = (n) => '$' + Math.round(n).toLocaleString('es-CO')
const WA_NUMBER = '573001234567'
const brand = '#C8F437'

function getMotoById(id) {
  return motos.find((moto) => moto.id === id) || null
}

function getWeeklyPrice(moto, term) {
  if (!moto) return 160000
  return term === 12 ? moto.price12 : moto.price18
}

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

// ==================== COMMON BLOCKS ====================

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-white text-xl font-black leading-tight">{title}</h2>
      {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
    </div>
  )
}

function Hero({ onApply, onSeeMotos }) {
  return (
    <section className="px-5 pt-8 pb-6">
      <div className="text-center">
        <p className="text-[#C8F437] text-xs font-bold uppercase tracking-widest mb-2">Rent-to-own moto</p>
        <h1 className="text-white text-3xl font-black leading-tight">
          Your moto for <span className="text-[#C8F437]">delivery work</span>
        </h1>
        <p className="text-gray-400 text-sm mt-3">
          Choose your moto. Pay it off with what you earn.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        {motos.slice(0, 2).map((moto) => (
          <div key={moto.id} className="bg-[#111820] border border-gray-800 rounded-2xl p-3">
            <div className="bg-[#1A2230] rounded-xl h-24 flex items-center justify-center text-5xl mb-3">
              {moto.img}
            </div>
            <div className="flex items-center gap-1 mb-1">
              <span className="bg-[#C8F437] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {moto.condition}
              </span>
              <span className="text-gray-500 text-xs">{moto.year}</span>
            </div>
            <div className="text-white text-sm font-bold truncate">{moto.name}</div>
            <div className="text-[#C8F437] font-black text-lg mt-1">
              {fmt(moto.price18)}<span className="text-gray-500 text-xs font-normal"> /week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-5 text-center text-xs">
        {['Approved in 24h', 'Deposit from $400K', 'No credit history', 'Start fast'].map((item) => (
          <div key={item} className="bg-[#111820] border border-gray-800 rounded-xl p-2 text-gray-300">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button onClick={onApply} className="bg-[#C8F437] text-black font-black py-3.5 rounded-xl active:scale-95 transition">
          Apply now
        </button>
        <button onClick={onSeeMotos} className="bg-[#111820] border border-gray-700 text-white font-bold py-3.5 rounded-xl active:scale-95 transition">
          See motos
        </button>
      </div>
    </section>
  )
}

function Benefits() {
  const items = [
    ['🏍️', 'Ready-to-work moto'],
    ['📋', 'Insurance included'],
    ['📍', 'GPS installed'],
    ['🔧', '24/7 support'],
    ['⚡', 'Get your moto fast'],
  ]

  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <SectionTitle title="What you get" />
      <div className="grid grid-cols-2 gap-3">
        {items.map(([icon, text]) => (
          <div key={text} className="bg-[#111820] border border-gray-800 rounded-xl p-3 flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <span className="text-white text-sm font-bold">{text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProcessBlock() {
  const steps = ['Choose your moto', 'Get approved (24h)', 'Sign and pick up', 'Start working']

  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <SectionTitle title="How it works" />
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={step} className="bg-[#111820] border border-gray-800 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C8F437] text-black flex items-center justify-center font-black text-sm">
              {i + 1}
            </div>
            <div className="text-white font-bold text-sm">{step}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function RequirementsBlock() {
  const items = ['ID', 'Driver’s license', 'Utility bill', '2 references']

  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <SectionTitle title="What you need" />
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item} className="bg-[#111820] rounded-xl p-3 text-white text-sm font-bold">
            ✅ {item}
          </div>
        ))}
      </div>
      <p className="text-center text-gray-500 text-xs mt-3">No credit history needed</p>
    </section>
  )
}

function EarningsCalculator({ moto, term = 18, compact = false }) {
  const [hours, setHours] = useState(8)
  const [days, setDays] = useState(6)

  const weeklyPayment = getWeeklyPrice(moto, term)
  const gross = hours * days * 24000
  const gasAndFees = Math.round(gross * 0.15)
  const keep = Math.max(gross - weeklyPayment - gasAndFees, 0)

  return (
    <section className={compact ? '' : 'px-5 py-6 border-t border-gray-800'}>
      {!compact && <SectionTitle title="How much you can earn" subtitle="Simple estimate for delivery work" />}

      <div className="bg-[#111820] border border-gray-800 rounded-2xl p-4">
        <style>{`input[type=range]{-webkit-appearance:none;width:100%;height:6px;border-radius:999px;background:#374151;outline:none}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:${brand};cursor:pointer;border:2px solid #111820}`}</style>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Hours per day</span>
            <span className="text-[#C8F437] font-black">{hours}h</span>
          </div>
          <input type="range" min={4} max={12} value={hours} onChange={(e) => setHours(Number(e.target.value))} />
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Days per week</span>
            <span className="text-[#C8F437] font-black">{days}</span>
          </div>
          <input type="range" min={3} max={7} value={days} onChange={(e) => setDays(Number(e.target.value))} />
        </div>

        <div className="bg-[#0B1118] rounded-xl p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">You earn</span>
            <span className="text-green-400 font-bold">{fmt(gross)} / week</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Moto payment</span>
            <span className="text-[#C8F437] font-bold">−{fmt(weeklyPayment)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Gas + app fees</span>
            <span className="text-red-400 font-bold">−{fmt(gasAndFees)}</span>
          </div>
          <div className="pt-3 mt-2 border-t border-gray-800 text-center">
            <div className="text-gray-400 text-xs mb-1">After paying your moto, you keep</div>
            <div className="text-[#C8F437] text-3xl font-black">{fmt(keep)}</div>
            <div className="text-gray-500 text-xs">/ week</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== CATALOG ====================

function MotoCard({ moto, onDetails, onApply }) {
  return (
    <div className="bg-[#111820] border border-gray-800 rounded-2xl p-4">
      <div className="flex gap-4">
        <button onClick={() => onDetails(moto)} className="bg-[#1A2230] rounded-xl w-24 h-24 shrink-0 flex items-center justify-center">
          <span className="text-5xl">{moto.img}</span>
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`${moto.condition === 'New' ? 'bg-[#C8F437]' : 'bg-yellow-400'} text-black text-xs font-bold px-2 py-0.5 rounded-full`}>
              {moto.condition}
            </span>
            <span className="text-gray-500 text-sm">{moto.year}</span>
          </div>
          <button onClick={() => onDetails(moto)} className="text-left">
            <h3 className="text-white font-bold text-base">{moto.name}</h3>
          </button>
          <p className="text-[#C8F437] font-black text-xl mt-1">
            {fmt(moto.price18)}
            <span className="text-gray-500 text-xs font-normal"> /week</span>
          </p>
          <p className="text-gray-500 text-xs mt-0.5">18 months plan</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button onClick={() => onDetails(moto)} className="bg-[#1A2230] text-gray-300 font-bold text-sm py-2.5 rounded-xl">
          Details
        </button>
        <button onClick={() => onApply(moto.id)} className="bg-[#C8F437] text-black text-sm font-black py-2.5 rounded-xl">
          Apply now →
        </button>
      </div>
    </div>
  )
}

function CatalogSection({ onDetails, onApply }) {
  return (
    <section className="px-5 py-6 border-t border-gray-800" id="motos">
      <SectionTitle title="Available motos" subtitle="Choose the model that works for you" />
      <div className="space-y-3">
        {motos.map((moto) => (
          <MotoCard key={moto.id} moto={moto} onDetails={onDetails} onApply={onApply} />
        ))}
      </div>
    </section>
  )
}

// ==================== REVIEWS + FAQ ====================

function Reviews() {
  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <SectionTitle title="What our drivers say" subtitle="Real stories from Bogotá" />
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {reviews.map((review) => (
          <div key={review.name} className="snap-start shrink-0 w-72 bg-[#111820] border border-gray-800 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#1A2230] text-[#C8F437] font-black flex items-center justify-center">
                {review.name[0]}
              </div>
              <div>
                <div className="text-white font-bold text-sm">{review.name}</div>
                <div className="text-gray-500 text-xs">{review.platform}</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm italic leading-relaxed">“{review.text}”</p>
            <div className="text-yellow-400 text-xs mt-3">★★★★★</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <SectionTitle title="FAQ" subtitle="Simple answers before you apply" />
      <div className="space-y-2">
        {faqs.map((faq) => (
          <details key={faq.q} className="bg-[#111820] border border-gray-800 rounded-xl">
            <summary className="p-3 text-white text-sm font-bold cursor-pointer">{faq.q}</summary>
            <p className="px-3 pb-3 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

// ==================== FORM ====================

function MultiStepForm({ preselectedMotoId }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('Bogotá')
  const [selectedMotoId, setSelectedMotoId] = useState(preselectedMotoId || '')
  const [term, setTerm] = useState(18)
  const [docs, setDocs] = useState({ idFront: false, idBack: false, license: false, utilityBill: false })
  const [ref1, setRef1] = useState({ name: '', phone: '' })
  const [ref2, setRef2] = useState({ name: '', phone: '' })

  const selectedMoto = useMemo(() => getMotoById(selectedMotoId), [selectedMotoId])
  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const uploadedDocs = Object.values(docs).filter(Boolean).length

  const canNext = () => {
    if (step === 1) return name.trim().length > 1 && phone.trim().length > 5
    if (step === 2) return Boolean(selectedMotoId)
    if (step === 3) return docs.idFront && docs.idBack && docs.license && docs.utilityBill
    return true
  }

  const uploadDoc = (key) => {
    setDocs((prev) => ({ ...prev, [key]: true }))
  }

  const DocUploadBox = ({ label, docKey, icon }) => (
    <button
      type="button"
      onClick={() => uploadDoc(docKey)}
      className={`w-full rounded-xl p-4 text-left transition-all ${
        docs[docKey]
          ? 'bg-[#C8F437]/10 border-2 border-[#C8F437]'
          : 'bg-[#1A2230] border-2 border-gray-700 border-dashed'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${docs[docKey] ? 'bg-[#C8F437]/20' : 'bg-gray-700'}`}>
          {docs[docKey] ? '✅' : icon}
        </div>
        <div>
          <div className={`font-bold text-sm ${docs[docKey] ? 'text-[#C8F437]' : 'text-white'}`}>{label}</div>
          <div className="text-xs text-gray-500 mt-0.5">{docs[docKey] ? 'Photo uploaded' : 'Tap to take photo'}</div>
        </div>
      </div>
    </button>
  )

  return (
    <section className="px-5 py-6 border-t border-gray-800" id="apply">
      <div className="mb-4">
        <h2 className="text-white text-xl font-black">Apply now</h2>
        <p className="text-gray-400 text-sm mt-1">Upload your documents to get approved</p>
      </div>

      <div className="bg-[#111820] rounded-2xl border-2 border-[#C8F437] overflow-hidden">
        <div className="bg-[#1A2230] h-1.5">
          <div className="bg-[#C8F437] h-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="px-4 pt-3 pb-1 flex justify-between items-center">
          <span className="text-xs text-gray-500">Step {step} of {totalSteps}</span>
          {step > 1 && step < 4 && (
            <button onClick={() => setStep(step - 1)} className="text-xs text-gray-400 underline">
              ← Back
            </button>
          )}
        </div>

        <div className="p-5 pt-2">
          {step === 1 && (
            <div>
              <h3 className="font-black text-lg mb-1 text-white">Your info</h3>
              <p className="text-gray-400 text-xs mb-4">We will contact you today</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Full name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Juan Pérez"
                    className="w-full bg-[#1A2230] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#C8F437]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">WhatsApp</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="300 123 4567"
                    className="w-full bg-[#1A2230] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-[#C8F437]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#1A2230] rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-[#C8F437]"
                  >
                    <option>Bogotá</option>
                    <option>Soacha</option>
                    <option>Other city</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-black text-lg mb-1 text-white">Choose your moto</h3>
              <p className="text-gray-400 text-xs mb-4">Pick one to continue</p>
              <div className="space-y-2 mb-4">
                {motos.map((moto) => (
                  <button
                    key={moto.id}
                    onClick={() => setSelectedMotoId(moto.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      selectedMotoId === moto.id ? 'bg-[#C8F437]/10 border-2 border-[#C8F437]' : 'bg-[#1A2230] border-2 border-transparent'
                    }`}
                  >
                    <div className="text-3xl">{moto.img}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-white">{moto.name}</div>
                      <div className="text-xs text-gray-400">
                        {moto.condition} · {moto.year}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#C8F437] font-black text-sm">{fmt(moto.price18)}</div>
                      <div className="text-gray-500 text-xs">/week</div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedMoto && (
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Plan</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[18, 12].map((p) => (
                      <button
                        key={p}
                        onClick={() => setTerm(p)}
                        className={`py-3 rounded-xl text-sm font-bold transition-all ${
                          term === p ? 'bg-[#C8F437] text-black' : 'bg-[#1A2230] text-gray-400'
                        }`}
                      >
                        {p} months · {fmt(getWeeklyPrice(selectedMoto, p))}/week
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-black text-lg mb-1 text-white">Upload documents</h3>
              <p className="text-gray-400 text-xs mb-4">Required to get approved. Take a clear photo.</p>
              <div className="space-y-3">
                <DocUploadBox label="ID — front side" docKey="idFront" icon="🪪" />
                <DocUploadBox label="ID — back side" docKey="idBack" icon="🔄" />
                <DocUploadBox label="Driver’s license" docKey="license" icon="🏍️" />
                <DocUploadBox label="Utility bill" docKey="utilityBill" icon="📄" />
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800">
                <h4 className="font-bold text-sm mb-3 text-white">2 references</h4>
                <div className="space-y-3">
                  <div className="bg-[#1A2230] rounded-xl p-3 space-y-2">
                    <div className="text-xs text-gray-500">Reference 1</div>
                    <input
                      value={ref1.name}
                      onChange={(e) => setRef1({ ...ref1, name: e.target.value })}
                      placeholder="Name"
                      className="w-full bg-[#0B1118] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                    />
                    <input
                      value={ref1.phone}
                      onChange={(e) => setRef1({ ...ref1, phone: e.target.value })}
                      placeholder="Phone"
                      type="tel"
                      className="w-full bg-[#0B1118] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                  <div className="bg-[#1A2230] rounded-xl p-3 space-y-2">
                    <div className="text-xs text-gray-500">Reference 2</div>
                    <input
                      value={ref2.name}
                      onChange={(e) => setRef2({ ...ref2, name: e.target.value })}
                      placeholder="Name"
                      className="w-full bg-[#0B1118] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                    />
                    <input
                      value={ref2.phone}
                      onChange={(e) => setRef2({ ...ref2, phone: e.target.value })}
                      placeholder="Phone"
                      type="tel"
                      className="w-full bg-[#0B1118] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-black text-xl text-[#C8F437] mb-2">Application submitted!</h3>
              <p className="text-gray-400 text-sm mb-6">We will call you today</p>

              <div className="bg-[#1A2230] rounded-xl p-4 text-left space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Name</span>
                  <span className="font-medium text-white">{name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">WhatsApp</span>
                  <span className="font-medium text-white">{phone}</span>
                </div>
                {selectedMoto && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Moto</span>
                      <span className="font-medium text-white">{selectedMoto.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Payment</span>
                      <span className="font-bold text-[#C8F437]">
                        {fmt(getWeeklyPrice(selectedMoto, term))}/week × {term} months
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Documents</span>
                  <span className="text-[#C8F437] font-medium">{uploadedDocs}/4 ✅</span>
                </div>
              </div>

              <div className="bg-[#1A2230] rounded-xl p-3">
                <p className="text-xs text-gray-400">Next steps:</p>
                <p className="text-sm mt-1 text-white">We call → Review docs → You sign → Ride out</p>
              </div>
            </div>
          )}

          {step < 4 && (
            <button
              onClick={() => {
                if (canNext()) setStep(step + 1)
              }}
              className={`w-full mt-5 font-black text-center py-4 rounded-xl text-base transition-all active:scale-95 ${
                canNext() ? 'bg-[#C8F437] text-black' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === 1 && 'Next →'}
              {step === 2 && (selectedMoto ? `Continue with ${selectedMoto.name} →` : 'Choose a moto')}
              {step === 3 && 'Submit application →'}
            </button>
          )}

          {step < 4 && <p className="text-center text-gray-600 text-xs mt-2">No co-signer · No credit history needed</p>}
        </div>
      </div>
    </section>
  )
}

// ==================== MOTO DETAIL PAGE ====================

function MotoPage({ moto, onBack, onApply }) {
  const [term, setTerm] = useState(18)
  const [depositPlan, setDepositPlan] = useState('split')
  const price = getWeeklyPrice(moto, term)
  const depositSplit = Math.round(moto.deposit / 2)
  const waMsg = `Hi! I want the ${moto.name} ${moto.year} for ${term} months.`
  const waURL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 px-5 pt-4 text-gray-400 text-sm">
        ← All motos
      </button>

      <section className="px-5 pt-4 pb-6">
        <div className="bg-[#111820] rounded-2xl p-8 text-center mb-5">
          <div className="text-7xl">{moto.img}</div>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className={`${moto.condition === 'New' ? 'bg-[#C8F437]' : 'bg-yellow-400'} text-black text-xs font-bold px-2 py-0.5 rounded-full`}>
            {moto.condition}
          </span>
          <span className="text-gray-500 text-xs">{moto.year}</span>
        </div>
        <h1 className="text-white text-2xl font-black">{moto.name}</h1>

        <div className="mt-5 bg-[#111820] rounded-2xl p-4 border border-gray-800">
          <div className="text-xs text-gray-500 mb-2">Weekly payment</div>
          <div className="text-[#C8F437] text-4xl font-black">{fmt(price)}</div>
          <div className="text-gray-500 text-xs mt-1">/ week · {term} months</div>
        </div>

        <div className="mt-5">
          <div className="text-xs text-gray-500 mb-2">Plan</div>
          <div className="grid grid-cols-2 gap-2">
            {[18, 12].map((p) => (
              <button
                key={p}
                onClick={() => setTerm(p)}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${term === p ? 'bg-[#C8F437] text-black' : 'bg-[#111820] text-gray-400'}`}
              >
                {p} months
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">Initial payment</div>
            <div className="text-xs text-gray-500">From {fmt(moto.deposit)}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDepositPlan('full')}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${depositPlan === 'full' ? 'bg-[#C8F437] text-black' : 'bg-[#111820] text-gray-400'}`}
            >
              Pay in full
            </button>
            <button
              onClick={() => setDepositPlan('split')}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${depositPlan === 'split' ? 'bg-[#C8F437] text-black' : 'bg-[#111820] text-gray-400'}`}
            >
              2 × {fmt(depositSplit)}
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-2">Flexible deposit — choose what works for you.</p>
        </div>

        <div className="mt-6">
          <EarningsCalculator moto={moto} term={term} compact />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3">
          <button onClick={() => onApply(moto.id)} className="bg-[#C8F437] text-black font-black py-4 rounded-xl active:scale-95 transition">
            Apply for this moto
          </button>
          <a href={waURL} target="_blank" rel="noopener noreferrer" className="text-center text-gray-400 text-sm underline">
            or message us on WhatsApp
          </a>
        </div>
      </section>

      <Benefits />
      <ProcessBlock />
      <FAQ />
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <section className="px-5 py-6 pb-28 text-center border-t border-gray-800">
      <p className="text-gray-600 text-xs">
        📍 Auto. Norte #123–63, Bogotá
        <br />
        Mon–Fri 8AM–5PM
      </p>
    </section>
  )
}

// ==================== APP ====================

export default function App() {
  const [selectedMoto, setSelectedMoto] = useState(null)
  const [preselectedMotoId, setPreselectedMotoId] = useState('')
  const formRef = useRef(null)
  const motosRef = useRef(null)

  const scrollToForm = (motoId = '') => {
    setPreselectedMotoId(motoId)
    setSelectedMoto(null)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const scrollToMotos = () => {
    setTimeout(() => {
      motosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-[#0B1118] text-white max-w-md mx-auto">
      <Header
        goHome={() => {
          setSelectedMoto(null)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />

      {selectedMoto ? (
        <MotoPage moto={selectedMoto} onBack={() => setSelectedMoto(null)} onApply={scrollToForm} />
      ) : (
        <>
          <Hero onApply={() => scrollToForm('')} onSeeMotos={scrollToMotos} />
          <EarningsCalculator moto={getMotoById('akt-nkd-125')} term={18} />
          <Benefits />
          <ProcessBlock />
          <RequirementsBlock />
          <div ref={motosRef}>
            <CatalogSection onDetails={setSelectedMoto} onApply={scrollToForm} />
          </div>
          <div ref={formRef}>
            <MultiStepForm key={preselectedMotoId || 'empty'} preselectedMotoId={preselectedMotoId} />
          </div>
          <Reviews />
          <FAQ />
          <Footer />

          <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-[#0B1118]/95 border-t border-gray-800 p-3 backdrop-blur">
            <button onClick={() => scrollToForm('')} className="w-full bg-[#C8F437] text-black font-black py-3.5 rounded-xl active:scale-95 transition">
              Apply now
            </button>
          </div>
        </>
      )}
    </div>
  )
}
