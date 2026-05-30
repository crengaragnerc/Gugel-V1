// ==========================================
// ESTADO GLOBAL DEL SISTEMA (GUGEL)
// ==========================================
let gameState = {
    cycles: 0,
    charsSent: 0,
    history: [],
    modoActualJuego: 'campaña', // 'campaña' o 'infinito'
    campanaIndex: 0,
    campanaCompletada: false,
    currentPregunta: "",
    modoSeleccionadoSiguiente: ""
};

let currentUser = null;

// Constantes de Campaña (Las 10 misiones canónicas)
const PREGUNTAS_CAMPANA = [
    "¿Por qué mi gato me mira fijamente mientras duermo?",
    "¿Es normal que el router parpadee en rojo a las 3 AM?",
    "¿Cómo explicas que la plastilina se vuelva gris si mezclas todo?",
    "¿Qué sucede cuando dejas el cargador enchufado sin el móvil?",
    "¿Me dices por qué el wifi va más lento cuando llueve?",
    "¿Por qué el teclado de mi ordenador tiene las letras desordenadas?",
    "¿Es normal que la batería del móvil baje del 20% al 1% en un minuto?",
    "¿Cómo explicas que el vecino tenga exactamente el mismo modelo de televisión?",
    "¿Qué sucede si pulsas F5 continuamente durante diez minutos?",
    "¿Me dices por qué la conexión se corta justo cuando voy a ganar?"
];

// Constantes de Modo Infinito
const PLANTILLAS_PREGUNTAS = [
    "¿por qué [s] [p]?",
    "¿es normal que [s] [p]?",
    "¿cómo explicas que [s] [p]?",
    "¿qué sucede cuando [s] [p]?",
    "¿me dices por qué [s] [p]?"
];

const INFINITO_SUJETOS = ["mi gato", "el router", "la conexión", "el vecino", "la plastilina", "el teclado", "la batería", "el wifi", "el cargador"];
const INFINITO_PREDICADOS = ["está ardiendo", "hace un ruido raro", "se ha vuelto loco", "no enciende", "parpadea todo el rato", "se queda pillado", "está muy lento"];

// Constantes de Logros del Sistema
const LOGROS_SISTEMA = [
    { id: "primer_paso", titulo: "Primer Enlace", desc: "Envía tu primera respuesta de simulación de IA.", cond: (state) => state.cycles >= 1 },
    { id: "veterano", titulo: "Procesador Veterano", desc: "Procesa un total de 10 consultas en el sistema.", cond: (state) => state.cycles >= 10 },
    { id: "escritor", titulo: "Generador de Datos", desc: "Transmite más de 100 caracteres al núcleo de GUGEL.", cond: (state) => state.charsSent >= 100 },
    { id: "campana_top", titulo: "Misión Cumplida", desc: "Completa con éxito las 10 misiones del modo campaña.", cond: (state) => state.campanaCompletada }
];

// ==========================================
// NÚCLEO DE LOGICA DEL JUEGO
// ==========================================
function generarPregunta() {
    if (gameState.modoActualJuego === "campaña") {
        if (gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campanaCompletada = true;
            return null;
        }
        return PREGUNTAS_CAMPANA[gameState.campanaIndex++];
    } else {
        const s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        const p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        return plantilla.replace("[s]", s).replace("[p]", p);
    }
}

function nextRound() {
    const chatBox = document.getElementById('chat-messages');
    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');

    if (!chatBox) return;

    // Reactivar controles de transmisión
    if (input) { input.disabled = false; input.value = ""; }
    if (transBtn) transBtn.style.display = "inline-block";
    if (contBtn) contBtn.style.display = "none";

    const pregunta = generarPregunta();

    if (pregunta === null && gameState.modoActualJuego === "campaña") {
        appendMessage('gugel', "⚠️ CAMPAÑA COMPLETADA. Has procesado los 10 módulos de datos obligatorios de forma lógica.");
        if (input) input.disabled = true;
        if (transBtn) transBtn.disabled = true;
        renderAllData();
        guardarProgresoCuenta();
        return;
    }

    gameState.currentPregunta = pregunta;
    appendMessage('gugel', pregunta);
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById('chat-messages');
    if (!chatBox) return;

    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ==========================================
// INTERFAZ, VISTAS Y NAVEGACIÓN
// ==========================================
function switchView(viewId) {
    // 1. Desactivar todos los paneles y botones secundarios
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    // 2. Si volvemos a la interfaz principal (Core)
    if (viewId === 'view-core') {
        const panelCore = document.getElementById('view-core');
        if (panelCore) panelCore.classList.add('active');
        return;
    }

    // 3. Activar el panel seleccionado
    const targetPanel = document.getElementById(viewId);
    if (targetPanel) targetPanel.classList.add('active');

    // Mapear el botón lateral correspondiente para ponerle la clase active
    let btnId = "";
    if (viewId === 'view-perfil') btnId = 'btn-view-perfil';
    if (viewId === 'view-logros') btnId = 'btn-view-logros';
    if (viewId === 'view-historial') btnId = 'btn-view-historial';

    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add('active');

    // Forzar renderizado para asegurar coherencia visual
    renderAllData();
}

function cambiarModoEstrategia(modo) {
    if (gameState.modoActualJuego === modo) {
        switchView('view-core');
        return;
    }

    // Configurar estados de botones de modo
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    if (modo === 'campaña') document.getElementById('btn-mode-campaña').classList.add('active');
    if (modo === 'infinito') document.getElementById('btn-mode-infinito').classList.add('active');

    gameState.modoSeleccionadoSiguiente = modo;

    // Cambiar dinámicamente el título del header de la interfaz
    const titleText = document.getElementById('panel-title-text');
    if (titleText) {
        titleText.innerText = `Interfaz Core - ${modo.charAt(0).toUpperCase() + modo.slice(1)}`;
    }

    // Interrupción del flujo para confirmar la carga del nuevo módulo
    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');

    if (input) input.disabled = true;
    if (transBtn) transBtn.style.display = "none";
    if (contBtn) {
        contBtn.style.display = "inline-block";
        contBtn.innerText = `CARGAR MÓDULO ${modo.toUpperCase()}`;
    }

    switchView('view-core');
}

function confirmContinue() {
    gameState.modoActualJuego = gameState.modoSeleccionadoSiguiente;
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = "";
    nextRound();
}

// ==========================================
// RENDERIZADO COMPLETO DE PANELES DE DATOS
// ==========================================
function renderAllData() {
    // 1. Panel de Perfil y Estadísticas
    const profCycles = document.getElementById('prof-cycles');
    const profChars = document.getElementById('prof-chars');
    const profSatisfaction = document.getElementById('prof-satisfaction');
    const profOpinion = document.getElementById('prof-opinion');

    if (profCycles) profCycles.innerText = gameState.cycles;
    if (profChars) profChars.innerText = gameState.charsSent;

    // Cálculo dinámico de la opinión basada en la longitud media de tus respuestas
    if (profSatisfaction && profOpinion) {
        if (gameState.cycles === 0) {
            profSatisfaction.innerText = "50%";
            profOpinion.innerText = "(analizando conexiones...)";
        } else {
            let promedioTextos = gameState.charsSent / gameState.cycles;
            if (promedioTextos < 15) {
                profSatisfaction.innerText = "25%";
                profOpinion.innerText = "IA demasiado escueta. Respuestas con poca sustancia lógica.";
            } else if (promedioTextos >= 15 && promedioTextos < 40) {
                profSatisfaction.innerText = "65%";
                profOpinion.innerText = "IA equilibrada. Sigue las directrices y responde con coherencia.";
            } else {
                profSatisfaction.innerText = "90%";
                profOpinion.innerText = "Excelente simulación. Respuestas descriptivas y alta precisión de datos.";
            }
        }
    }

    // 2. Panel de Logros
    const logrosCount = document.getElementById('logros-count');
    const logrosContainer = document.getElementById('logros-container');
    if (logrosContainer) {
        let conseguidos = 0;
        logrosContainer.innerHTML = LOGROS_SISTEMA.map(logro => {
            const desbloqueado = logro.cond(gameState);
            if (desbloqueado) conseguidos++;
            return `
                <div class="list-item" style="border-left: 4px solid ${desbloqueado ? 'var(--color-accent)' : '#555'}">
                    <strong>${logro.titulo}</strong> ${desbloqueado ? '✅' : '🔒'}<br>
                    <small>${logro.desc}</small>
                </div>
            `;
        }).join('');
        if (logrosCount) logrosCount.innerText = conseguidos;
    }

    // 3. Panel del Historial
    const historyContainer = document.getElementById('history-list-container');
    if (historyContainer) {
        historyContainer.innerHTML = gameState.history.map((h, idx) => `
            <div class="historial-item">
                <div>
                    <strong>Q: ${h.pregunta}</strong><br>
                    <em>A: ${h.respuesta}</em><br>
                    <small style="color: var(--color-accent)">GUGEL: ${h.reaccion}</small>
                </div>
                <button class="fav-btn ${h.fav ? 'active' : ''}" onclick="toggleFavorite(${idx}, event)">★</button>
            </div>
        `).join('');
    }

    // Ocultar dinámicamente el botón de campaña en el menú lateral si ya se completó
    const btnCampSidebar = document.getElementById('btn-mode-campaña');
    if (btnCampSidebar) {
        btnCampSidebar.style.display = gameState.campanaCompletada ? "none" : "inline-block";
    }
}

window.toggleFavorite = function(idx, event) {
    if (event) event.stopPropagation();
    gameState.history[idx].fav = !gameState.history[idx].fav;
    guardarProgresoCuenta();
    renderAllData();
};

function exportCoreData() {
    let txt = gameState.history.map(h => `Q: ${h.pregunta} | A: ${h.respuesta} | GUGEL: ${h.reaccion}`).join('\n');
    navigator.clipboard.writeText(txt || "Búfer vacío").then(() => alert("Registro copiado."));
}

// ==========================================
// ALMACENAMIENTO LOCAL Y GESTIÓN DE CUENTAS
// ==========================================
function guardarProgresoCuenta() {
    if (currentUser) {
        let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");
        if (db[currentUser]) {
            db[currentUser].data = gameState;
            localStorage.setItem("gugel_users", JSON.stringify(db));
        }
    }
}

function ejecutarAccionCuenta() {
    const userIn = prompt("Introduce tu nombre de usuario para Registrarte o Iniciar Sesión:\n(Cancela para salir)");
    if (userIn === null) return;
    
    const userClean = userIn.trim().toLowerCase();
    if (!userClean) {
        alert("El usuario no puede estar vacío.");
        return;
    }

    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");

    if (db[userClean]) {
        // --- LOGIN ---
        const passIn = prompt(`Usuario "${userClean}" detectado. Introduce tu contraseña:`);
        if (passIn === db[userClean].pass) {
            currentUser = userClean;
            gameState = db[userClean].data;
            alert(`Módulo de perfil cargado. Bienvenido de nuevo, ${userClean}.`);
            
            // Actualizar etiqueta del botón de cuenta para reflejar la sesión activa
            const btnAcc = document.getElementById("btn-gestion-cuenta");
            if (btnAcc) btnAcc.innerText = `👤 ${userClean.toUpperCase()}`;
        } else {
            alert("Contraseña incorrecta. Acceso denegado.");
            return;
        }
    } else {
        // --- REGISTRO ---
        const passIn = prompt(`Creando usuario nuevo "${userClean}". Define tu clave de seguridad:`);
        if (!passIn) {
            alert("No se puede registrar una cuenta sin contraseña de seguridad.");
            return;
        }
        
        if (gameState.cycles > 0 || gameState.history.length > 0) {
            if (confirm("¿Deseas migrar y salvar tus datos locales actuales en esta nueva cuenta?")) {
                db[userClean] = { pass: passIn, data: gameState };
            } else {
                db[userClean] = { pass: passIn, data: { cycles: 0, charsSent: 0, history: [], modoActualJuego: 'campaña', campanaIndex: 0, campanaCompletada: false, currentPregunta: "", modoSeleccionadoSiguiente: "" } };
            }
        } else {
            db[userClean] = { pass: passIn, data: { cycles: 0, charsSent: 0, history: [], modoActualJuego: 'campaña', campanaIndex: 0, campanaCompletada: false, currentPregunta: "", modoSeleccionadoSiguiente: "" } };
        }
        
        localStorage.setItem("gugel_users", JSON.stringify(db));
        currentUser = userClean;
        alert(`Cuenta corporativa "${userClean}" registrada e iniciada.`);
        
        const btnAcc = document.getElementById("btn-gestion-cuenta");
        if (btnAcc) btnAcc.innerText = `👤 ${userClean.toUpperCase()}`;
    }
    
    // Limpieza de pantalla e inicio de flujo limpio para la cuenta cargada
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = "";
    
    renderAllData();
    nextRound();
}

// ==========================================
// MANIPULACIÓN DEL DOM E INICIALIZACIÓN
// ==========================================
window.onload = function() {
    console.log("✅ Inicializando el núcleo del simulador GUGEL...");

    // Enlazar evento del botón de gestión de cuenta
    const btnCuentas = document.getElementById("btn-gestion-cuenta");
    if (btnCuentas) {
        btnCuentas.onclick = ejecutarAccionCuenta;
    }

    // Vincular el formulario de envío de transmisiones
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.onsubmit = (e) => {
            e.preventDefault();
            const input = document.getElementById('user-input');
            if (!input) return;

            const userText = input.value.trim().toLowerCase();
            if (!userText) return;

            // --- FILTRO ANTI-REPETICIÓN ---
            const esMuySimilar = gameState.history.some(h => {
                const past = h.respuesta.replace(/\s+$/g, '');
                const current = userText.replace(/\s+$/g, '');
                return current.includes(past) || past.includes(current);
            });

            if (esMuySimilar) {
                alert("Ya has dicho algo muy parecido, intenta ser más original.");
                return;
            }

            // Actualizar métricas globales
            gameState.cycles++;
            gameState.charsSent += userText.length;

            appendMessage('ai', userText);
            
            let reaccion = "vale me cuadra tiene logica";
            
            setTimeout(() => {
                appendMessage('gugel', reaccion);
                
                // Guardar en la estructura de registros
                gameState.history.push({ 
                    pregunta: gameState.currentPregunta, 
                    respuesta: userText, 
                    reaccion: reaccion,
                    fav: false
                });
                
                renderAllData();
                guardarProgresoCuenta();
                
                // Modificar la interfaz para pausar el hilo de ejecución hasta pulsar Continuar
                const transBtn = document.getElementById('transmit-btn');
                const contBtn = document.getElementById('continue-btn');
                
                if (input) input.disabled = true;
                if (transBtn) transBtn.style.display = "none";
                if (contBtn) {
                    contBtn.style.display = "inline-block";
                    contBtn.innerText = "CONTINUAR";
                    gameState.modoSeleccionadoSiguiente = gameState.modoActualJuego;
                }
            }, 600);
        };
    }

    // Inicializar primera ronda de juego automáticamente al arrancar
    renderAllData();
    nextRound();
};
