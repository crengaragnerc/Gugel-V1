// ==========================================
// 1. CONSTANTES, PLANTILLAS Y DICCIONARIOS
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
const OPINIONES_MEDIA_BAJA = ["(sospecha que eres un gato pisando el teclado)", "(piensa que tu algorithm tiene un tornillo flojo)"];
const OPINIONES_MEDIA_ALT_A = ["(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores)"];

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

const BASE_LOGROS = [
    { id: "L01", tipo: "positivo", nombre: "Primeros Pasos", desc: "Completaste la primera consulta con éxito." },
    { id: "L02", tipo: "positivo", nombre: "IA Comprensiva", desc: "Alcanzaste el 60% de satisfacción del usuario." },
    { id: "L03", tipo: "positivo", nombre: "Empatía Algorítmica", desc: "Alcanzaste el 80% de satisfacción." },
    { id: "L04", tipo: "positivo", nombre: "Deidad Binaria", desc: "Llegaste al 100% de satisfacción máxima." },
    { id: "L05", tipo: "positivo", merge: true, nombre: "Operador de Élite", desc: "Completaste las 10 preguntas de la Campaña." },
    { id: "L06", tipo: "positivo", nombre: "Guardado Seguro", desc: "Añadiste tu primera consulta a Favoritos." },
    { id: "L07", tipo: "positivo", nombre: "Coleccionista de Estrellas", desc: "Guardaste 3 elementos en Favoritos." },
    { id: "L08", tipo: "positivo", nombre: "Sabor Botánico", desc: "Respondiste coherentemente sobre el enigma del tomate." },
    { id: "L09", tipo: "positivo", nombre: "Speedcuber Teórico", desc: "Le diste una respuesta digna sobre el cubo de Rubik." },
    { id: "L10", tipo: "positivo", nombre: "Ciberseguridad Básica", desc: "Establebiste credenciales con contraseña." },
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
    { id: "L29", tipo: "positivo", nombre: "Persistencia", desc: "Superaste 12 rounds totales combinadas." },
    { id: "L30", tipo: "positivo", nombre: "Mundo Algodón", desc: "Activaste el reluciente Tema Rosa." },
    { id: "L31", tipo: "positivo", nombre: "Odisea del Espacio", desc: "Estableciste la terminal en órbita con el Modo Espacial." },
    
    // LOGROS NEGATIVOS
    { id: "LN1", tipo: "negativo", nombre: "Aporrea-Teclados", desc: "Enviaste una secuencia incoherente sospechosa de spam." },
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
// 2. SISTEMA MULTICUENTA DE DATOS AISLADOS
// ==========================================
let usuarioActivo = "Invitado";
let baseCuentas = {};
let cuentaInvitadoVolatil = null; 
let esperandoRespuestaDeTurno = true; 
let syncTimeout = null; 
let revisandoHistorial = false; 

try {
    if (localStorage.getItem('gugel-multiverse-v4')) {
        baseCuentas = JSON.parse(localStorage.getItem('gugel-multiverse-v4'));
        if (typeof baseCuentas !== 'object' || baseCuentas === null) {
            baseCuentas = {};
        }
        if (baseCuentas["Invitado"]) delete baseCuentas["Invitado"]; 
    }
} catch (error) {
    console.error("Error al procesar el búfer de cuentas central, reiniciando base local:", error);
    baseCuentas = {};
}

function crearEstructuraVacia() {
    return {
        modo: "campaña",
        campanaIndex: 0,
        satisfaction: 50,
        history: [],
        favorites: [],
        logrosDesbloqueados: [],
        recentReactions: [],
        lastUserText: "",
        password: "",
        campañaCompletada: false,
        currentPregunta: "",
        currentPreguntaCampana: "",
        currentPreguntaInfinito: "",
        esperandoCampana: true,
        esperandoInfinito: true
    };
}

function asegurarEstructuraCuenta(nombre) {
    const plantilla = crearEstructuraVacia();
    let c;

    if (nombre === "Invitado") {
        if (!cuentaInvitadoVolatil) {
            cuentaInvitadoVolatil = plantilla;
        }
        c = cuentaInvitadoVolatil;
    } else {
        if (!baseCuentas[nombre]) {
            baseCuentas[nombre] = plantilla;
        }
        c = baseCuentas[nombre];
    }

    // Escaneo estructural preventivo contra datos corruptos u obsoletos
    for (let key in plantilla) {
        if (c[key] === undefined || c[key] === null) {
            c[key] = plantilla[key];
        } else if (Array.isArray(plantilla[key]) && !Array.isArray(c[key])) {
            c[key] = [];
        }
    }
}

asegurarEstructuraCuenta(usuarioActivo);

function salvarAStorage() {
    if (usuarioActivo !== "Invitado") {
        localStorage.setItem('gugel-multiverse-v4', JSON.stringify(baseCuentas));
    }
}

function getCuenta() {
    if (usuarioActivo === "Invitado") {
        return cuentaInvitadoVolatil;
    }
    return baseCuentas[usuarioActivo];
}

function sincronizarEstadoTurno(c) {
    if (c.modo === "campaña") {
        if (!c.currentPreguntaCampana) {
            if (c.currentPregunta) {
                c.currentPreguntaCampana = c.currentPregunta;
            } else {
                c.currentPreguntaCampana = PREGUNTAS_CAMPANA[c.campanaIndex] || PREGUNTAS_CAMPANA[0];
                c.campanaIndex++;
            }
            c.esperandoCampana = true;
        }
        c.currentPregunta = c.currentPreguntaCampana;
        esperandoRespuestaDeTurno = c.esperandoCampana;
    } else {
        if (!c.currentPreguntaInfinito) {
            if (c.currentPregunta && c.currentPreguntaInfinito === "") {
                c.currentPreguntaInfinito = c.currentPregunta;
            } else {
                c.currentPreguntaInfinito = generarPreguntaInfinita();
            }
            c.esperandoInfinito = true;
        }
        c.currentPregunta = c.currentPreguntaInfinito;
        esperandoRespuestaDeTurno = c.esperandoInfinito;
    }

    if (c.history.length > 0 && c.history[c.history.length - 1].pregunta === c.currentPregunta) {
        esperandoRespuestaDeTurno = false;
        if (c.modo === "campaña") c.esperandoCampana = false;
        else c.esperandoInfinito = false;
    }
}

// ==========================================
// 3. MOTOR DE COHERENCIA Y LOGROS
// ==========================================
function evaluarCoherenciaYSpam(pregunta, respuesta) {
    let resp = respuesta.toLowerCase().trim();
    let preg = pregunta.toLowerCase();

    if (/([abcdefghijklmnopqrstuvwxyz])\1{3,}/.test(resp) || /^[bcdfghjklmnñpqrstvwxyz\s]{5,}$/.test(resp.replace(/[^a-z]/g, ''))) {
        desbloquearLogro("LN1");
        return "CRITICA";
    }
    
    if (resp.includes("fighfd") || resp.includes("fhbifbh") || resp.includes("qwerty") || resp.includes("asdf")) {
        desbloquearLogro("LN1");
        return "CRITICA";
    }

    if (EVASIVAS.includes(resp) || resp.length < 4) {
        if (resp.length < 4) desbloquearLogro("LN6");
        desbloquearLogro("LN2");
        return "RECHAZO";
    }

    let claveEncontrada = false;
    let tieneDiccionario = false;

    for (let palabraClave in MAPA_COHERENCIA) {
        if (preg.includes(palabraClave)) {
            tieneDiccionario = true;
            let sinonimos = MAPA_COHERENCIA[palabraClave];
            if (resp.includes(palabraClave) || sinonimos.some(s => resp.includes(s))) {
                claveEncontrada = true;
            }
        }
    }

    if (tieneDiccionario && !claveEncontrada) {
        desbloquearLogro("LN3");
        return "RECHAZO";
    }

    if (preg.includes("rubik") && claveEncontrada) desbloquearLogro("L09");
    if (preg.includes("tomate") && claveEncontrada) desbloquearLogro("L08");
    if (preg.includes("dormir") && claveEncontrada) desbloquearLogro("L22");
    if (preg.includes("barranco") && claveEncontrada) desbloquearLogro("L23");
    if (preg.includes("cancion") && claveEncontrada) desbloquearLogro("L24");
    if (preg.includes("bloqueado") && claveEncontrada) desbloquearLogro("L25");
    if (preg.includes("web") && claveEncontrada) desbloquearLogro("L26");

    return "OK";
}

function desbloquearLogro(id) {
    let c = getCuenta();
    if (c && c.logrosDesbloqueados && !c.logrosDesbloqueados.includes(id)) {
        c.logrosDesbloqueados.push(id);
        const logro = BASE_LOGROS.find(l => l.id === id);
        if (logro) {
            const tituloToast = logro.tipo === 'negativo' ? "⚠️ LOGRO NEGATIVO" : "🏆 ¡LOGRO DESBLOQUEADO!";
            const cuerpoToast = `[${usuarioActivo}] ${logro.nombre.toUpperCase()}: ${logro.desc}`;
            generarVentanitaSistema(tituloToast, cuerpoToast, logro.tipo);
        }
        salvarAStorage();
    }
}

function verificarLogrosDeEstado() {
    let c = getCuenta();
    if (c.history.length === 1) desbloquearLogro("L01");
    if (c.history.length >= 12) desbloquearLogro("L29");
    if (c.satisfaction >= 60) desbloquearLogro("L02");
    if (c.satisfaction >= 80) desbloquearLogro("L03");
    if (c.satisfaction >= 100) desbloquearLogro("L04");
    if (c.satisfaction <= 20) desbloquearLogro("LN4");
    if (c.satisfaction === 0) desbloquearLogro("LN5");
}

// ==========================================
// 4. INTERFAZ Y RENDERIZADO DINÁMICO
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
        let etiqueta = sender === 'gugel' ? 'GUGEL' : 'USUARIO';
        msg.innerHTML = `<strong>${etiqueta}:</strong> ${text}`;
        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;
    }
}

function renderChatActual() {
    let c = getCuenta();
    document.getElementById('chat-messages').innerHTML = "";
    
    if (esperandoRespuestaDeTurno) {
        appendMessage('usuario', c.currentPregunta);
        
        const input = document.getElementById('user-input');
        input.value = "";
        input.style.display = "block";
        input.disabled = false;
        input.placeholder = "Introduce tu respuesta...";

        const tBtn = document.getElementById('transmit-btn');
        tBtn.style.display = "block";
        tBtn.disabled = false;

        document.getElementById('chat-actions-bar').style.display = "none";
        document.getElementById('continue-btn').style.display = "none";
    } else {
        let lastLog = c.history.filter(h => h.pregunta === c.currentPregunta).pop();
        if (!lastLog && c.history.length > 0) {
            lastLog = c.history[c.history.length - 1];
        }
        
        if (lastLog) {
            appendMessage('usuario', lastLog.pregunta);
            appendMessage('gugel', lastLog.respuesta);
            appendMessage('usuario', lastLog.reaccion);
        } else {
            appendMessage('usuario', c.currentPregunta);
        }
        
        document.getElementById('user-input').style.display = "none";
        document.getElementById('transmit-btn').style.display = "none";
        document.getElementById('chat-actions-bar').style.display = "block";
        document.getElementById('continue-btn').style.display = "block";
    }
}

function renderAllData() {
    let c = getCuenta();

    document.getElementById('sidebar-user-display').innerText = usuarioActivo;
    document.getElementById('prof-usuario').innerText = usuarioActivo;
    document.getElementById('panel-user-status').innerText = usuarioActivo;
    document.getElementById('prof-satisfaction').innerText = `${c.satisfaction}%`;
    
    document.getElementById('prof-opinion').innerText = obtenerElementoNoRepetido(
        c.satisfaction < 35 ? OPINIONES_BAJA : 
        c.satisfaction < 55 ? OPINIONES_MEDIA_BAJA : 
        c.satisfaction < 80 ? OPINIONES_MEDIA_ALT_A : OPINIONES_ALTA, 
        c.recentReactions
    );

    const btnCamp = document.getElementById('btn-modo-campaña');
    const btnInfi = document.getElementById('btn-modo-infinito');

    if (btnCamp && btnInfi) {
        btnCamp.classList.remove('active');
        btnInfi.classList.remove('active');
        if (c.modo === "campaña") btnCamp.classList.add('active');
        if (c.modo === "infinito") btnInfi.classList.add('active');
    }

    document.getElementById('logros-count').innerText = c.logrosDesbloqueados.length;
    const logrosContainer = document.getElementById('logros-container');
    if (logrosContainer) {
        const unlockedLogros = BASE_LOGROS.filter(l => c.logrosDesbloqueados.includes(l.id));
        if (unlockedLogros.length === 0) {
            logrosContainer.innerHTML = `<p style="color:var(--text-muted); font-style:italic;">No has registrado logros en este perfil.</p>`;
        } else {
            logrosContainer.innerHTML = unlockedLogros.map(logro => `
                <div class="item-logro ${logro.tipo}">
                    <strong>${logro.tipo === 'negativo' ? '⚠️ ' : '🏆 '}${logro.nombre}</strong><br>
                    <span style="font-size:0.8rem; color:var(--text-muted);">${logro.desc}</span>
                </div>
            `).join('');
        }
    }

    const histContainer = document.getElementById('history-list-container');
    if (histContainer) {
        if (c.history.length === 0) {
            histContainer.innerHTML = "<p style='color:var(--text-muted);'>Búfer de logs vacío.</p>";
        } else {
            histContainer.innerHTML = c.history.map((h, index) => `
                <div class="log-item-card" onclick="cargarChatHistorico(${index})">
                    <div class="log-item-info">
                        <strong>Q:</strong> ${h.pregunta}<br>
                        <span style="font-size:0.85rem; color: var(--accent-color);"><strong>A:</strong> ${h.respuesta}</span><br>
                        <span style="font-size:0.8rem; color: var(--text-muted); font-style: italic;"><strong>Reacción:</strong> "${h.reaccion}"</span>
                    </div>
                    <div class="log-item-action" onclick="event.stopPropagation();">
                        <button class="mini-fav-btn" onclick="marcarHistoricoComoFavorito(${index})">⭐ Guardar</button>
                    </div>
                </div>
            `).join('');
        }
    }

    const favContainer = document.getElementById('favorites-list-container');
    if (favContainer) {
        if (c.favorites.length === 0) {
            favContainer.innerHTML = "<p style='color:var(--text-muted);'>No hay marcadores guardados.</p>";
        } else {
            favContainer.innerHTML = c.favorites.map(f => `
                <div style="margin-bottom:10px; border-left:2px solid #ffd700; padding-left:10px; background: rgba(255,215,0,0.03); padding:8px; border-radius:4px;">
                    <strong>⭐ Q:</strong> ${f.pregunta}<br>
                    <strong>A:</strong> ${f.respuesta}
                </div>
            `).join('');
        }
    }

    const contBtn = document.getElementById('continue-btn');
    if (contBtn) {
        if (revisandoHistorial) {
            contBtn.innerText = "VOLVER AL CHAT ACTIVO";
        } else {
            contBtn.innerText = "SIGUIENTE CONSULTA";
        }
    }
}

// ==========================================
// 5. FLUJO DEL CHAT Y RONDAS
// ==========================================
document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    let c = getCuenta();
    const input = document.getElementById('user-input');
    const userText = input.value.trim();
    if (!userText || input.disabled) return;
    
    appendMessage('gugel', userText);
    input.style.display = "none";
    document.getElementById('transmit-btn').style.display = "none";

    let tipo = "OK";
    if (userText.toLowerCase() === c.lastUserText.toLowerCase()) {
        tipo = "CRITICA";
        desbloquearLogro("LN7");
    } else {
        tipo = evaluarCoherenciaYSpam(c.currentPregunta, userText);
    }

    c.lastUserText = userText;

    let reaccion = tipo === "CRITICA" ? obtenerElementoNoRepetido(FRASES_CRITICAS, c.recentReactions) :
                   tipo === "RECHAZO" ? obtenerElementoNoRepetido(FRASES_RECHAZO, c.recentReactions) :
                   obtenerElementoNoRepetido(FRASES_OK, c.recentReactions);

    if (tipo === "CRITICA") {
        c.satisfaction -= 20;
        desbloquearLogro("LN8");
    } else if (tipo === "RECHAZO") {
        c.satisfaction -= 15;
    } else {
        c.satisfaction += 10;
        if (userText.length > 60) desbloquearLogro("L15");
    }
    
    c.satisfaction = Math.max(0, Math.min(100, c.satisfaction));

    setTimeout(() => {
        appendMessage('usuario', reaccion);
        c.history.push({ pregunta: c.currentPregunta, respuesta: userText, reaccion: reaccion });

        if (c.modo === "campaña" && c.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            c.campañaCompletada = true;
            desbloquearLogro("L05");
        }

        esperandoRespuestaDeTurno = false; 
        if (c.modo === "campaña") {
            c.currentPreguntaCampana = c.currentPregunta;
            c.esperandoCampana = false;
        } else {
            c.currentPreguntaInfinito = c.currentPregunta;
            c.esperandoInfinito = false;
        }

        verificarLogrosDeEstado();
        salvarAStorage();
        renderChatActual();
        renderAllData();
    }, 500);
};

function generarPreguntaInfinita() {
    let preguntaFinal = "";
    while (true) {
        let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        let sujeto = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        let predicado = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        preguntaFinal = plantilla.replace("[s]", sujeto).replace("[p]", predicado);
        let numeroPalabras = preguntaFinal.split(/\s+/).filter(Boolean).length;
        if (numeroPalabras > 2) {
            break; 
        }
    }
    return preguntaFinal;
}

function clickBotonContinuar() {
    if (revisandoHistorial) {
        revisandoHistorial = false;
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('view-chat').classList.add('active');
        renderChatActual();
        renderAllData();
        if (esperandoRespuestaDeTurno) {
            document.getElementById('user-input').focus();
        }
    } else {
        nextRound();
    }
}

function nextRound() {
    let c = getCuenta();
    if (syncTimeout) clearTimeout(syncTimeout);

    document.getElementById('chat-messages').innerHTML = "";
    document.getElementById('continue-btn').style.display = "none";
    document.getElementById('chat-actions-bar').style.display = "none";

    if (c.modo === "campaña") {
        if (c.campanaIndex < PREGUNTAS_CAMPANA.length) {
            c.currentPregunta = PREGUNTAS_CAMPANA[c.campanaIndex];
            c.campanaIndex++;
        } else {
            c.campañaCompletada = true;
            c.currentPregunta = generarPreguntaInfinita();
        }
        c.currentPreguntaCampana = c.currentPregunta;
        c.esperandoCampana = true;
    } else {
        c.currentPregunta = generarPreguntaInfinita();
        c.currentPreguntaInfinito = c.currentPregunta;
        c.esperandoInfinito = true;
    }
    
    appendMessage('usuario', c.currentPregunta);
    esperandoRespuestaDeTurno = true; 
    
    const input = document.getElementById('user-input');
    input.value = "";
    input.style.display = "block";
    input.disabled = true;
    input.placeholder = "Sincronizando terminal...";
    
    const tBtn = document.getElementById('transmit-btn');
    tBtn.style.display = "block";
    tBtn.disabled = true;

    syncTimeout = setTimeout(() => {
        input.disabled = false;
        tBtn.disabled = false;
        input.placeholder = "Introduce tu respuesta...";
        if (document.getElementById('view-chat').classList.contains('active')) {
            input.focus();
        }
    }, 1200);
}

// ==========================================
// 6. CONTROLADORES DE FAVORITOS INTERACTIVOS
// ==========================================
function marcarActualComoFavorito() {
    let c = getCuenta();
    if (c.history.length === 0) return;
    let ultimoLog = c.history[c.history.length - 1];
    inyectarFavoritoEstructural(ultimoLog.pregunta, ultimoLog.respuesta);
}

function marcarHistoricoComoFavorito(index) {
    let c = getCuenta();
    let logSeleccionado = c.history[index];
    if (logSeleccionado) {
        inyectarFavoritoEstructural(logSeleccionado.pregunta, logSeleccionado.respuesta);
    }
}

function inyectarFavoritoEstructural(preg, resp) {
    let c = getCuenta();
    if (!c.favorites.some(f => f.pregunta === preg && f.respuesta === resp)) {
        c.favorites.push({ pregunta: preg, respuesta: resp });
        desbloquearLogro("L06");
        if (c.favorites.length >= 3) desbloquearLogro("L07");
        salvarAStorage();
        renderAllData();
        generarVentanitaSistema("Marcadores", "Consulta guardada en marcadores favoritos.", "positivo");
    } else {
        generarVentanitaSistema("Marcadores", "Esta consulta ya se encuentra en favoritos.", "negativo");
    }
}

function cargarChatHistorico(index) {
    let c = getCuenta();
    let log = c.history[index];
    if (!log) return;

    revisandoHistorial = true;

    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    document.getElementById('chat-messages').innerHTML = "";
    appendMessage('usuario', log.pregunta);
    appendMessage('gugel', log.respuesta);
    appendMessage('usuario', log.reaccion);

    document.getElementById('user-input').style.display = "none";
    document.getElementById('transmit-btn').style.display = "none";
    document.getElementById('chat-actions-bar').style.display = "none";
    
    document.getElementById('continue-btn').style.display = "block";
    renderAllData();
}

// ==========================================
// 7. NAVEGACIÓN, MODOS Y TEMAS
// ==========================================
function seleccionarModoJuego(nuevoModo) {
    let c = getCuenta();
    if (syncTimeout) clearTimeout(syncTimeout);
    
    if (c.modo === "campaña") {
        c.currentPreguntaCampana = c.currentPregunta;
        c.esperandoCampana = esperandoRespuestaDeTurno;
    } else {
        c.currentPreguntaInfinito = c.currentPregunta;
        c.esperandoInfinito = esperandoRespuestaDeTurno;
    }

    c.modo = nuevoModo;
    if (nuevoModo === "infinito") {
        desbloquearLogro("L14");
    }

    revisandoHistorial = false;

    if (c.modo === "campaña") {
        if (!c.currentPreguntaCampana) {
            if (c.campañaCompletada) {
                c.currentPreguntaCampana = generarPreguntaInfinita();
            } else {
                c.currentPreguntaCampana = PREGUNTAS_CAMPANA[c.campanaIndex] || PREGUNTAS_CAMPANA[0];
                c.campanaIndex++;
            }
            c.esperandoCampana = true;
        }
        c.currentPregunta = c.currentPreguntaCampana;
        esperandoRespuestaDeTurno = c.esperandoCampana;
    } else {
        if (!c.currentPreguntaInfinito) {
            c.currentPreguntaInfinito = generarPreguntaInfinita();
            c.esperandoInfinito = true;
        }
        c.currentPregunta = c.currentPreguntaInfinito;
        esperandoRespuestaDeTurno = c.esperandoInfinito;
    }

    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    renderChatActual();
    salvarAStorage();
    renderAllData();
    
    if (esperandoRespuestaDeTurno) {
        document.getElementById('user-input').focus();
    }
}

// ==========================================
// 8. LÓGICA DE VENTANAS DE DIÁLOGO MODALES (CORREGIDO)
// ==========================================
function abrirModalCuenta() {
    let c = getCuenta();
    const modal = document.getElementById('modal-cuenta-operador');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('account-username').value = usuarioActivo === "Invitado" ? "" : usuarioActivo;
        document.getElementById('account-password').value = c.password || "";
    }
}

function cerrarModalCuenta() {
    const modal = document.getElementById('modal-cuenta-operador');
    if (modal) {
        modal.classList.remove('active');
    }
}

function cerrarModalCuentaExterno(e) {
    if (e.target.id === "modal-cuenta-operador") {
        cerrarModalCuenta();
    }
}

function guardarNombreCuenta() {
    let nuevoUsuario = document.getElementById('account-username').value.trim();
    let nuevaPassword = document.getElementById('account-password').value;

    if (!nuevoUsuario) {
        generarVentanitaSistema("⚠️ Error Crítico", "El código de operador no puede estar vacío.", "negativo");
        return;
    }

    if (syncTimeout) clearTimeout(syncTimeout);

    usuarioActivo = nuevoUsuario;
    asegurarEstructuraCuenta(usuarioActivo);
    
    let c = getCuenta();
    c.password = nuevaPassword;

    if (nuevaPassword === "") {
        desbloquearLogro("LN10");
    } else {
        desbloquearLogro("L10");
    }

    if (nuevoUsuario !== "Invitado") {
        desbloquearLogro("L21");
    }

    salvarAStorage();
    cerrarModalCuenta();
    
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('view-chat').classList.add('active');
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    sincronizarEstadoTurno(c);
    renderChatActual();
    renderAllData();
    
    generarVentanitaSistema("⚙️ GESTIÓN DE CUENTA", `Módulo de Datos cargado para el operador: ${usuarioActivo}`, "positivo");
    if (esperandoRespuestaDeTurno) {
        document.getElementById('user-input').focus();
    }
}

function cambiarTema(nuevoTema) {
    document.body.className = nuevoTema;
    localStorage.setItem('gugel-tema', nuevoTema);
    if (nuevoTema === "modo-hacker") desbloquearLogro("L11");
    if (nuevoTema === "modo-claro") desbloquearLogro("L12");
    if (nuevoTema === "modo-oscuro") desbloquearLogro("L13");
    if (nuevoTema === "modo-rosa") desbloquearLogro("L30");
    if (nuevoTema === "modo-espacial") desbloquearLogro("L31");
}

function switchView(viewId) {
    revisandoHistorial = false;
    const panelObjetivo = document.getElementById(viewId);
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    if (panelObjetivo && panelObjetivo.classList.contains('active')) {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        document.getElementById('view-chat').classList.add('active');
        renderChatActual();
    } else {
        document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
        if (panelObjetivo) {
            panelObjetivo.classList.add('active');
            let btnId = `btn-${viewId}`;
            const btnPulsado = document.getElementById(btnId);
            if (btnPulsado) btnPulsado.classList.add('active');
            
            if (viewId === "view-perfil") desbloquearLogro("L17");
            if (viewId === "view-historial") desbloquearLogro("L18");
        }
    }
    renderAllData();
}

// ==========================================
// 9. EXPORTACIONES MUESTRA Y NOTIFICACIONES
// ==========================================
function exportCoreData() {
    let c = getCuenta();
    if (c.history.length === 0) return alert("Búfer vacío.");
    let log = c.history.map((h, i) => `LOG #${i + 1}\nConsulta: ${h.pregunta}\nRespuesta: ${h.respuesta}\nReacción: ${h.reaccion}\n---`).join('\n');
    navigator.clipboard.writeText(log).then(() => {
        desbloquearLogro("L19");
        generarVentanitaSistema("Búfer Central", "Logs transferidos al portapapeles del sistema.", "positivo");
    });
}

function exportarHistorialCompleto() {
    let c = getCuenta();
    if (c.history.length === 0) return alert("Búfer vacío.");
    let log = `=== GUGEL OPERATOR LOG ===\nUsuario: ${usuarioActivo}\n\n`;
    log += c.history.map((h, i) => `[${i + 1}] Q: ${h.pregunta} | A: ${h.respuesta} | R: ${h.reaccion}`).join('\n');
    const blob = new Blob([log], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_gugel_${usuarioActivo}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    desbloquearLogro("L20");
}

function generarVentanitaSistema(titulo, mensaje, claseTipo) {
    const contenedor = document.getElementById('contenedor-notificaciones-sistema');
    if (!contenedor) return;

    const nuevaVentanita = document.createElement('div');
    nuevaVentanita.className = `ventanita-notificacion-flotante ${claseTipo}`;

    nuevaVentanita.innerHTML = `
        <div class="toast-titulo">${titulo}</div>
        <div class="toast-cuerpo">${mensaje}</div>
    `;

    contenedor.appendChild(nuevaVentanita);

    setTimeout(() => {
        nuevaVentanita.classList.add('salida-toast');
        nuevaVentanita.addEventListener('transitionend', () => {
            nuevaVentanita.remove();
        });
    }, 4000);
}

function dispararLogroPrueba() {
    generarVentanitaSistema(
        "🏆 ¡LOGRO DESBLOQUEADO!",
        "Pensamiento Artificial: Has procesado una petición en menos de 0.5 segundos.",
        "positivo"
    );
}

function dispararOperadorPrueba() {
    generarVentanitaSistema(
        "⚙️ GESTIÓN DE CUENTA",
        "Cuenta de operador vinculada correctamente al núcleo del simulador.",
        "positivo"
    );
}

// ==========================================
// 10. EVENTO INICIAL DE CARGA
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('gugel-tema') || 'modo-hacker';
    document.body.className = temaGuardado;
    const s = document.getElementById('theme-select');
    if (s) s.value = temaGuardado;
    
    let c = getCuenta();
    sincronizarEstadoTurno(c);
    renderChatActual();
    renderAllData();
});
