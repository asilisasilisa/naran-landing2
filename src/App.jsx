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
    price18: 155000,
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
    price18: 180000,
    specs: { cc: '97.2 cc', motor: '4 Stroke', hp: '8.2 HP', tank: '9.5 L' },
  },
  {
    id: 'victory-combat',
    name: 'Victory Combat',
    year: 2025,
    condition: 'Used',
    deposit: 400000,
    price12: 140000,
    price18: 110000,
    specs: { cc: '109 cc', motor: '4 Stroke', hp: '8.5 HP', tank: '9 L' },
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
    a: "Yes! But it's flexible — from $400.000 COP. Pay in full or split into weekly payments within 1 month.",
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
const WA_NUMBER = '573001234567'

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
    { icon: '💰', title: 'Flexible deposit', desc: 'From $400K — pay full or weekly within 1 month' },
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
    { icon: '📄', label: 'Upload', sub: 'your docs' },
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

// ==================== MULTI-STEP FORM ====================

function MultiStepForm({ initialMoto }) {
  const [step, setStep] = useState(initialMoto ? 2 : 1)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: 'Bogotá',
    motoId: initialMoto || '',
    term: '18',
    docs: { cedula: null, license: null, utility: null, reference: null },
  })

  const selectedMoto = motos.find((m) => m.id === form.motoId)
  const price = selectedMoto
    ? form.term === '18'
      ? selectedMoto.price18
      : selectedMoto.price12
    : 0

  const setDoc = (key, file) =>
    setForm({ ...form, docs: { ...form.docs, [key]: file } })

  const docsReady =
    form.docs.cedula && form.docs.license && form.docs.utility && form.docs.reference

  const handleSubmit = () => {
    const msg = `Hola! Quiero aplicar:\n\nNombre: ${form.name}\nTeléfono: ${form.phone}\nCiudad: ${form.city}\nMoto: ${selectedMoto?.name}\nPlazo: ${form.term} meses\nPago semanal: ${fmt(price)}\nDepósito: ${fmt(selectedMoto?.deposit || 0)}\n\nDocs: uploaded ✅`
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`)
  }

  return (
    <section className="px-4 py-8">
      {/* Card wrapper */}
      <div className="bg-[#0D1117] border border-[#C8F437]/30 rounded-2xl p-5">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-500 text-sm">Step {step} of 4</span>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-500 text-sm hover:text-white transition"
            >
              ← Back
            </button>
          )}
        </div>

        {/* Step bar */}
        <div className="flex gap-1 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-[#C8F437]' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        {/* ===== STEP 1: Personal info ===== */}
        {step === 1 && (
          <div>
            <h2 className="text-white font-bold text-xl mb-1">Let's get started</h2>
            <p className="text-gray-400 text-sm mb-5">Tell us about yourself</p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#111820] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:border-[#C8F437] outline-none"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-[#111820] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:border-[#C8F437] outline-none"
              />
              <div className="bg-[#111820] border border-gray-800 text-gray-400 rounded-xl px-4 py-3 text-sm">
                📍 Bogotá
              </div>
            </div>

            <button
              onClick={() => {
                if (form.name && form.phone) setStep(2)
              }}
              disabled={!form.name || !form.phone}
              className="w-full bg-[#C8F437] text-black font-bold py-3.5 rounded-xl text-lg mt-5 hover:bg-[#d4f94d] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ===== STEP 2: Choose moto ===== */}
        {step === 2 && (
          <div>
            <h2 className="text-white font-bold text-xl mb-1">Choose your moto</h2>
            <p className="text-gray-400 text-sm mb-5">Which one do you want to ride?</p>

            {/* Moto list */}
            <div className="space-y-2 mb-5">
              {motos.map((m) => {
                const isSelected = form.motoId === m.id
                const mPrice = form.term === '18' ? m.price18 : m.price12
                return (
                  <button
                    key={m.id}
                    onClick={() => setForm({ ...form, motoId: m.id })}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-[#111820] border-[#C8F437]'
                        : 'bg-[#111820] border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#1A2230] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏍️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm">{m.name}</p>
                      <p className="text-gray-500 text-xs">
                        {m.condition} · {m.year}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[#C8F437] font-bold">{fmt(mPrice)}</p>
                      <p className="text-gray-600 text-xs">/wk</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Term selector */}
            {selectedMoto && (
              <>
                <p className="text-gray-500 text-sm mb-2">Term</p>
                <div className="flex gap-2 mb-4">
                  {['18', '12'].map((t) => {
                    const p = t === '18' ? selectedMoto.price18 : selectedMoto.price12
                    return (
                      <button
                        key={t}
                        onClick={() => setForm({ ...form, term: t })}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${
                          form.term === t
                            ? 'bg-[#C8F437] text-black'
                            : 'bg-[#111820] border border-gray-800 text-gray-500'
                        }`}
                      >
                        {t} months · {fmt(p)}/wk
                      </button>
                    )
                  })}
                </div>

                {/* ✅ DEPOSIT INFO */}
                <div className="bg-[#111820] border border-gray-800 rounded-xl p-4 mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Deposit</span>
                    <span className="text-[#C8F437] font-bold text-lg">
                      {fmt(selectedMoto.deposit)}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">💡</span>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Pay in full or split into{' '}
                      <span className="text-gray-300 font-medium">
                        weekly payments within 1 month
                      </span>
                      . The deposit reserves your moto and is{' '}
                      <span className="text-gray-300 font-medium">non-refundable</span>.
                    </p>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => {
                if (form.motoId) setStep(3)
              }}
              disabled={!form.motoId}
              className="w-full bg-[#C8F437] text-black font-bold py-3.5 rounded-xl text-lg hover:bg-[#d4f94d] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue with {selectedMoto?.name || '...'} →
            </button>

            <p className="text-gray-600 text-xs text-center mt-3">
              No commitment · No co-signer needed
            </p>
          </div>
        )}

        {/* ===== STEP 3: Upload docs ===== */}
        {step === 3 && (
          <div>
            <h2 className="text-white font-bold text-xl mb-1">Upload your documents</h2>
            <p className="text-gray-400 text-sm mb-5">
              Take a clear photo of each document
            </p>

            <div className="space-y-3">
              {[
                { key: 'cedula', label: 'Cédula (ID)', icon: '🪪', desc: 'Front and back' },
                { key: 'license', label: 'Driver's license', icon: '🏍️', desc: 'Category A2' },
                {
                  key: 'utility',
                  label: 'Utility bill',
                  icon: '🏠',
                  desc: 'Last 3 months',
                },
                {
                  key: 'reference',
                  label: 'Personal reference',
                  icon: '👤',
                  desc: 'Name & phone of a contact',
                },
              ].map((doc) => {
                const file = form.docs[doc.key]
                return (
                  <label
                    key={doc.key}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      file
                        ? 'bg-[#111820] border-[#C8F437]/50'
                        : 'bg-[#111820] border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <span className="text-2xl">{doc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">{doc.label}</p>
                      <p className="text-gray-500 text-xs">
                        {file ? `✅ ${file.name}` : doc.desc}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        file
                          ? 'bg-[#C8F437]/20 text-[#C8F437]'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {file ? 'Change' : 'Upload'}
                    </div>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files[0]) setDoc(doc.key, e.target.files[0])
                      }}
                    />
                  </label>
                )
              })}
            </div>

            <div className="mt-5 bg-[#111820] border border-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs text-center">
                📷 Photos must be clear and legible. Accepted: JPG, PNG, PDF
              </p>
            </div>

            <button
              onClick={() => {
                if (docsReady) setStep(4)
              }}
              disabled={!docsReady}
              className="w-full bg-[#C8F437] text-black font-bold py-3.5 rounded-xl text-lg mt-5 hover:bg-[#d4f94d] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>

            <button
              onClick={() => setStep(4)}
              className="w-full text-gray-600 text-sm mt-3 py-2 hover:text-gray-400 transition"
            >
              Skip for now — upload later
            </button>
          </div>
        )}

        {/* ===== STEP 4: Review & Submit ===== */}
        {step === 4 && (
          <div>
            <h2 className="text-white font-bold text-xl mb-1">Review & apply</h2>
            <p className="text-gray-400 text-sm mb-5">
              Make sure everything looks good
            </p>

            <div className="space-y-3">
              {/* Personal */}
              <div className="bg-[#111820] border border-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-xs uppercase tracking-wide">You</p>
                  <button
                    onClick={() => setStep(1)}
                    className="text-[#C8F437] text-xs"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-white font-bold text-sm">{form.name}</p>
                <p className="text-gray-400 text-sm">{form.phone}</p>
                <p className="text-gray-400 text-sm">📍 {form.city}</p>
              </div>

              {/* Moto */}
              <div className="bg-[#111820] border border-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Moto</p>
                  <button
                    onClick={() => setStep(2)}
                    className="text-[#C8F437] text-xs"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-white font-bold text-sm">{selectedMoto?.name}</p>
                <div className="flex justify-between mt-1">
                  <p className="text-gray-400 text-sm">{form.term} months</p>
                  <p className="text-[#C8F437] font-bold">{fmt(price)}/wk</p>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-gray-400 text-sm">Deposit</p>
                  <p className="text-white font-medium">{fmt(selectedMoto?.deposit || 0)}</p>
                </div>
              </div>

              {/* Docs */}
              <div className="bg-[#111820] border border-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Documents</p>
                  <button
                    onClick={() => setStep(3)}
                    className="text-[#C8F437] text-xs"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'cedula', label: 'Cédula' },
                    { key: 'license', label: 'License' },
                    { key: 'utility', label: 'Utility bill' },
                    { key: 'reference', label: 'Reference' },
                  ].map((d) => (
                    <div key={d.key} className="flex items-center gap-1.5">
                      <span className={form.docs[d.key] ? 'text-green-400' : 'text-gray-600'}>
                        {f
