import { useMemo, useRef, useState } from 'react'

// ==================== DATA ====================

const motos = [
  { id: 'hero-eco-t', name: 'Hero Eco T', year: 2027, condition: 'New', deposit: 500000, price12: 200000, price18: 155000, img: '🏍️' },
  { id: 'akt-nkd-125', name: 'AKT NKD 125', year: 2027, condition: 'New', deposit: 500000, price12: 200000, price18: 160000, img: '🏍️' },
  { id: 'hero-eco-deluxe', name: 'Hero Eco Deluxe', year: 2027, condition: 'New', deposit: 600000, price12: 240000, price18: 180000, img: '🏍️' },
  { id: 'victory-combat', name: 'Victory Combat', year: 2025, condition: 'Used', deposit: 400000, price12: 140000, price18: 110000, img: '🏍️' },
]

const reviews = [
  { name: 'Juan G.', platform: 'Rappi · 8 months with naran', text: "I couldn't afford a moto. With naran I started working fast. 8 months in, everything's good — paying little by little." },
  { name: 'José R.', platform: 'Rappi + DiDi · 5 months with naran', text: "No bank, no hassle. Got my moto fast and I'm already earning. Pretty simple." },
  { name: 'Camilo L.', platform: 'Rappi + Yango · 11 months with naran', text: "Had doubts at first, but it's worked out. I work at my own pace and I'm almost done paying off the moto." },
]

const faqs = [
  { q: 'How fast can I start?', a: 'Most drivers can start in 1–2 days. We review your documents in under 24 hours.' },
  { q: 'Do I need a deposit?', a: 'Yes. Initial payment starts from $400,000 COP and can be paid weekly during the first month.' },
  { q: 'What do I need to apply?', a: 'You need to be 18+. ID, driver’s license, utility bill and 2 references. No credit history needed.' },
  { q: 'Can I work on any platform?', a: 'Yes. Rappi, DiDi Food, Yango, or any delivery app. You choose where and when to work.' },
  { q: 'What if the moto breaks down?', a: 'Fuel and maintenance are paid by the driver. We are always here to help.' },
  { q: 'Will the moto be mine?', a: 'Yes. The moto is yours at the end of the contract after completing payments.' },
]

// ==================== HELPERS ====================

const fmt = (n) => '$' + Math.round(n).toLocaleString('es-CO')
const WA_NUMBER = '573001234567'
const BRAND = '#C8F437'

function getMotoById(id) {
  return motos.find((moto) => moto.id === id) || null
}

function getWeeklyPrice(moto, term) {
  if (!moto) return 160000
  return term === 12 ? moto.price12 : moto.price18
}

// ==================== COMMON ====================

function Header({ goHome }) {
  return (
    <header className="sticky top-0 z-50 bg-[#C8F437] px-5 py-3 flex items-center justify-between border-b border-black/10">
      <button onClick={goHome} className="text-black font-black text-2xl tracking-tight">naran.</button>
      <span className="text-black/60 text-sm font-bold">Bogotá</span>
    </header>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-white text-xl font-black leading-tight">{title}</h2>
      {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
    </div>
  )
}

function ApplyButton({ children = 'Apply now →', onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`bg-[#FF4A4A] text-white font-black rounded-xl active:scale-95 transition shadow-lg shadow-red-950/20 ${className}`}>
      {children}
    </button>
  )
}

// ==================== HERO ====================

function Hero({ onApply, onSeeMotos, onSelectMoto }) {
  return (
    <section className="bg-[#C8F437] text-black px-5 pt-9 pb-8">
      <div className="text-center max-w-sm mx-auto">
        <h1 className="text-4xl font-black leading-tight">Ride and earn.</h1>
        <p className="text-black/60 text-lg font-bold mt-2">Pay your moto while you work.</p>
        <div className="flex justify-center gap-4 text-sm text-black/60 mt-4">
          <span>Approved in 24h</span><span>·</span><span>From $160K/week</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-7 max-w-sm mx-auto">
        {motos.slice(0, 2).map((moto) => (
          <button key={moto.id} onClick={() => onSelectMoto(moto)} className="bg-white/80 rounded-2xl p-3 border border-black/10 text-left active:scale-95 transition">
            <div className="bg-white rounded-xl h-24 flex items-center justify-center text-5xl mb-3">{moto.img}</div>
            <div className="text-black/50 text-xs font-bold">{moto.condition} · {moto.year}</div>
            <div className="text-black text-sm font-black truncate mt-0.5">{moto.name}</div>
            <div className="text-black font-black text-lg mt-1">
              {fmt(moto.price18)}<span className="text-black/50 text-xs font-bold"> /week</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-sm mx-auto">
        <ApplyButton onClick={onApply} className="w-full py-4 text-lg">Apply now →</ApplyButton>
        <button onClick={onSeeMotos} className="w-full mt-3 bg-black/10 text-black font-black py-3 rounded-xl active:scale-95 transition">
          See available motos
        </button>
      </div>
    </section>
  )
}

// ==================== BLOCKS ====================

function ProcessBlock() {
  const steps = ['Choose your moto', 'Get approved (24h)', 'Sign at our Bogotá office and pick up your moto']
  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <SectionTitle title="How it works" />
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={step} className="bg-[#111820] border border-gray-800 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C8F437] text-black flex items-center justify-center font-black text-sm">{i + 1}</div>
            <div className="text-white font-bold text-sm">{step}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function RequirementsBlock() {
  const items = ['ID (18+)', 'Driver’s license', 'Utility bill', '2 references']
  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <SectionTitle title="What you need" />
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => <div key={item} className="bg-[#111820] rounded-xl p-3 text-white text-sm font-bold">✅ {item}</div>)}
      </div>
      <p className="text-center text-gray-500 text-xs mt-3">No credit history needed</p>
    </section>
  )
}

function EarningsCalculator({ moto, term = 18, compact = false }) {
  const [hours, setHours] = useState(6)
  const [days, setDays] = useState(5)
  const weeklyPayment = getWeeklyPrice(moto, term)
  const gross = hours * days * 24000
  const gasAndFees = Math.round(gross * 0.15)
  const keep = Math.max(gross - weeklyPayment - gasAndFees, 0)

  return (
    <section className={compact ? '' : 'px-5 py-7 border-t border-gray-800'}>
      <div className="bg-white text-black rounded-3xl p-5 shadow-xl">
        <style>{`input[type=range]{-webkit-appearance:none;width:100%;height:7px;border-radius:999px;background:#E5E7EB;outline:none}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;background:${BRAND};cursor:pointer;border:4px solid white;box-shadow:0 0 0 3px ${BRAND}}`}</style>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#C8F437] flex items-center justify-center text-xl">▣</div>
          <h2 className="text-black text-xl font-black leading-tight uppercase">Your estimated earnings<br />per week</h2>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-lg mb-3"><span className="text-gray-500 font-bold">Hours per day</span><span className="text-[#27441B] font-black">{hours} hours</span></div>
          <input type="range" min={4} max={12} value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          <div className="flex justify-between text-gray-400 text-sm mt-3"><span>4h</span><span>12h</span></div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex justify-between text-lg mb-3"><span className="text-gray-500 font-bold">Days per week</span><span className="text-[#27441B] font-black">{days} days</span></div>
          <input type="range" min={3} max={7} value={days} onChange={(e) => setDays(Number(e.target.value))} />
          <div className="flex justify-between text-gray-400 text-sm mt-3"><span>3 days</span><span>7 days</span></div>
        </div>

        <div className="space-y-3 text-lg">
          <div className="flex justify-between"><span className="text-gray-500 font-bold">You earn</span><span className="text-[#27441B] font-black">{fmt(gross)}</span></div>
          <div className="flex justify-between bg-[#F4FAE9] border border-[#C8F437] rounded-xl p-3 -mx-1"><span className="text-gray-500 font-bold">Moto payment</span><span className="text-gray-700 font-black">−{fmt(weeklyPayment)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500 font-bold">Gas + app fees</span><span className="text-gray-500 font-black">−{fmt(gasAndFees)}</span></div>
        </div>

        <div className="pt-5 mt-5 border-t border-[#DDF5A2] text-center">
          <div className="text-gray-500 text-base font-bold mb-2">After paying your moto, you keep</div>
          <div className="text-[#27441B] text-5xl font-black">{fmt(keep)}</div>
          <div className="text-gray-500 text-lg font-bold mt-1">/ week</div>
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
        <button onClick={() => onDetails(moto)} className="bg-[#1A2230] rounded-xl w-24 h-24 shrink-0 flex items-center justify-center"><span className="text-5xl">{moto.img}</span></button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`${moto.condition === 'New' ? 'bg-[#C8F437]' : 'bg-yellow-400'} text-black text-xs font-bold px-2 py-0.5 rounded-full`}>{moto.condition}</span>
            <span className="text-gray-500 text-sm">{moto.year}</span>
          </div>
          <button onClick={() => onDetails(moto)} className="text-left"><h3 className="text-white font-bold text-base">{moto.name}</h3></button>
          <p className="text-[#C8F437] font-black text-xl mt-1">{fmt(moto.price18)}<span className="text-gray-500 text-xs font-normal"> /week</span></p>
          <p className="text-gray-500 text-xs mt-0.5">Deposit {fmt(moto.deposit)}</p>
          <p className="text-gray-500 text-xs leading-tight">Pay weekly in the first month</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button onClick={() => onDetails(moto)} className="bg-[#1A2230] text-gray-300 font-bold text-sm py-2.5 rounded-xl">Details</button>
        <ApplyButton onClick={() => onApply(moto.id)} className="text-sm py-2.5">Apply now →</ApplyButton>
      </div>
    </div>
  )
}

function CatalogSection({ onDetails, onApply }) {
  return (
    <section className="px-5 py-6 border-t border-gray-800" id="motos">
      <SectionTitle title="Available motos" subtitle="Choose the model that works for you" />
      <div className="space-y-3">
        {motos.map((moto) => <MotoCard key={moto.id} moto={moto} onDetails={onDetails} onApply={onApply} />)}
        <div className="bg-[#111820] border border-dashed border-gray-700 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">❓</div>
          <h3 className="text-white font-black text-base">Don’t see the moto you want?</h3>
          <p className="text-gray-400 text-sm mt-1">Message us on WhatsApp. We may help you get another model.</p>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi! I want a different moto model')}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full justify-center bg-[#1A2230] text-white font-bold text-sm py-3 rounded-xl">Message on WhatsApp</a>
        </div>
      </div>
    </section>
  )
}

// ==================== REVIEWS + FAQ ====================

function Reviews() {
  const scrollRef = useRef(null)
  const [active, setActive] = useState(0)
  const scroll = (dir) => {
    if (!scrollRef.current) return
    const next = Math.max(0, Math.min(reviews.length - 1, active + dir))
    setActive(next)
    scrollRef.current.scrollTo({ left: next * 310, behavior: 'smooth' })
  }

  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <div className="flex items-end justify-between mb-4">
        <SectionTitle title="What our drivers say" subtitle="Real stories from Bogotá" />
        <div className="flex gap-2 pb-1">
          <button onClick={() => scroll(-1)} className="w-9 h-9 rounded-full bg-[#111820] border border-gray-800 text-gray-400 font-bold">←</button>
          <button onClick={() => scroll(1)} className="w-9 h-9 rounded-full bg-[#111820] border border-gray-800 text-gray-400 font-bold">→</button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {reviews.map((review) => (
          <div key={review.name} className="snap-start shrink-0 w-72 bg-[#111820] border border-gray-800 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-[#1A2230] text-[#C8F437] font-black flex items-center justify-center">{review.name[0]}</div><div><div className="text-white font-bold text-sm">{review.name}</div><div className="text-gray-500 text-xs">{review.platform}</div></div></div>
            <p className="text-gray-300 text-sm italic leading-relaxed">“{review.text}”</p><div className="text-yellow-400 text-xs mt-3">★★★★★</div>
          </div>
        ))}
      </div>
      <a href="https://www.tiktok.com/@naran" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 w-full bg-[#111820] border border-gray-800 text-white font-bold text-sm py-3 rounded-xl">🎵 More stories on TikTok</a>
    </section>
  )
}

function FAQ() {
  return (
    <section className="px-5 py-6 border-t border-gray-800">
      <SectionTitle title="FAQ" subtitle="Simple answers before you apply" />
      <div className="space-y-2">
        {faqs.map((faq) => <details key={faq.q} className="bg-[#111820] border border-gray-800 rounded-xl"><summary className="p-3 text-white text-sm font-bold cursor-pointer">{faq.q}</summary><p className="px-3 pb-3 text-gray-400 text-sm leading-relaxed">{faq.a}</p></details>)}
      </div>
    </section>
  )
}

// ==================== FORM ====================

function MultiStepForm({ preselectedMotoId }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [selectedMotoId, setSelectedMotoId] = useState(preselectedMotoId || '')
  const [term, setTerm] = useState(18)
  const [depositType, setDepositType] = useState('full')
  const [docs, setDocs] = useState({ idFront: false, idBack: false, license: false, utilityBill: false })
  const [ref1, setRef1] = useState({ name: '', phone: '' })
  const [ref2, setRef2] = useState({ name: '', phone: '' })

  const selectedMoto = useMemo(() => getMotoById(selectedMotoId), [selectedMotoId])
  const totalSteps = 4
  const progress = (step / totalSteps) * 100
  const uploadedDocs = Object.values(docs).filter(Boolean).length

  const canNext = () => {
    if (step === 1) return name.trim().length > 1 && phone.trim().length > 5 && phoneVerified
    if (step === 2) return Boolean(selectedMotoId)
    if (step === 3) return docs.idFront && docs.idBack && docs.license && docs.utilityBill
    return true
  }

  const uploadDoc = (key) => setDocs((prev) => ({ ...prev, [key]: true }))

  const DocUploadBox = ({ label, docKey, icon }) => (
    <button type="button" onClick={() => uploadDoc(docKey)} className={`w-full rounded-xl p-4 text-left transition-all ${docs[docKey] ? 'bg-[#C8F437]/10 border-2 border-[#C8F437]' : 'bg-[#1A2230] border-2 border-gray-700 border-dashed'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${docs[docKey] ? 'bg-[#C8F437]/20' : 'bg-gray-700'}`}>{docs[docKey] ? '✅' : icon}</div>
        <div><div className={`font-bold text-sm ${docs[docKey] ? 'text-[#C8F437]' : 'text-white'}`}>{label}</div><div className="text-xs text-gray-500 mt-0.5">{docs[docKey] ? 'Photo uploaded' : 'Tap to upload'}</div></div>
      </div>
    </button>
  )

  return (
    <section className="px-5 py-6 border-t border-gray-800" id="apply">
      <div className="mb-4"><h2 className="text-white text-xl font-black">Apply now</h2><p className="text-gray-400 text-sm mt-1">Upload your documents to get approved</p></div>

      <div className="bg-[#111820] rounded-2xl border-2 border-[#C8F437] overflow-hidden">
        <div className="bg-[#1A2230] h-1.5"><div className="bg-[#C8F437]
