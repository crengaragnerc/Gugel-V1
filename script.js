// ==========================================
// 1. CONSTANTES, PLANTILLAS Y DICCIONARIO
// ==========================================
const PLANTILLAS_PREGUNTAS = ["[s] [p]", "porque [s] [p]", "como hacer que [s] [p]", "que pasa si [s] [p]", "ayuda mi [s] [p]"];
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];

const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido", "ok eso responde lo que queria"];
const FRASES_RECHAZO = ["vaya respuesta mas corta y vaga no aclaras nada", "ya esta? solo eso me vas a decir?", "explicate mejor q no me entero de nada"];
const FRASES_CRITICAS = ["te estas riendo de mi? eso son letras al azar", "vaya troleo de ia para responderme esta basura", "deja de repetirme lo mismo pesado", "vaya respuesta absurda, eso no tiene nada que ver"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "jaja", "ño", "si", "no", "uwu", "xd"];

const INFINITO_SUJETOS = ["gato", "perro", "pc", "teclado", "router", "internet", "raton", "portatil", "vecino", "coche", "llave", "cafetera", "ventilador", "pantalla", "cable"];
const INFINITO_PREDICADOS = ["mira raro", "quema", "sin luz", "ruido", "calambre", "parpadea", "sin red", "borra", "lento", "pillado", "metalico", "no responde"];

const OPINIONES_BAJA = ["(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)"];
const OPINIONES_MEDIA_BAJA = ["(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)"];
const OPINIONES_MEDIA_ALT_A = ["(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores)"];

// MATRIZ DE PALABRAS CLAVE PARA EL PARCHE ANTI-SPAM / COHERENCIA
const MAPA_COHERENCIA = {
    "rubik": ["cubo", "algoritmo", "capa", "giro", "color", "cara", "esquina", "arista", "f2l", "oll", "pll", "cruzar", "girar"],
    "verde": ["medico", "doctor", "comida", "digestión", "bilis", "estomago", "color", "cuerpo", "sintoma"],
    "agosto": ["fiesta", "festivo", "calendario", "celebracion", "españa", "asuncion", "virgen", "vacaciones"],
    "dormir": ["sueño", "cerebro", "cansancio", "alucinaciones", "cansado", "insomnio", "salud", "descanso", "morir"],
    "liquida": ["agua", "estado", "molecula", "h2o", "temperatura", "fisica", "quimica", "fusion"],
    "barranco": ["tierra", "muro", "allanar", "maquinaria", "terreno", "pala", "obra", "pendiente", "desnivel"],
    "tomate": ["fruta", "verdura", "botanica", "planta", "semilla", "ensalada", "origen"],
    "cancion": ["ritmo", "nombre", "titulo", "letra", "artista", "musica", "banda", "spotify", "melodia"],
    "bloqueado": ["perfil", "whatsapp", "chat", "contacto", "red", "mensaje", "visto", "bloqueo", "tlf"],
    "web": ["servidor", "dns", "conexion", "wifi", "router", "enlace", "caido", "host", "navegador", "url"]
};

// ==========================================
// 2. BASE DE DATOS DE 40 LOGROS (30 Positivos, 10 Negativos)
// ==========================================
const BASE_LOGROS = [
    // 30 POSITIVOS
    { id: "L01", tipo: "positivo", nombre: "Primeros Pasos", desc: "Completaste la primera consulta con éxito." },
    { id: "L02", tipo: "positivo", nombre: "IA Comprensiva", desc: "Alcanzaste el 60% de satisfacción del usuario." },
    { id: "L03", tipo: "positivo", nombre: "Empatía Algorítmica", desc: "Alcanzaste el 80% de satisfacción." },
    { id: "L04", tipo: "positivo", nombre: "Deidad Binaria", desc: "Llegaste al 100% de satisfacción máxima." },
    { id: "L05", tipo: "positivo", nombre: "Operador de Élite", desc: "Completaste las 10 preguntas de la Campaña." },
    { id: "L06", tipo: "positivo", nombre: "Guardado Seguro", desc: "Añadiste tu primera consulta a Favoritos." },
    { id: "L07", tipo: "positivo", nombre: "Coleccionista de Estrellas", desc: "Guardaste 3 elementos en Favoritos." },
    { id: "L08", tipo: "positivo", nombre: "Sabor Botánico", desc: "Respondiste coherentemente sobre el enigma del tomate." },
    { id: "L09", tipo: "positivo", nombre: "Speedcuber Teórico", desc: "Le diste una respuesta digna sobre el cubo de Rubik." },
    { id: "L10", tipo: "positivo", nombre: "Ciberseguridad Básica", desc: "Estableciste credenciales con contraseña." },
    { id: "L11", tipo: "positivo", nombre: "Modo Hacker Activo", desc: "Navegaste usando el entorno verde neón." },
    { id: "L12", tipo: "positivo", nombre: "Purista Claro", desc: "Activaste el modo Claro sin quemarte los ojos." },
    { id: "L13", tipo: "positivo", nombre: "Caballero Oscuro", desc: "Configuraste la interfaz en modo Oscuro." },
    { id: "L14", tipo: "positivo", nombre: "Consultor Infatigable", desc: "Entraste al Modo Infinito." },
    { id: "L15", tipo: "positivo", nombre: "Respuesta Detallada", desc: "Escribiste una respuesta de más de 60 caracteres." },
    { id: "L16", tipo: "positivo", nombre: "Lógica Impecable", desc: "Obtuviste 3 respuestas aceptadas tipo 'OK' seguidas." },
    { id: "L17", tipo: "positivo", nombre: "Analista Clínico", desc: "Revisaste el Estado Analítico del sistema." },
    { id: "L18", tipo: "positivo", nombre: "Archivero", desc: "Inspeccionaste el Búfer de logs guardados." },
    { id: "L19", tipo: "positivo", nombre: "Copia de Seguridad", desc: "Copiaste los logs al portapapeles." },
    { id: "L20", tipo: "positivo", nombre: "Exportador de Datos", desc: "Descargaste el archivo físico de sesión." },
    { id: "L21", tipo: "positivo", nombre: "Identidad Protegida", desc: "Cambiaste el nombre de Invitado a un alias único." },
    { id: "L22", tipo: "positivo", nombre: "Insomnio Explicado", desc: "Aclaraste qué pasa si no se duerme en toda la noche." },
    { id: "L23", tipo: "positivo", nombre: "Ingeniería de Caminos", desc: "Diste una solución para el barranco." },
    { id: "L24", tipo: "positivo", nombre: "Musicólogo digital", desc: "Ayudaste a descifrar el 'tan tan tan tann'." },
    { id: "L25", tipo: "positivo", nombre: "Desbloqueador de Redes", desc: "Aclaraste las dudas sobre bloqueos." },
    { id: "L26", tipo: "positivo", nombre: "Soporte de Red", desc: "Solucionaste el fallo de carga de la web." },
    { id: "L27", tipo: "positivo", nombre: "IA de Confianza", desc: "Gugel te tiene guardado en marcadores mentales." },
    { id: "L28", tipo: "positivo", nombre: "Vocabulario Rico", desc: "Evitaste usar palabras repetitivas en tus envíos." },
    { id: "L29", tipo: "positivo", nombre: "Persistencia", desc: "Superaste 12 rondas totales combinadas." },
    { id: "L30", tipo: "positivo", nombre: "Control Absoluto", desc: "Mantuviste la satisfacción por encima del 50% durante 8 turnos." },
    
    // 10 NEGATIVOS
    { id: "LN1", tipo: "negativo", nombre: "Aporrea-Teclados", desc: "Enviaste una secuencia incoherente sospechosa de spam (Spam o teclado loco)." },
    { id: "LN2", tipo: "negativo", nombre: "IA Evasiva", desc: "Respondiste usando términos perezosos o monosílabos evasivos." },
    { id: "LN3", tipo: "negativo", nombre: "Incoherencia Total", desc: "Tu respuesta no tenía absoluta relación con los conceptos buscados." },
    { id: "LN4", tipo: "negativo", nombre: "Hundimiento del Sistema", desc: "La satisfacción del usuario cayó por debajo del 20%." },
    { id: "LN5", tipo: "negativo", nombre: "Cero Absoluto", desc: "Llegaste al 0% de satisfacción total." },
    { id: "LN6", tipo: "negativo", nombre: "Mensaje Efímero", desc: "Escribiste una respuesta ridículamente corta (menos de 4 letras)." },
    { id: "LN7", tipo: "negativo", nombre: "Bucle Repetitivo", desc: "Intentaste enviar exactamente el mismo texto que el turno anterior." },
    { id: "LN8", tipo: "negativo", nombre: "Usuario Furioso", desc: "Recibiste una crítica severa de Gugel por troleo." },
    { id: "LN9", tipo: "negativo", nombre: "Destrucción de Memoria", desc: "Usaste la opción de borrar todo el progreso." },
    { id: "LN10", tipo: "negativo", nombre: "Operador Sospechoso", desc: "Dejaste la contraseña vacía al registrarte." }
];

// ==========================================
// 3. ESTADO GLOBAL
// ==========================================
let gameState = { 
    modo: "campaña",
    campanaIndex: 0, 
    satisfaction: 50,
    history: [], 
    favorites: [],
    logrosDesbloqueados: [],
    recentReactions: [],
    lastUserText: "",
    usuario: "Invitado",
    password: "",
    campañaCompletada: false,
    currentPregunta: ""
};

if (localStorage.getItem('gugel-save-state-v2')) {
    gameState = JSON.parse(localStorage.getItem('gugel-save-state-v2'));
}

function guardarEstadoEnStorage() {
    localStorage.setItem('gugel-save-state-v2', JSON.stringify(gameState));
}

// ==========================================
// 4. PARCHE Y MOTOR DE COHERENCIA INTELIGENTE
// ==========================================
function evaluarCoherenciaYSpam(pregunta, respuesta) {
    let resp = respuesta.toLowerCase().trim();
    let preg = pregunta.toLowerCase();

    // 1. Detección de aporreamiento de teclado (letras al azar sin vocales o repetidas)
    if (/([abcdefghijklmnopqrstuvwxyz])\1{3,}/.test(resp) || /^[bcdfghjklmnñpqrstvwxyz\s]{5,}$/.test(resp.replace(/[^a-z]/g, ''))) {
        desbloquearLogro("LN1"); // Logro Negativo: Aporrea-Teclados
        return "CRITICA";
    }
    
    // 2. Detección de patrones repetitivos tipo teclado
    if (resp.includes("fighfd") || resp.includes("fhbifbh") || resp.includes("qwerty") || resp.includes("asdf")) {
        desbloquearLogro("LN1");
        return "CRITICA";
    }

    // 3. Comprobación de evasivas cortas o muletillas
    if (EVASIVAS.includes(resp) || resp.length < 4) {
        if (resp.length < 4) desbloquearLogro("LN6"); // Logro Negativo: Corto
        desbloquearLogro("LN2"); // Logro Negativo: Evasivo
        return "RECHAZO";
    }

    // 4. Validación de palabras clave del contexto
    let claveEncontrada = false;
    let tieneDiccionario = false;

    for (let palabraClave in MAPA_COHERENCIA) {
        if (preg.includes(palabraClave)) {
            tieneDiccionario = true;
            let sinonimos = MAPA_COHERENCIA[palabraClave];
            // Verificar si el usuario puso la palabra clave o algún sinónimo
            if (resp.includes(palabraClave) || sinonimos.some(s => resp.includes(s))) {
                claveEncontrada = true;
            }
        }
    }

    // Si la pregunta está mapeada y el usuario respondió algo totalmente desconectado
    if (tieneDiccionario && !claveEncontrada) {
        desbloquearLogro("LN3"); // Logro Negativo: Incoherencia Total
        return "RECHAZO";
    }

    // Logros temáticos si la respuesta es coherente
    if (preg.includes("rubik") && claveEncontrada) desbloquearLogro("L09");
    if (preg.includes("tomate") && claveEncontrada) desbloquearLogro("L08");
    if (preg.includes("dormir") && claveEncontrada) desbloquearLogro("L22");
    if (preg.includes("barranco") && claveEncontrada) desbloquearLogro("L23");
    if (preg.includes("cancion") && claveEncontrada) desbloquearLogro("L24");
    if (preg.includes("bloqueado") && claveEncontrada) desbloquearLogro("L25");
    if (preg.includes("web") && claveEncontrada) desbloquearLogro("L26");

    return "OK";
}

// ==========================================
// 5. SISTEMA DE LOGROS
// ==========================================
function desbloquearLogro(id) {
    if (!gameState.logrosDesbloqueados.includes(id)) {
        gameState.logrosDesbloqueados.push(id);
        const logro = BASE_LOGROS.find(l => l.id === id);
        if (logro) {
            alert(`[NUEVO LOGRO DETECTADO] ${logro.tipo === 'negativo' ? '⚠️' : '🏆'} ${logro.nombre.toUpperCase()}: ${logro.desc}`);
        }
        guardarEstadoEnStorage();
    }
}

function verificarLogrosDeEstado() {
    if (gameState.history.length === 1) desbloquearLogro("L01");
    if (gameState.history.length >= 12) desbloquearLogro("L29");
    if (gameState.satisfaction >= 60) desbloquearLogro("L02");
    if (gameState.satisfaction >= 80) desbloquearLogro("L03");
    if (gameState.satisfaction >= 100) desbloquearLogro("L04");
    if (gameState.satisfaction <= 20) desbloquearLogro("LN4");
    if (gameState.satisfaction === 0) desbloquearLogro("LN5");
}

// ==========================================
// 6. CONTROLADORES DE JUEGO Y CHAT
// ==========================================
function obtenerElementoNoRepetido(lista, historial) {
    let opciones = lista.filter(item => !historial.includes(item));
    if (opciones.length === 0) opciones = lista;
    let item = opciones[Math.floor(Math.random() * opciones.length)];
    historial.push(item);
    if (historial.length > 5) historial.shift();
    return item;
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (box) {
        const msg = document.createElement('div');
        msg.className = `message ${sender}`;
        msg.innerHTML = `<strong>${sender === 'tú' ? 'TÚ' : 'GUGEL'}:</strong> ${text}`;
        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;
    }
}

function renderAllData() {
    // Actualización de textos e identificadores de cuenta
    document.getElementById('sidebar-user-display').innerText = gameState.usuario;
    document.getElementById('prof-usuario').innerText = gameState.usuario;
    document.getElementById('prof-satisfaction').innerText = `${gameState.satisfaction}%`;
    document.getElementById('prof-opinion').innerText = obtenerElementoNoRepetido(
        gameState.satisfaction < 35 ? OPINIONES_BAJA : 
        gameState.satisfaction < 55 ? OPINIONES_MEDIA_BAJA : 
        gameState.satisfaction < 80 ? OPINIONES_MEDIA_ALT_A : OPINIONES_ALTA, 
        gameState.recentReactions
    );

    // Visibilidad de modos
    const btnCamp = document.getElementById('btn-mode-campaña');
    const btnInf = document.getElementById('btn-mode-infinito');
    if (gameState.campañaCompletada) {
        if (btnCamp) btnCamp.style.display = 'none';
        if (btnInf) btnInf.style.display = 'block';
    } else {
        if (btnCamp) btnCamp.style.display = 'block';
        if (btnInf) btnInf.style.display = 'none';
    }

    // Renderizado completo de la lista de Logros
    document.getElementById('logros-count').innerText = gameState.logrosDesbloqueados.length;
    const logrosContainer = document.getElementById('logros-container');
    if (logrosContainer) {
        logrosContainer.innerHTML = BASE_LOGROS.map(logro => {
            const desb = gameState.logrosDesbloqueados.includes(logro.id);
            return `
                <div class="item-logro ${desb ? logro.tipo : 'bloqueado'}">
                    <strong>${desb ? (logro.tipo === 'negativo' ? '⚠️' : '🏆') : '🔒'} ${logro.nombre}</strong> 
                    (${logro.tipo === 'negativo' ? 'Logro Negativo' : 'Sistema'})<br>
                    <span style="font-size:0.8rem; color:var(--text-muted);">${desb ? logro.desc : 'Parámetro oculto cifrado.'}</span>
                </div>
            `;
        }).join('');
    }

    // Historial y Favoritos
    const histContainer = document.getElementById('history-list-container');
    if (histContainer) {
        histContainer.innerHTML = gameState.history.length === 0 ? "<p>Búfer vacío.</p>" : gameState.history.map(h => `
            <div style="margin-bottom:10px; border-bottom:1px dashed var(--bubble-border); padding-bottom:5px;">
                <strong>CONSULTA:</strong> ${h.pregunta}<br>
                <strong>RESPUESTA:</strong> ${h.respuesta}<br>
                <strong>REACCIÓN:</strong> ${h.reaccion}
            </div>
        `).join('');
    }

    const favContainer = document.getElementById('favorites-list-container');
    if (favContainer) {
        favContainer.innerHTML = gameState.favorites.length === 0 ? "<p style='color:var(--text-muted);'>No hay favoritos seleccionados.</p>" : gameState.favorites.map(f => `
            <div style="margin-bottom:10px; border-left:2px solid #ffd700; padding-left:10px; background: rgba(255,215,0,0.05); padding:8px;">
                <strong>⭐ [GUARDADO] Q:</strong> ${f.pregunta}<br>
                <strong>A:</strong> ${f.respuesta}
            </div>
        `).join('');
    }
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const userText = input.value.trim();
    if (!userText || input.disabled) return;
    
    appendMessage('tú', userText);
    input.style.display = "none";
    document.getElementById('transmit-btn').style.display = "none";

    // Comprobación anti-duplicados / bucles
    let tipo = "OK";
    if (userText.toLowerCase() === gameState.lastUserText.toLowerCase()) {
        tipo = "CRITICA";
        desbloquearLogro("LN7"); // Logro Negativo: Bucle Repetitivo
    } else {
        tipo = evaluarCoherenciaYSpam(gameState.currentPregunta, userText);
    }

    gameState.lastUserText = userText;

    let reaccion = tipo === "CRITICA" ? obtenerElementoNoRepetido(FRASES_CRITICAS, gameState.recentReactions) :
                   tipo === "RECHAZO" ? obtenerElementoNoRepetido(FRASES_RECHAZO, gameState.recentReactions) :
                   obtenerElementoNoRepetido(FRASES_OK, gameState.recentReactions);

    if (tipo === "CRITICA") {
        gameState.satisfaction -= 20;
        desbloquearLogro("LN8");
    } else if (tipo === "RECHAZO") {
        gameState.satisfaction -= 15;
    } else {
        gameState.satisfaction += 10;
        if (userText.length > 60) desbloquearLogro("L15");
    }
    
    gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction));

    setTimeout(() => {
        appendMessage('gugel', reaccion);
        
        gameState.history.push({ 
            pregunta: gameState.currentPregunta, 
            respuesta: userText, 
            reaccion: reaccion 
        });

        if (gameState.modo === "campaña" && gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campañaCompletada = true;
            gameState.modo = "infinito";
            desbloquearLogro("L05");
            desbloquearLogro("L14");
            alert("¡Felicidades! Campaña completada con éxito. Conmutando a consultas infinitas.");
        }

        verificarLogrosDeEstado();
        renderAllData();
        
        document.getElementById('chat-actions-bar').style.display = "block";
        document.getElementById('continue-btn').style.display = "block";
    }, 500);
};

function marcarActualComoFavorito() {
    if (gameState.history.length === 0) return;
    let ultimoLog = gameState.history[gameState.history.length - 1];
    
    // Evitar duplicados en favoritos
    if (!gameState.favorites.some(f => f.pregunta === ultimoLog.pregunta && f.respuesta === ultimoLog.respuesta)) {
        gameState.favorites.push({ pregunta: ultimoLog.pregunta, respuesta: ultimoLog.respuesta });
        desbloquearLogro("L06");
        if (gameState.favorites.length >= 3) desbloquearLogro("L07");
        alert("¡Consulta añadida a tus marcadores favoritos!");
        renderAllData();
    }
}

function generarPreguntaInfinita() {
    let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
    let sujeto = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
    let predicado = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
    return plantilla.replace("[s]", sujeto).replace("[p]", predicado);
}

function nextRound() {
    document.getElementById('chat-messages').innerHTML = "";
    document.getElementById('continue-btn').style.display = "none";
    document.getElementById('chat-actions-bar').style.display = "none";
    
    if (gameState.campañaCompletada) gameState.modo = "infinito";

    if (gameState.modo === "campaña") {
        if (gameState.campanaIndex < PREGUNTAS_CAMPANA.length) {
            gameState.currentPregunta = PREGUNTAS_CAMPANA[gameState.campanaIndex];
            gameState.campanaIndex++;
        } else {
            gameState.campañaCompletada = true;
            gameState.modo = "infinito";
            gameState.currentPregunta = generarPreguntaInfinita();
        }
    } else {
        gameState.currentPregunta = generarPreguntaInfinita();
    }
    
    appendMessage('gugel', gameState.currentPregunta);
    
    const input = document.getElementById('user-input');
    input.value = "";
    input.style.display = "block";
    input.disabled = true;
    input.placeholder = "Estableciendo conexión interna...";
    
    const tBtn = document.getElementById('transmit-btn');
    tBtn.style.display = "block";
    tBtn.disabled = true;

    setTimeout(() => {
        input.disabled = false;
        tBtn.disabled = false;
        input.placeholder = "Introduce tu respuesta...";
        input.focus();
    }, 1500);
}

// ==========================================
// 7. NAVEGACIÓN Y TEMAS
// ==========================================
function cambiarTema(nuevoTema) {
    document.body.className = nuevoTema;
    localStorage.setItem('gugel-tema', nuevoTema);
    if (nuevoTema === "modo-hacker") desbloquearLogro("L11");
    if (nuevoTema === "modo-claro") desbloquearLogro("L12");
    if (nuevoTema === "modo-oscuro") desbloquearLogro("L13");
}

function switchView(viewId) {
    const panelObjetivo = document.getElementById(viewId);
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    if (panelObjetivo && panelObjetivo.classList.contains('active')) {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('view-chat').classList.add('active');
    } else {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        if (panelObjetivo) {
            panelObjetivo.classList.add('active');
            const btnPulsado = document.getElementById(`btn-${viewId}`);
            if (btnPulsado) btnPulsado.classList.add('active');
            if (viewId === "view-perfil") desbloquearLogro("L17");
            if (viewId === "view-historial") desbloquearLogro("L18");
        }
    }
    renderAllData();
}

function cambiarModoEstrategia(modo) {
    if (modo === "campaña" && gameState.campañaCompletada) return;
    gameState.modo = modo;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    const btnActivo = document.getElementById(`btn-mode-${modo}`);
    if (btnActivo) btnActivo.classList.add('active');
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    nextRound();
}

// ==========================================
// 8. VENTANA GESTIÓN DE CUENTA CON CONTRASEÑA
// ==========================================
function abrirModalCuenta() {
    document.getElementById('account-modal').classList.add('active');
    document.getElementById('modal-user-status').innerText = gameState.usuario;
    document.getElementById('account-username').value = gameState.usuario === "Invitado" ? "" : gameState.usuario;
    document.getElementById('account-password').value = gameState.password || "";
}

function cerrarModalCuenta() {
    document.getElementById('account-modal').classList.remove('active');
}

function guardarNombreCuenta() {
    const userIn = document.getElementById('account-username').value.trim();
    const passIn = document.getElementById('account-password').value;

    if (!userIn) {
        alert("Error: El código de operador no puede estar vacío.");
        return;
    }

    gameState.usuario = userIn;
    gameState.password = passIn;

    if (passIn === "") {
        desbloquearLogro("LN10"); // Logro Negativo: Contraseña Vacía
    } else {
        desbloquearLogro("L10"); // Logro Positivo: Ciberseguridad
    }

    if (userIn !== "Invitado") {
        desbloquearLogro("L21");
    }

    guardarEstadoEnStorage();
    renderAllData();
    cerrarModalCuenta();
    alert(`Sesión validada. Conectado como: ${gameState.usuario}`);
}

function resetearProgresoJuego() {
    if (confirm("🚨 ¿CONFIRMAS LA DESTRUCCIÓN COMPLETA DE LA MEMORIA? 🚨")) {
        localStorage.removeItem('gugel-save-state-v2');
        gameState = { 
            modo: "campaña", campanaIndex: 0, satisfaction: 50, history: [], favorites: [], logrosDesbloqueados: [], recentReactions: [], lastUserText: "", usuario: "Invitado", password: "", campañaCompletada: false, currentPregunta: ""
        };
        desbloquearLogro("LN9"); // Logro Negativo: Borrar Progreso
        guardarEstadoEnStorage();
        renderAllData();
        cerrarModalCuenta();
        nextRound();
    }
}

// ==========================================
// 9. EXPORTACIONES
// ==========================================
function exportCoreData() {
    if (gameState.history.length === 0) return alert("Búfer vacío.");
    let log = gameState.history.map((h, i) => `LOG #${i + 1}\nConsulta: ${h.pregunta}\nRespuesta: ${h.respuesta}\nReacción: ${h.reaccion}\n---`).join('\n');
    navigator.clipboard.writeText(log).then(() => {
        desbloquearLogro("L19");
        alert("Logs copiados al portapapeles.");
    });
}

function exportarHistorialCompleto() {
    if (gameState.history.length === 0) return alert("Búfer vacío.");
    let log = `=== GUGEL OPERATOR LOG ===\nUsuario: ${gameState.usuario}\n\n`;
    log += gameState.history.map((h, i) => `[${i + 1}] Q: ${h.pregunta} | A: ${h.respuesta} | R: ${h.reaccion}`).join('\n');
    const blob = new Blob([log], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_gugel_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    desbloquearLogro("L20");
}

window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('gugel-tema') || 'modo-hacker';
    document.body.className = temaGuardado;
    const s = document.getElementById('theme-select');
    if (s) s.value = temaGuardado;
    
    if (!gameState.currentPregunta) {
        if (gameState.modo === "campaña") {
            gameState.currentPregunta = PREGUNTAS_CAMPANA[gameState.campanaIndex];
            gameState.campanaIndex++;
        } else {
            gameState.currentPregunta = generarPreguntaInfinita();
        }
    }
    appendMessage('gugel', gameState.currentPregunta);
    renderAllData();
});
