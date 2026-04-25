import { useState, useRef } from 'react';

const motos = [
  { id: 'akt-nkd', name: 'AKT NKD 125', year: 2027, condition: 'New', img: '🏍️', prices: { 12: 210000, 18: 160000 }, deposit: 650000, depositCuotas: 325000 },
  { id: 'hero-eco', name: 'Hero Eco T', year: 2027, condition: 'New', img: '🏍️', prices: { 12: 200000, 18: 155000 }, deposit: 600000, depositCuotas: 300000 },
  { id: 'hero-deluxe', name: 'Hero Eco Deluxe', year: 2027, condition: 'New', img: '🏍️', prices: { 12: 230000, 18: 180000 }, deposit: 700000, depositCuotas: 350000 },
  { id: 'victory-combat', name: 'Victory Combat', year: 2025, condition: 'Used', img: '🏍️', prices: { 12: 150000, 18: 110000 }, deposit: 400000, depositCuotas: 200000 },
];

const reviews = [
  { name: 'Carlos M.', city: 'Bogotá', text: 'I showed up with no moto and no credit history. In 2 days I was already riding for Rappi. The payment pays for itself.', months: 4, handle: '@carlosrapi' },
  { name: 'Julián P.', city: 'Bogotá', text: 'I thought it was too good to be true. But I did the math and I keep over $800K a week clean.', months: 6, handle: '@julian_delivery' },
  { name: 'Andrea R.', city: 'Soacha', text: "I'm a single mom. With the Naran moto I work my own hours and pay the installment stress-free.", months: 3, handle: '@andrearuedas' },
  { name: 'Pipe G.', city: 'Bogotá', text: 'The bank denied me everything. Here they only asked for my ID and license. Already 5 months paying with no issues.', months: 5, handle: '@pipedelivery' },
  { name: 'Valentina S.', city: 'Bogotá', text: 'The best part is the support. I got a flat tire on a Sunday and they helped me the same day.', months: 2, handle: '@vale_rappi' },
];

const fmt = (n) => Math.round(n).toLocaleString('es-CO');

function ReviewCarousel() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    const newIdx = Math.max(0, Math.min(reviews.length - 1, active + dir));
    setActive(newIdx);
    scrollRef.current.scrollTo({ left: newIdx * (w * 0.82), behavior: 'smooth' });
  };
  return (
    <section className="py-6 border-t border-gray-800">
      <div className="px-5 flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-sm">What our drivers say</h2>
          <p className="text-xs text-gray-500 mt-0.5">Real stories from TikTok</p>
        </div>
        <span className="text-xl">🎵</span>
      </div>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto px-5 pb-3 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {reviews.map((r, i) => (
          <div key={i} className="snap-start shrink-0 w-72 bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold text-lime-400">{r.name[0]}</div>
              <div>
                <div className="font-bold text-sm">{r.name}</div>
                <div className="text-xs text-gray-500">{r.city} · {r.months} months with Naran</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed italic">"{r.text}"</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-600">{r.handle}</span>
              <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-xs">★</span>)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-5 mt-3">
        <div className="flex gap-1.5">{reviews.map((_, i) => <div key={i} className={`h-1 rounded-full transition-all ${i === active ? 'w-6 bg-lime-400' : 'w-1.5 bg-gray-700'}`} />)}</div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 text-sm flex items-center justify-center">←</button>
          <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 text-sm flex items-center justify-center">→</button>
        </div>
      </div>
      <div className="px-5 mt-4">
        <a href="https://www.tiktok.com/@naran" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gray-900 border border-gray-700 text-white font-bold text-sm py-3 rounded-xl">
          <span>🎵</span> See more stories on TikTok
        </a>
      </div>
    </section>
  );
}

function MultiStepForm({ preselectedMoto }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Bogotá');
  const [selectedMoto, setSelectedMoto] = useState(preselectedMoto || null);
  const [plazo, setPlazo] = useState(18);
  const [docs, setDocs] = useState({ cedulaFront: null, cedulaBack: null, licencia: null });
  const [ref1, setRef1] = useState({ name: '', phone: '' });
  const [ref2, setRef2] = useState({ name: '', phone: '' });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const canNext = () => {
    if (step === 1) return name.trim() && phone.trim();
    if (step === 2) return selectedMoto !== null;
    if (step === 3) return docs.cedulaFront && docs.licencia;
    return true;
  };

  const handleFile = (key) => {
    setDocs(prev => ({ ...prev, [key]: key + '_uploaded.jpg' }));
  };

  const DocUploadBox = ({ label, docKey, icon }) => (
    <button
      onClick={() => handleFile(docKey)}
      className={`w-full rounded-xl p-4 text-left transition-all ${docs[docKey] ? 'bg-lime-400 bg-opacity-10 border-2 border-lime-400' : 'bg-gray-800 border-2 border-gray-700 border-dashed'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${docs[docKey] ? 'bg-lime-400 bg-opacity-20' : 'bg-gray-700'}`}>
          {docs[docKey] ? '✅' : icon}
        </div>
        <div>
          <div className={`font-bold text-sm ${docs[docKey] ? 'text-lime-400' : 'text-white'}`}>{label}</div>
          <div className="text-xs text-gray-500 mt-0.5">{docs[docKey] ? 'Photo uploaded' : 'Tap to take photo'}</div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="bg-gray-900 rounded-2xl border-2 border-lime-400 overflow-hidden">
      <div className="bg-gray-800 h-1.5">
        <div className="bg-lime-400 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="px-4 pt-3 pb-1 flex justify-between items-center">
        <span className="text-xs text-gray-500">Step {step} of {totalSteps}</span>
        {step > 1 && step <= totalSteps && (
          <button onClick={() => setStep(step - 1)} className="text-xs text-gray-400 underline">← Back</button>
        )}
      </div>

      <div className="p-5 pt-2">
        {step === 1 && (
          <div>
            <h3 className="font-black text-lg mb-1">Your info</h3>
            <p className="text-gray-400 text-xs mb-4">We'll contact you today</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Full name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="E.g.: Juan Pérez" className="w-full bg-gray-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-lime-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">WhatsApp</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="300 123 4567" className="w-full bg-gray-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-lime-400" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">City</label>
                <select value={city} onChange={e => setCity(e.target.value)} className="w-full bg-gray-800 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:ring-2 focus:ring-lime-400">
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
            <h3 className="font-black text-lg mb-1">Choose your moto</h3>
            <p className="text-gray-400 text-xs mb-4">Which one do you want to ride?</p>
            <div className="space-y-2 mb-4">
              {motos.map(m => (
                <button key={m.id} onClick={() => setSelectedMoto(m)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${selectedMoto?.id === m.id ? 'bg-lime-400 bg-opacity-10 border-2 border-lime-400' : 'bg-gray-800 border-2 border-transparent'}`}>
                  <div className="text-3xl">{m.img}</div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{m.name}</div>
                    <div className="text-xs text-gray-400">{m.condition} · {m.year}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lime-400 font-black text-sm">${fmt(m.prices[18])}</div>
                    <div className="text-gray-500 text-xs">/wk</div>
                  </div>
                </button>
              ))}
            </div>
            {selectedMoto && (
              <div>
                <label className="text-xs text-gray-500 mb-2 block">Term</label>
                <div className="grid grid-cols-2 gap-2">
                  {[18, 12].map(p => (
                    <button key={p} onClick={() => setPlazo(p)} className={`py-3 rounded-xl text-sm font-bold transition-all ${plazo === p ? 'bg-lime-400 text-gray-950' : 'bg-gray-800 text-gray-400'}`}>
                      {p} months · ${fmt(selectedMoto.prices[p])}/wk
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-black text-lg mb-1">Your documents</h3>
            <p className="text-gray-400 text-xs mb-4">Take a clear photo of each one</p>
            <div className="space-y-3">
              <DocUploadBox label="ID card — front side" docKey="cedulaFront" icon="🪪" />
              <DocUploadBox label="ID card — back side" docKey="cedulaBack" icon="🔄" />
              <DocUploadBox label="Driver's license" docKey="licencia" icon="🏍️" />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <h4 className="font-bold text-sm mb-3">2 personal references</h4>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-xl p-3 space-y-2">
                  <div className="text-xs text-gray-500">Reference 1</div>
                  <input value={ref1.name} onChange={e => setRef1({ ...ref1, name: e.target.value })} placeholder="Name" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none" />
                  <input value={ref1.phone} onChange={e => setRef1({ ...ref1, phone: e.target.value })} placeholder="Phone" type="tel" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none" />
                </div>
                <div className="bg-gray-800 rounded-xl p-3 space-y-2">
                  <div className="text-xs text-gray-500">Reference 2</div>
                  <input value={ref2.name} onChange={e => setRef2({ ...ref2, name: e.target.value })} placeholder="Name" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none" />
                  <input value={ref2.phone} onChange={e => setRef2({ ...ref2, phone: e.target.value })} placeholder="Phone" type="tel" className="w-full bg-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-black text-xl text-lime-400 mb-2">Application submitted!</h3>
            <p className="text-gray-400 text-sm mb-6">We'll contact you in less than 2 hours</p>

            <div className="bg-gray-800 rounded-xl p-4 text-left space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Name</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">WhatsApp</span>
                <span className="font-medium">{phone}</span>
              </div>
              {selectedMoto && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Moto</span>
                    <span className="font-medium">{selectedMoto.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Payment</span>
                    <span className="font-bold text-lime-400">${fmt(selectedMoto.prices[plazo])}/wk × {plazo} months</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Documents</span>
                <span className="text-lime-400 font-medium">{Object.values(docs).filter(Boolean).length}/3 ✅</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-400">📋 Next steps:</p>
              <p className="text-sm mt-1">We call you → Verify docs → You sign → Ride out!</p>
            </div>
          </div>
        )}

        {step < 4 && (
          <button
            onClick={() => { if (canNext()) setStep(step + 1); }}
            className={`w-full mt-5 font-black text-center py-4 rounded-xl text-base transition-all active:scale-95 ${canNext() ? 'bg-lime-400 text-gray-950' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
            {step === 1 && 'Next →'}
            {step === 2 && (selectedMoto ? `Continue with ${selectedMoto.name} →` : 'Choose a moto')}
            {step === 3 && 'Submit application →'}
          </button>
        )}
        {step < 4 && <p className="text-center text-gray-600 text-xs mt-2">No commitment · No co-signer needed</p>}
      </div>
    </div>
  );
}

function Catalog({ onSelect, onScrollToForm }) {
  return (
    <div>
      <section className="px-5 pt-8 pb-6 text-center">
        <h1 className="text-2xl font-black leading-tight">Your moto for <span className="text-lime-400">delivery work</span></h1>
        <p className="text-gray-400 text-sm mt-2">Choose your moto. Pay it off with what you earn.</p>
      </section>

      <section className="px-4 pb-6 space-y-3">
        {motos.map(m => (
          <div key={m.id} className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <div className="flex gap-4">
              <button onClick={() => onSelect(m)} className="shrink-0 w-24 h-24 bg-gray-800 rounded-xl flex items-center justify-center text-5xl">{m.img}</button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.condition === 'New' ? 'bg-lime-400 text-gray-950' : 'bg-yellow-500 text-gray-950'}`}>{m.condition}</span>
                  <span className="text-xs text-gray-500">{m.year}</span>
                </div>
                <button onClick={() => onSelect(m)} className="text-left"><h3 className="font-bold text-base">{m.name}</h3></button>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lime-400 font-black text-xl">${fmt(m.prices[18])}</span>
                  <span className="text-gray-500 text-xs">/week</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">From ${fmt(m.prices[12])}/wk at 12 months</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button onClick={() => onSelect(m)} className="bg-gray-800 text-gray-300 font-bold text-sm py-2.5 rounded-xl text-center">See details</button>
              <button onClick={onScrollToForm} className="bg-lime-400 text-gray-950 font-black text-sm py-2.5 rounded-xl text-center active:scale-95 transition-transform">Apply now →</button>
            </div>
          </div>
        ))}
      </section>

      <section className="px-5 py-6 border-t border-gray-800">
        <h2 className="font-bold text-center mb-4">Your payment includes</h2>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[{ e: '🏍️', t: 'Moto' }, { e: '📋', t: 'Insurance' }, { e: '📍', t: 'GPS' }, { e: '🔧', t: 'Support' }].map((x, i) => (
            <div key={i} className="text-xs text-gray-400"><div className="text-lg mb-1">{x.e}</div>{x.t}</div>
          ))}
        </div>
      </section>

      <ReviewCarousel />

      <section className="px-5 py-6 border-t border-gray-800">
        <h2 className="font-bold text-center mb-4">All you need</h2>
        <div className="space-y-2 text-sm">
          {['📄 National ID card (cédula)', '🏍️ Driver\'s license A1 or A2', '👥 2 personal references'].map((x, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-3">{x}</div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-xs mt-3">No co-signer · No credit history needed</p>
      </section>
    </div>
  );
}

function MotoPage({ moto, onBack }) {
  const [plazo, setPlazo] = useState(18);
  const [depType, setDepType] = useState('cuotas');
  const [showCalc, setShowCalc] = useState(false);
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(6);

  const cuota = moto.prices[plazo];
  const weeklyGross = 8 * 6 * 24000;
  const weeklyGas = Math.round(8 * 6 * 1518);
  const weeklyComm = Math.round(weeklyGross * 0.089);
  const weeklyNet = weeklyGross - cuota - weeklyGas - weeklyComm;

  const calcGross = hours * days * 24000;
  const calcGas = Math.round(hours * days * 1518);
  const calcComm = Math.round(calcGross * 0.089);
  const calcNet = calcGross - cuota - calcGas - calcComm;
  const calcMonthly = Math.round(calcNet * 4.3);

  const waMsg = `Hi! I want the ${moto.name} ${moto.year} for ${plazo} months.`;
  const waURL = `https://wa.me/573219391403?text=${encodeURIComponent(waMsg)}`;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 px-5 pt-4 text-gray-400 text-sm">← All motos</button>

      <section className="px-5 pt-4 pb-6">
        <div className="bg-gray-900 rounded-2xl p-8 text-center mb-5"><div className="text-7xl">{moto.img}</div></div>

        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${moto.condition === 'New' ? 'bg-lime-400 text-gray-950' : 'bg-yellow-500 text-gray-950'}`}>{moto.condition}</span>
          <span className="text-xs text-gray-500">{moto.year}</span>
        </div>
        <h1 className="text-2xl font-black">{moto.name}</h1>

        <div className="mt-5">
          <div className="text-xs text-gray-500 mb-2">Term</div>
          <div className="grid grid-cols-2 gap-2">
            {[18, 12].map(p => (
              <button key={p} onClick={() => setPlazo(p)} className={`py-3 rounded-xl text-sm font-bold transition-all ${plazo === p ? 'bg-lime-400 text-gray-950' : 'bg-gray-800 text-gray-400'}`}>{p} months</button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Deposit: ${fmt(moto.deposit)}</div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setDepType('full')} className={`py-3 rounded-xl text-sm font-bold transition-all ${depType === 'full' ? 'bg-lime-400 text-gray-950' : 'bg-gray-800 text-gray-400'}`}>Pay in full</button>
            <button onClick={() => setDepType('cuotas')} className={`py-3 rounded-xl text-sm font-bold transition-all ${depType === 'cuotas' ? 'bg-lime-400 text-gray-950' : 'bg-gray-800 text-gray-400'}`}>2 payments of ${fmt(moto.depositCuotas)}</button>
          </div>
        </div>

        <div className="mt-5 bg-gray-900 rounded-2xl p-5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-xs text-gray-500">Your weekly payment</div>
              <div className="text-3xl font-black text-lime-400">${fmt(cuota)}</div>
            </div>
            <div className="text-right"><div className="text-xs text-gray-500">for {plazo} months</div></div>
          </div>
          <div className="border-t border-gray-800 pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Delivery earnings (8h/day, 6 days)</span>
              <span className="text-green-400 font-medium">${fmt(weeklyGross)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Payment + expenses</span>
              <span className="text-red-400">−${fmt(cuota + weeklyGas + weeklyComm)}</span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-gray-800">
              <span className="font-bold text-sm">You keep each week</span>
              <span className="font-black text-lime-400">${fmt(weeklyNet)} ✅</span>
            </div>
          </div>
        </div>

        <button onClick={() => setShowCalc(!showCalc)} className="w-full text-center text-sm text-lime-400 underline mt-3 py-2">
          {showCalc ? 'Close calculator' : 'Work more or fewer hours? Calculate exactly →'}
        </button>

        {showCalc && (
          <div className="bg-gray-900 rounded-2xl p-4 mt-2">
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Hours/day</span><span className="text-lime-400 font-bold">{hours}h</span></div>
              <input type="range" min={4} max={12} value={hours} onChange={e => setHours(+e.target.value)} />
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-400">Days/week</span><span className="text-lime-400 font-bold">{days}</span></div>
              <input type="range" min={3} max={7} value={days} onChange={e => setDays(+e.target.value)} />
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <div className="flex justify-between text-sm"><span className="text-gray-400">You earn</span><span className="text-green-400">${fmt(calcGross)}/wk</span></div>
              <div className="flex justify-between text-sm mt-1"><span className="text-gray-400">Payment + expenses</span><span className="text-red-400">−${fmt(cuota + calcGas + calcComm)}</span></div>
              <div className="flex justify-between mt-2 pt-2 border-t border-gray-700 font-bold text-sm">
                <span>You keep</span>
                <span className={calcNet > 0 ? 'text-lime-400' : 'text-red-400'}>${fmt(Math.max(calcNet, 0))}/wk</span>
              </div>
              {calcNet > 0 && <div className="text-center mt-2 text-lime-400 font-black text-lg">${fmt(calcMonthly)}/month</div>}
            </div>
          </div>
        )}

        <div className="mt-6">
          <MultiStepForm preselectedMoto={moto} />
          <div className="mt-3 text-center">
            <a href={waURL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 text-sm underline">or message us on WhatsApp</a>
          </div>
        </div>
      </section>

      <ReviewCarousel />

      <section className="px-5 py-6 border-t border-gray-800">
        <h2 className="font-bold text-center mb-4 text-sm">Your payment includes</h2>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[{ e: '🏍️', t: 'Moto' }, { e: '📋', t: 'Insurance' }, { e: '📍', t: 'GPS' }, { e: '🔧', t: '24/7' }].map((x, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-3"><div className="text-lg mb-1">{x.e}</div><div className="text-xs text-gray-400">{x.t}</div></div>
          ))}
        </div>
      </section>

      <section className="px-5 py-6 border-t border-gray-800">
        <h2 className="font-bold text-center mb-3 text-sm">Frequently asked questions</h2>
        {[
          { q: 'What if I can\'t pay one week?', a: 'We talk to you and find a solution. We don\'t take your moto away over one tough week.' },
          { q: 'What if the moto breaks down?', a: '24/7 technical support included. Normal mechanical issues are on us.' },
          { q: 'Will the moto be in my name?', a: 'When you finish paying, the moto is 100% yours with papers in your name.' },
        ].map((faq, i) => (
          <details key={i} className="bg-gray-900 rounded-xl mb-2">
            <summary className="p-3 text-sm font-medium cursor-pointer">{faq.q}</summary>
            <p className="px-3 pb-3 text-sm text-gray-400">{faq.a}</p>
          </details>
        ))}
      </section>

      <section className="px-5 py-6 pb-24 text-center border-t border-gray-800">
        <p className="text-gray-600 text-xs">📍 Auto. Norte #123–63, Bogotá<br />Mon–Fri 8AM–5PM</p>
      </section>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const formRef = useRef(null);

  const scrollToForm = () => {
    setTimeout(() => {
      if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white max-w-md mx-auto">
      <div className="bg-lime-400 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => setSelected(null)} className="text-gray-950 font-black text-xl tracking-tight">naran.</button>
        <span className="text-gray-800 text-xs">Bogotá</span>
      </div>

      {selected ? (
        <MotoPage moto={selected} onBack={() => setSelected(null)} />
      ) : (
        <div>
          <Catalog onSelect={setSelected} onScrollToForm={scrollToForm} />
          <div ref={formRef} className="px-5 pb-6 -mt-6">
            <MultiStepForm preselectedMoto={null} />
            <div className="mt-3 text-center">
              <a href="https://wa.me/573219391403?text=Hi!%20I%20want%20info%20about%20the%20motos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 text-sm underline">or message us on WhatsApp</a>
            </div>
          </div>
          <section className="px-5 py-6 pb-24 text-center border-t border-gray-800">
            <p className="text-gray-600 text-xs">📍 Auto. Norte #123–63, Bogotá<br />Mon–Fri 8AM–5PM</p>
          </section>
        </div>
      )}
    </div>
  );
}
