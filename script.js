// ==========================================
// ESTADO GLOBAL DEL SISTEMA (GUGEL)
// ==========================================
let gameState = {
    cycles: 0,
    charsSent: 0,
    history: [],
    modoActualJuego: 'campaña', 
    campanaIndex: 0,
    campanaCompletada: false,
    currentPregunta: "",
    modoSeleccionadoSiguiente: "",
    ultimoSujetoInfinito: ""
};

let currentUser = null;

// Banco de datos cerrado del Modo Campaña (Las 10 misiones fijas canónicas)
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

// Banco de datos del Modo Infinito
const PLANTILLAS_PREGUNTAS = [
    "¿por qué [s] [p]?",
    "¿es normal que [s] [p]?",
    "¿cómo explicas que [s] [p]?",
    "¿qué sucede cuando [s] [p]?",
    "¿me dices por qué [s] [p]?"
];

const INFINITO_SUJETOS = ["mi gato", "el router", "la conexión", "el vecino", "la plastilina", "el teclado", "la batería", "el wifi", "el cargador"];
const INFINITO_PREDICADOS = ["está ardiendo", "hace un ruido raro", "se ha vuelto loco", "no enciende", "parpadea todo el rato", "se queda pillado", "está muy lento"];

// Banco de Reacciones de Gugel (Sistema de anti-repetición de frases cortas en minúsculas)
const REACCIONES_GUGEL = [
    "entiendo mas o menos",
    "vale tiene sentido",
    "esto es raro pero ok",
    "entiendo mas o menos pero vale",
    "vale me cuadra tiene logica",
    "ok dudo pero lo compro",
    "no entiendo nada pero suena cientifico"
];

// Banco de Logros del Sistema
const LOGROS_SISTEMA = [
    { id: "primer_paso", titulo: "Primer Enlace", desc: "Envía tu primera respuesta de simulación de IA.", cond: (state) => state.cycles >= 1 },
    { id: "veterano", titulo: "Procesador Veterano", desc: "Procesa un total de 10 consultas en el sistema.", cond: (state) => state.cycles >= 10 },
    { id: "escritor", titulo: "Generador de Datos", desc: "Transmite más de 100 caracteres al núcleo de GUGEL.", cond: (state) => state.charsSent >= 100 },
    { id: "campana_top", titulo: "Misión Cumplida", desc: "Completa con éxito las 10 misiones del modo campaña.", cond: (state) => state.campanaCompletada },
    { id: "logro_corto", titulo: "Procesamiento Perezoso", desc: "Envía una respuesta extremadamente corta (menos de 5 caracteres).", cond: (state) => state.history.some(h => h.respuesta.length > 0 && h.respuesta.length < 5) }
];

// Mapeo temático para el sistema de recomendación "Ya que has respondido esto..."
const RECOMENDACIONES_MAP = {
    "gato": "¿por qué el teclado de mi gato no enciende?",
    "router": "¿me dices por qué el wifi parpadea todo el rato?",
    "conexión": "¿es normal que el vecino se queda pillado?",
    "vecino": "¿cómo explicas que la conexión se ha vuelto loco?",
    "plastilina": "¿por qué la batería está ardiendo?",
    "teclado": "¿qué sucede cuando el router hace un ruido raro?",
    "batería": "¿me dices por qué el cargador no enciende?",
    "wifi": "¿por qué el router está muy lento?",
    "cargador": "¿es normal que la batería parpadea todo el rato?"
};

// ==========================================
// NÚCLEO DE LÓGICA DEL JUEGO
// ==========================================
function generarPregunta() {
    if (gameState.modoActualJuego === "campaña") {
        if (gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campanaCompletada = true;
            return null;
        }
        const q = PREGUNTAS_CAMPANA[gameState.campanaIndex++];
        // Almacenar palabra clave para la recomendación
        if (q.includes("gato")) gameState.ultimoSujetoInfinito = "gato";
        else if (q.includes("router")) gameState.ultimoSujetoInfinito = "router";
        else if (q.includes("conexion") || q.includes("conexión")) gameState.ultimoSujetoInfinito = "conexión";
        else if (q.includes("vecino")) gameState.ultimoSujetoInfinito = "vecino";
        else if (q.includes("plastilina")) gameState.ultimoSujetoInfinito = "plastilina";
        else if (q.includes("teclado")) gameState.ultimoSujetoInfinito = "teclado";
        else if (q.includes("batería")) gameState.ultimoSujetoInfinito = "batería";
        else if (q.includes("wifi")) gameState.ultimoSujetoInfinito = "wifi";
        else if (q.includes("cargador")) gameState.ultimoSujetoInfinito = "cargador";
        return q;
    } else {
        const s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        const p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        gameState.ultimoSujetoInfinito = s.replace("mi ", "").replace("la ", "").replace("el ", "");
        return plantilla.replace("[s]", s).replace("[p]", p);
    }
}

function generarReaccionGugel() {
    // Sistema anti-repetición de respuestas de Gugel
    let reaccionesDisponibles = REACCIONES_GUGEL.filter(r => {
        if (gameState.history.length === 0) return true;
        const ultimasReacciones = gameState.history.slice(-3).map(h => h.reaccion);
        return !ultimasReacciones.includes(r);
    });
    
    if (reaccionesDisponibles.length === 0) reaccionesDisponibles = REACCIONES_GUGEL;
    return reaccionesDisponibles[Math.floor(Math.random() * reaccionesDisponibles.length)];
}

function nextRound() {
    const chatBox = document.getElementById('chat-messages');
    const input = document.getElementById('user-input');
    const transBtn = document.getElementById('transmit-btn');
    const contBtn = document.getElementById('continue-btn');
    const recBox = document.getElementById('streaming-recommendation');

    if (!chatBox) return;

    if (input) { input.disabled = false; input.value = ""; }
    if (transBtn) transBtn.style.display = "inline-block";
    if (contBtn) contBtn.style.display = "none";
    if (recBox) recBox.style.display = "none";

    const pregunta = generarPregunta();

    if (pregunta === null && gameState.modoActualJuego === "campaña") {
        appendMessage('gugel', "⚠️ campaña completada. has procesado los 10 modulos de datos obligatorios.");
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
// INTERFAZ, TEMAS Y NAVEGACIÓN
// ==========================================
function switchView(viewId) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    if (viewId === 'view-core') {
        const panelCore = document.getElementById('view-core');
        if (panelCore) panelCore.classList.add('active');
        return;
    }

    const targetPanel = document.getElementById(viewId);
    if (targetPanel) targetPanel.classList.add('active');

    let btnId = "";
    if (viewId === 'view-perfil') btnId = 'btn-view-perfil';
    if (viewId === 'view-logros') btnId = 'btn-view-logros';
    if (viewId === 'view-historial') btnId = 'btn-view-historial';

    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add('active');

    renderAllData();
}

function cambiarModoEstrategia(modo) {
    if (gameState.modoActualJuego === modo) {
        switchView('view-core');
        return;
    }

    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    if (modo === 'campaña') document.getElementById('btn-mode-campaña').classList.add('active');
    if (modo === 'infinito') document.getElementById('btn-mode-infinito').classList.add('active');

    gameState.modoSeleccionadoSiguiente = modo;

    const titleText = document.getElementById('panel-title-text');
    if (titleText) {
        titleText.innerText = `Interfaz Core - ${modo.charAt(0).toUpperCase() + modo.slice(1)}`;
    }

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

function cambiarTemaVisual(tema) {
    document.body.className = "";
    document.body.classList.add(tema);
}

// ==========================================
// RENDERIZADO COMPLETO DE PANELES DE DATOS
// ==========================================
function renderAllData() {
    const profCycles = document.getElementById('prof-cycles');
    const profChars = document.getElementById('prof-chars');
    const profSatisfaction = document.getElementById('prof-satisfaction');
    const profOpinion = document.getElementById('prof-opinion');
    const profLevel = document.getElementById('prof-level');

    if (profCycles) profCycles.innerText = gameState.cycles;
    if (profChars) profChars.innerText = gameState.charsSent;

    // Cálculo de Nivel Dinámico
    let nivelCalculado = Math.floor(gameState.cycles / 5) + 1;
    if (profLevel) profLevel.innerText = nivelCalculado;

    // Cálculo dinámico de opinión basado en la longitud media de las respuestas
    if (profSatisfaction && profOpinion) {
        if (gameState.cycles === 0) {
            profSatisfaction.innerText = "50%";
            profOpinion.innerText = "(analizando conexiones...)";
        } else {
            let promedioTextos = gameState.charsSent / gameState.cycles;
            if (promedioTextos < 15) {
                profSatisfaction.innerText = "25%";
                profOpinion.innerText = "escueto. ia con poca sustancia logica.";
            } else if (promedioTextos >= 15 && promedioTextos < 40) {
                profSatisfaction.innerText = "65%";
                profOpinion.innerText = "equilibrado. responde con coherencia basica.";
            } else {
                profSatisfaction.innerText = "90%";
                profOpinion.innerText = "excelente. respuestas descriptivas y alta precision.";
            }
        }
    }

    // Inyección de Logros
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

    // Inyección de Historial
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

    // Ocultación del botón de campaña en el menú lateral si se completó
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
    navigator.clipboard.writeText(txt || "Búfer vacío").then(() => alert("Registro copiado al portapapeles."));
}

function inyectarPreguntaRecomendada(textoPregunta) {
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) chatBox.innerHTML = "";
    cambiarModoEstrategia('infinito');
    
    const recBox = document.getElementById('streaming-recommendation');
    if (recBox) recBox.style.display = "none";
    
    gameState.currentPregunta = textoPregunta;
    appendMessage('gugel', textoPregunta);
}

// ==========================================
// PERSISTENCIA Y CUENTAS DE USUARIO
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
        // LOGIN
        const passIn = prompt(`Usuario "${userClean}" detectado. Introduce tu contraseña:`);
        if (passIn === db[userClean].pass) {
            currentUser = userClean;
            gameState = db[userClean].data;
            alert(`Módulo de perfil cargado. Bienvenido, ${userClean}.`);
            
            const btnAcc = document.getElementById("btn-gestion-cuenta");
            if (btnAcc) btnAcc.innerText = `👤 ${userClean.toUpperCase()}`;
        } else {
            alert("Contraseña incorrecta.");
            return;
        }
    } else {
        // REGISTRO
        const passIn = prompt(`Creando usuario nuevo "${userClean}". Define tu clave de seguridad:`);
        if (!passIn) {
            alert("Contraseña requerida.");
            return;
        }
        
        if (gameState.cycles > 0 || gameState.history.length > 0) {
            if (confirm("¿Deseas migrar y guardar tus datos locales actuales en esta nueva cuenta?")) {
                db[userClean] = { pass: passIn, data: gameState };
            } else {
                db[userClean] = { pass: passIn, data: { cycles: 0, charsSent: 0, history: [], modoActualJuego: 'campaña', campanaIndex: 0, campanaCompletada: false, currentPregunta: "", modoSeleccionadoSiguiente: "", ultimoSujetoInfinito: "" } };
            }
        } else {
            db[userClean] = { pass: passIn, data: { cycles: 0, charsSent: 0, history: [], modoActualJuego: 'campaña', campanaIndex: 0, campanaCompletada: false, currentPregunta: "", modoSeleccionadoSiguiente: "", ultimoSujetoInfinito: "" } };
        }
        
        localStorage.setItem("gugel_users", JSON.stringify(db));
        currentUser = userClean;
        alert(`Cuenta "${userClean}" registrada.`);
        
        const btnAcc = document.getElementById("btn-gestion-cuenta");
        if (btnAcc) btnAcc.innerText = `👤 ${userClean.toUpperCase()}`;
    }
    
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

    const btnCuentas = document.getElementById("btn-gestion-cuenta");
    if (btnCuentas) btnCuentas.onclick = ejecutarAccionCuenta;

    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.onsubmit = (e) => {
            e.preventDefault();
            const input = document.getElementById('user-input');
            if (!input) return;

            const userText = input.value.trim();
            if (!userText) return;

            // --- FILTRO ANTI-REPETICIÓN DEL USUARIO ---
            const esMuySimilar = gameState.history.some(h => {
                const past = h.respuesta.trim().toLowerCase().replace(/\s+$/g, '');
                const current = userText.trim().toLowerCase().replace(/\s+$/g, '');
                return current.includes(past) || past.includes(current);
            });

            if (esMuySimilar) {
                alert("Ya has dicho algo muy parecido, intenta ser más original.");
                return;
            }

            // Actualización de métricas
            gameState.cycles++;
            gameState.charsSent += userText.length;

            appendMessage('ai', userText);

            // Simulación visual de procesamiento
            const statusInd = document.getElementById('status-indicator');
            if (statusInd) {
                statusInd.innerText = "● escribiendo...";
                statusInd.className = "status-typing";
            }

            let reaccion = generarReaccionGugel();
            
            setTimeout(() => {
                if (statusInd) {
                    statusInd.innerText = "● en línea";
                    statusInd.className = "status-online";
                }

                appendMessage('gugel', reaccion);
                
                gameState.history.push({ 
                    pregunta: gameState.currentPregunta, 
                    respuesta: userText, 
                    reaccion: reaccion,
                    fav: false
                });
                
                renderAllData();
                guardarProgresoCuenta();
                
                // Bloqueo temporal del input e inyección del paso intermedio
                const transBtn = document.getElementById('transmit-btn');
                const contBtn = document.getElementById('continue-btn');
                
                if (input) input.disabled = true;
                if (transBtn) transBtn.style.display = "none";
                if (contBtn) {
                    contBtn.style.display = "inline-block";
                    contBtn.innerText = "CONTINUAR";
                    gameState.modoSeleccionadoSiguiente = gameState.modoActualJuego;
                }

                // --- SISTEMA "YA QUE HAS RESPONDIDO ESTO..." (Estilo Streaming) ---
                const recBox = document.getElementById('streaming-recommendation');
                if (recBox && gameState.ultimoSujetoInfinito) {
                    const sugerencia = RECOMENDACIONES_MAP[gameState.ultimoSujetoInfinito] || "¿por qué el router se ha vuelto loco?";
                    recBox.innerHTML = `📺 ya que has respondido esto, tal vez quieras procesar: <span style="text-decoration: underline; cursor: pointer;" onclick="inyectarPreguntaRecomendada('${sugerencia}')">${sugerencia}</span>`;
                    recBox.style.display = "block";
                }
            }, 600);
        };
    }

    renderAllData();
    nextRound();
};
