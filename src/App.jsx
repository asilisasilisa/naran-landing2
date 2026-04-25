import { useState, useRef, useEffect } from 'react'

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
  },
  {
    id: 'akt-nkd-125',
    name: 'AKT NKD 125',
    year: 2027,
    condition: 'New',
    deposit: 500000,
    price12: 200000,
    price18: 160000,
  },
  {
    id: 'hero-eco-deluxe',
    name: 'Hero Eco Deluxe',
    year: 2027,
    condition: 'New',
    deposit: 600000,
    price12: 240000,
    price18: 180000,
  },
  {
    id: 'victory-combat',
    name: 'Victory Combat',
    year: 2025,
    condition: 'Used',
    deposit: 400000,
    price12: 140000,
    price18: 110000,
  },
]

const reviews = [
  {
    name: 'Juan G.',
    platform: 'Rappi · 8 months with naran',
    text: "I couldn't afford a moto. With naran I started working fast. 8 months in, everything's good.",
  },
  {
    name: 'José R.',
    platform: 'Rappi + DiDi · 5 months with naran',
    text: 'No bank, no hassle. Got my moto fast and I\'m already earning. Pretty simple.',
  },
  {
    name: 'Camilo L.',
    platform: 'Rappi + Yango · 11 months with naran',
    text: "Had doubts at first, but it's worked out. Almost done paying off the moto.",
  },
]

const faqs = [
  {
    q: 'What if the moto breaks down?',
    a: "Gas and maintenance are on you, but the moto will be yours at the end! We're always here to help.",
  },
  {
    q: 'Do I need a deposit?',
    a: "Yes! But it's flexible — from $400.000 COP. Pay in full or split into weekly payments within 1 month.",
  },
  {
    q: 'Can I work on any platform?',
    a: 'Yes! Rappi, DiDi Food, Yango, or any delivery app. Work the hours you want.',
  },
  {
    q: 'Will the moto be mine?',
    a: "Yes! Complete all payments and it's 100% yours.",
  },
]

// ==================== HELPERS ====================

const fmt = (n) => '$' + Math.round(n).toLocaleString('es-CO')
const WA_NUMBER = '573001234567'

// ==================== HEADER ====================

function Header({ goHome }) {
  return (
    <header className="sticky top-0 z-50 px-5 py-3 flex items-center justify-between" style={{ background: '#C8F437' }}>
      <button onClick={goHome} className="text-black font-black text-2xl tracking-tight">
        naran.
      </button>
      <span className="text-black/60 text-sm font-medium">Bogotá</span>
    </header>
  )
}

// ==================== MOTO CARD ====================

function MotoCard({ moto, onApply }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: '#111820', border: '1px solid #1f2937' }}>
      <div className="rounded-xl h-36 flex items-center justify-center mb-3" style={{ background: '#1A2230' }}>
        <span className="text-5xl">🏍️</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-black text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#C8F437' }}>
          {moto.condition}
        </span>
        <span className="text-gray-500 text-sm">{moto.year}</span>
      </div>
      <h3 className="text-white font-bold text-lg">{moto.name}</h3>
      <p className="font-bold text-2xl mt-1" style={{ color: '#C8F437' }}>
        {fmt(moto.price18)}
        <span className="text-gray-500 text-sm font-normal"> /week</span>
      </p>
      <button
        onClick={() => onApply(moto.id)}
        className="w-full text-black text-sm font-bold py-2.5 rounded-xl mt-4 active:scale-95 transition-transform"
        style={{ background: '#C8F437' }}
      >
        Apply now →
      </button>
    </div>
  )
}

// ==================== CATALOG SECTION ====================

function CatalogSection({ onApply }) {
  return (
    <section className="px-4 py-8">
      <h1 className="text-white text-2xl font-bold mb-1">Your moto for delivery work</h1>
      <p className="text-gray-400 text-sm mb-6">Choose your moto. Pay it off with what you earn.</p>
      <div className="space-y-4">
        {motos.map((m) => (
          <MotoCard key={m.id} moto={m} onApply={onApply} />
        ))}
      </div>
    </section>
  )
}

// ==================== REVIEWS ====================

function ReviewsSection() {
  return (
    <section className="px-4 py-8">
      <h2 className="text-white text-xl font-bold mb-4">Riders like you</h2>
      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ background: '#111820', border: '1px solid #1f2937' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-black font-bold text-sm" style={{ background: '#C8F437' }}>
                {r.name[0]}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{r.name}</p>
                <p className="text-gray-500 text-xs">{r.platform}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">"{r.text}"</p>
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
      <h2 className="text-white text-xl font-bold mb-4">Common questions</h2>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#111820', border: '1px solid #1f2937' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <span className="text-white text-sm font-medium pr-4">{f.q}</span>
              <span className="text-lg" style={{ color: '#C8F437' }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="px-4 pb-3">
                <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ==================== FOOTER ====================

function Footer() {
  return (
    <footer className="px-4 py-8 text-center" style={{ borderTop: '1px solid #1f2937' }}>
      <p className="text-black font-black text-xl">naran.</p>
      <p className="text-gray-500 text-xs mt-1">© 2026 naran. Bogotá, Colombia</p>
    </footer>
  )
}

// ==================== OTP INPUT ====================

function OTPInput({ value, onChange, onComplete }) {
  const inputsRef = useRef([])

  const handleChange = (idx, val) => {
    if (val.length > 1) val = val[val.length - 1]
    if (val && !/^\d$/.test(val)) return

    const newVal = [...value]
    newVal[idx] = val
    onChange(newVal)

    if (val && idx < 3) {
      inputsRef.current[idx + 1]?.focus()
    }

    if (newVal.every((d) => d !== '') && val) {
      onComplete(newVal.join(''))
    }
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center my-6">
      {[0, 1, 2, 3].map((idx) => (
        <input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="tel"
          maxLength={1}
          value={value[idx] || ''}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className="w-14 h-16 text-center text-2xl font-bold text-white rounded-xl outline-none transition-colors"
          style={{
            background: '#111820',
            border: value[idx] ? '2px solid #C8F437' : '2px solid #374151',
          }}
        />
      ))}
    </div>
  )
}

// ==================== MULTI-STEP FORM ====================

function StepBar({ step }) {
  const labels = ['Info', 'OTP', 'Moto', 'Docs', 'Review']
  return (
    <div className="flex items-center gap-1 mb-6">
      {labels.map((l, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="h-1.5 w-full rounded-full transition-colors"
            style={{ background: i + 1 <= step ? '#C8F437' : '#374151' }}
          />
          <span
            className="font-semibold"
            style={{ fontSize: '10px', color: i + 1 <= step ? '#C8F437' : '#4b5563' }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  )
}

function ApplyForm({ preselectedMotoId, goHome }) {
  const [step, setStep] = useState(1)

  // Step 1 — personal
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('Bogotá')

  // Step 2 — OTP
  const [otp, setOtp] = useState(['', '', '', ''])
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  // Step 3 — moto
  const [selectedMoto, setSelectedMoto] = useState(preselectedMotoId || '')
  const [term, setTerm] = useState(18)
  const [depositType, setDepositType] = useState('full')

  // Step 4 — docs
  const [cedula, setCedula] = useState(null)
  const [license, setLicense] = useState(null)
  const [utilityBill, setUtilityBill] = useState(null)
  const [reference, setReference] = useState(null)

  const moto = motos.find((m) => m.id === selectedMoto)
  const weeklyPrice = moto ? (term === 12 ? moto.price12 : moto.price18) : 0

  // Resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [resendTimer])

  const sendOtp = () => {
    setOtpSent(true)
    setResendTimer(30)
    setOtpError('')
    setOtp(['', '', '', ''])
  }

  const verifyOtp = (code) => {
    // For demo: accept any 4-digit code
    if (code.length === 4) {
      setOtpVerified(true)
      setOtpError('')
      setTimeout(() => setStep(3), 400)
    } else {
      setOtpError('Invalid code. Try again.')
    }
  }

  const canNext = () => {
    if (step === 1) return name.trim() && phone.trim().length >= 7
    if (step === 2) return otpVerified
    if (step === 3) return selectedMoto
    if (step === 4) return cedula && license
    return true
  }

  const next = () => {
    if (!canNext()) return
    if (step === 1) {
      sendOtp()
      setStep(2)
      return
    }
    if (step < 5) setStep(step + 1)
  }

  const back = () => {
    if (step > 1) setStep(step - 1)
  }

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(
      `🟡 NARAN APPLICATION\n\nName: ${name}\nPhone: ${phone}\nCity: ${city}\n\nMoto: ${moto?.name}\nTerm: ${term} months\nWeekly: ${fmt(weeklyPrice)}\nDeposit: ${fmt(moto?.deposit || 0)} (${depositType})\n\nDocs: cédula ✅, license ✅${utilityBill ? ', utility ✅' : ''}${reference ? ', reference ✅' : ''}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
  }

  const inputClass
