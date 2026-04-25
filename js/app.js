// ===== MOTO DATA =====
const motos = [
    { id: 'flex-125', name: 'AKT Flex 125', emoji: '🏍️', cc: '125cc', consumption: '48 km/L', weekly12: 75000, weekly18: 60000, deposit: 400000, tag: 'Más económica', color: '#E8F5E9' },
    { id: 'eco-t-110', name: 'Honda Eco T 110', emoji: '🏍️', cc: '110cc', consumption: '55 km/L', weekly12: 85000, weekly18: 68000, deposit: 400000, tag: 'Más popular', color: '#FFF8E1' },
    { id: 'crypton-fi', name: 'Yamaha Crypton FI', emoji: '🏍️', cc: '115cc', consumption: '50 km/L', weekly12: 90000, weekly18: 72000, deposit: 450000, tag: null, color: '#E3F2FD' },
    { id: 'cb-125f', name: 'Honda CB 125F', emoji: '🏍️', cc: '125cc', consumption: '45 km/L', weekly12: 100000, weekly18: 80000, deposit: 500000, tag: 'Más potente', color: '#FCE4EC' }
];


// ===== STATE =====
let selectedMoto = null;
let selectedTerm = null;
let currentStep = 1;


// ===== HELPERS =====
function formatCOP(n) {
    return '$' + n.toLocaleString('es-CO');
}

function shakeInput(id) {
    const el = document.getElementById(id);
    el.style.borderColor = 'var(--red)';
    el.focus();
    setTimeout(() => el.style.borderColor = '', 2000);
}


// ===== RENDER CATALOG =====
function renderMotos() {
    const grid = document.getElementById('motoGrid');
    const select = document.getElementById('selectMoto');

    grid.innerHTML = motos.map(m => `
        <div class="moto-card" id="card-${m.id}" onclick="highlightMoto('${m.id}')">
            ${m.tag ? `<div class="tag">${m.tag}</div>` : ''}
            <div class="moto-img" style="background:${m.color}">${m.emoji}</div>
            <h3>${m.name}</h3>
            <div class="moto-specs">${m.cc} · ${m.consumption}</div>
            <div class="moto-price">${formatCOP(m.weekly12)} <span>/sem</span></div>
            <button class="moto-btn" onclick="event.stopPropagation(); reserveMoto('${m.id}')">Reservar →</button>
        </div>
    `).join('');

    select.innerHTML = '<option value="">Selecciona una moto</option>' +
        motos.map(m => `<option value="${m.id}">${m.name} — ${formatCOP(m.weekly12)}/sem</option>`).join('');
}


// ===== MOTO SELECTION =====
function highlightMoto(id) {
    selectedMoto = motos.find(m => m.id === id);
    document.querySelectorAll('.moto-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('card-' + id).classList.add('selected');
    updateCalc();
}

function reserveMoto(id) {
    highlightMoto(id);
    document.getElementById('solicitud').scrollIntoView({ behavior: 'smooth' });
}

function clearMotoSelection() {
    selectedMoto = null;
    document.querySelectorAll('.moto-card').forEach(c => c.classList.remove('selected'));
    updateStep3();
}


// ===== CALCULATOR =====
function updateCalc() {
    const deliveries = parseInt(document.getElementById('deliveriesSlider').value);
    const days = parseInt(document.getElementById('daysSlider').value);

    const weeklyIncome = deliveries * days * 5000;
    const weeklyRent = selectedMoto ? selectedMoto.weekly12 : 85000;
    const weeklyGas = deliveries * days * 450;
    const net = weeklyIncome - weeklyRent - weeklyGas;

    document.getElementById('deliveriesValue').textContent = deliveries;
    document.getElementById('daysValue').textContent = days;
    document.getElementById('calcIncome').textContent = formatCOP(weeklyIncome);
    document.getElementById('calcRent').textContent = '-' + formatCOP(weeklyRent);
    document.getElementById('calcGas').textContent = '-' + formatCOP(weeklyGas);
    document.getElementById('calcNet').textContent = formatCOP(net);
}

document.getElementById('deliveriesSlider').addEventListener('input', updateCalc);
document.getElementById('daysSlider').addEventListener('input', updateCalc);


// ===== FORM NAVIGATION =====
function goToStep(step) {
    // Validation step 1 → 2
    if (step === 2 && currentStep === 1) {
        const name = document.getElementById('inputName').value.trim();
        const phone = document.getElementById('inputPhone').value.trim();
        if (!name) { shakeInput('inputName'); return; }
        if (phone.length < 7) { shakeInput('inputPhone'); return; }
        document.getElementById('otpPhone').textContent = phone;
    }

    // Validation step 3 → 4
    if (step === 4 && currentStep === 3) {
        const sel = document.getElementById('selectMoto');
        if (!selectedMoto && !sel.value) return;
        if (!selectedMoto && sel.value) selectedMoto = motos.find(m => m.id === sel.value);
        if (!selectedTerm) return;
    }

    currentStep = step;

    // Toggle visibility
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');

    // Progress bar
    document.querySelectorAll('.progress-step').forEach((s, i) => {
        s.classList.toggle('active', i < step);
    });

    const texts = [
        '',
        'Paso 1 de 4 — Tus datos',
        'Paso 2 de 4 — Verificación',
        'Paso 3 de 4 — Tu moto',
        'Paso 4 de 4 — Documentos',
        ''
    ];
    document.getElementById('progressText').textContent = texts[step] || '';

    if (step === 3) updateStep3();

    if (step === 5) {
        document.getElementById('formProgress').style.display = 'none';
        document.getElementById('progressText').style.display = 'none';
        document.getElementById('formSubtitle').style.display = 'none';
        document.getElementById('formTitle').textContent = '';
        if (selectedMoto) {
            document.getElementById('successMotoName').textContent = selectedMoto.name + ' — ¡va para ti!';
        }
    }

    document.getElementById('solicitud').scrollIntoView({ behavior: 'smooth' });
}


// ===== STEP 3: MOTO + TERM =====
function updateStep3() {
    const display = document.getElementById('selectedMotoDisplay');
    const selectGroup = document.getElementById('motoSelectGroup');

    if (selectedMoto) {
        display.innerHTML = `
            <div class="selected-moto-card">
                <div class="moto-emoji">${selectedMoto.emoji}</div>
                <div class="moto-info">
                    <h4>${selectedMoto.name}</h4>
                    <p>${selectedMoto.cc} · Depósito ${formatCOP(selectedMoto.deposit)}</p>
                </div>
                <button class="change-moto" onclick="clearMotoSelection()">Cambiar</button>
            </div>
        `;
        selectGroup.style.display = 'none';
        document.getElementById('selectMoto').value = selectedMoto.id;
    } else {
        display.innerHTML = '';
        selectGroup.style.display = 'block';
    }

    const moto = selectedMoto || motos[1];
    document.getElementById('term12price').textContent = formatCOP(moto.weekly12) + '/sem';
    document.getElementById('term18price').textContent = formatCOP(moto.weekly18) + '/sem';
}


// ===== TERM SELECTION =====
function selectTerm(el) {
    document.querySelectorAll('.term-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedTerm = el.dataset.term;
}


// ===== OTP =====
document.querySelectorAll('.otp-input').forEach((input, idx, inputs) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && idx < inputs.length - 1) {
            inputs[idx + 1].focus();
        }
        const allFilled = Array.from(inputs).every(i => i.value.length === 1);
        document.getElementById('otpBtn').disabled = !allFilled;
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && idx > 0) {
            inputs[idx - 1].focus();
        }
    });
});

function resendOTP(e) {
    e.preventDefault();
    // TODO: resend OTP via API
}


// ===== DOCUMENT UPLOAD =====
function docUploaded(index, input) {
    if (input.files.length > 0) {
        document.getElementById('docStatus' + index).textContent = '✅';
        input.closest('.doc-upload').classList.add('uploaded');
    }
}


// ===== SUBMIT =====
function submitForm() {
    const refName = document.getElementById('refName').value.trim();
    const refPhone = document.getElementById('refPhone').value.trim();
    const refRelation = document.getElementById('refRelation').value;
    if (!refName || !refPhone || !refRelation) return;

    // TODO: send data to backend / Google Sheets / webhook
    goToStep(5);
}


// ===== MOTO DROPDOWN CHANGE =====
document.getElementById('selectMoto').addEventListener('change', function () {
    if (this.value) {
        selectedMoto = motos.find(m => m.id === this.value);
        document.getElementById('term12price').textContent = formatCOP(selectedMoto.weekly12) + '/sem';
        document.getElementById('term18price').textContent = formatCOP(selectedMoto.weekly18) + '/sem';
    }
});


// ===== INIT =====
renderMotos();
updateCalc();
