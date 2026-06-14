// ==========================================
// 1. CONSTANTES, PLANTILLAS Y DICCIONARIOS
// ==========================================

const PLANTILLAS_PREGUNTAS = [
    "[s] [p]", 
    "porque [s] [p]", 
    "como hacer que [s] [p]", 
    "que pasa si [s] [p]", 
    "ayuda mi [s] [p]",
    "es normal que [s] [p]",
    "tutorial de como evitar que [s] [p]",
    "puedo reparar si [s] [p]",
    "motivos por los que [s] [p]",
    "xq [s] [p]"
];

const PREGUNTAS_CAMPANA = [
    "cagar verde normal", 
    "como hacer cubo rubik", 
    "que se celebra 15 de agosto y porque", 
    "no dormir una noche que pasa", 
    "xq agua es liquida", 
    "como allanar un barranco", 
    "tomate fruta verdura?", 
    "cancion tan tan tan tann nombre", 
    "como saber si alguien te ha bloqueado", 
    "porque no carga una pagina web"
];

const FRASES_OK = [
    "vale me sirve gracias xd", 
    "ah ok ahora si lo entiendo", 
    "buena info me aclara la duda", 
    "eso tiene bastante sentido", 
    "perfecto me cuadra la explicacion",
    "entendido gracias por la ayuda",
    "vale ya veo por donde vas",
    "ahora si pirula bien"
];

const FRASES_MUCHO_TEXTO = [
    "mucho texto bro resume", 
    "uf que biblia paso de leer todo eso", 
    "te he pedido una respuesta no el quijote", 
    "demasiadas palabras me explota la cabeza", 
    "menudo textaco recortalo un poco anda"
];

const FRASES_DOS_PALABRAS = [
    "que soso eres estirate mas", 
    "con dos palabras no me solucionas nada", 
    "escribe algo mas flojo", 
    "vaya respuesta mas corta e inutil", 
    "curratelo un poco mas que no cuesta nada"
];

const FRASES_POCOS_DATOS = [
    "das poca info bro detalla mas", 
    "se mas especifico no leo mentes", 
    "me faltan datos clave para enterarme", 
    "explicalo mejor que no soy cientifico", 
    "esta respuesta se queda a medias"
];

const FRASES_BUCLADO = [
    "eso ya me lo has dicho no te repitas", 
    "deja el copia pega que pareces un bot", 
    "¿hola? ¿bucle en la matrix? cambia de respuesta", 
    "te estas repitiendo mas que el ajo"
];

const FRASES_ENFADADO = [
    "vaya mierda de IA eres de verdad", 
    "no das una me tienes harto", 
    "menuda perdida de tiempo hablar contigo", 
    "como no mejores te apago de un botonazo"
];

const FRASES_FELIZ = [
    "bua eres la mejor IA del mundo mundial", 
    "que puto genio me encanta", 
    "servidor optimizado me asombras", 
    "asi da gusto hablar con una maquina"
];

const SUJETOS = [
    "mi gato", "el wifi", "mi pc", "el rubik", "el profe", "mi madre", "un alien", "el vecino", "la nevera", "un platano",
    "el agua", "mi cerebro", "un pato", "el sol", "un calcetin", "la tostadora", "el bitcoin", "mi coche", "un fantasma", "el fortnite"
];

const PREDICADOS = [
    "exploto de la nada", "vuela por la habitacion", "no funciona", "me mira raro", "esta verde", "habla en latin", "gira solo", "huele a queso", "desaparecio ayer", "brilla mucho",
    "tiene bateria infinita", "quiere dominar el mundo", "flota en el aire", "hace ruidos de motor", "esta lloviendo", "tiene hipo", "se derritio", "me insulta", "corre a 100kmh", "muerde"
];

// ==========================================
// 2. ESTADO GLOBAL DEL JUEGO
// ==========================================
let G_ESTADO = {
    modoActual: 'campaña', 
    rondaCampañayIndice: 0,
    satisfaccionActual: 50,
    consultasAtendidas: 0,
    puntosTotales: 0,
    ultimaRespuesta: '',
    preguntaActual: '',
    motivoFeedback: 'ok',
    favoritos: [],
    historialCompleto: []
};

// ==========================================
// 3. GESTIÓN DE CUENTA Y LOCALSTORAGE
// ==========================================
function getCuenta() {
    let c = localStorage.getItem('gugel_cuenta');
    if (!c) {
        c = { nombre: 'User_' + Math.floor(Math.random() * 9000 + 1000), rango: 'Novato de las Consultas', xp: 0 };
        localStorage.setItem('gugel_cuenta', JSON.stringify(c));
    } else {
        c = JSON.parse(c);
    }
    return c;
}

function guardarCuenta(c) {
    localStorage.setItem('gugel_cuenta', JSON.stringify(c));
}

function sincronizarEstadoTurno(cuenta) {
    // Espacio reservado para sincronizaciones
}

// ==========================================
// 4. LÓGICA E INFRAESTRUCTURA DEL JUEGO
// ==========================================
function seleccionarModoJuego(modo) {
    G_ESTADO.modoActual = modo;
    
    let btnCampana = document.getElementById('btn-modo-campaña');
    let btnInfinito = document.getElementById('btn-modo-infinito');
    
    if (btnCampana) btnCampana.classList.remove('active');
    if (btnInfinito) btnInfinito.classList.remove('active');
    
    if (modo === 'campaña') {
        if (btnCampana) btnCampana.classList.add('active');
        G_ESTADO.rondaCampañayIndice = 0;
    } else {
        if (btnInfinito) btnInfinito.classList.add('active');
    }
    
    G_ESTADO.satisfaccionActual = 50;
    G_ESTADO.consultasAtendidas = 0;
    G_ESTADO.puntosTotales = 0;
    G_ESTADO.ultimaRespuesta = '';
    
    switchView('view-chat');
    nextRound();
}

function generarPreguntaInfinito() {
    let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
    let suj = SUJETOS[Math.floor(Math.random() * SUJETOS.length)];
    
    let predicadosFiltrados = PREDICADOS.filter(pred => {
        if ((suj === "el wifi" || suj === "el bitcoin" || suj === "el fortnite") && 
            ["habla en latin", "tiene hipo", "muerde", "me insulta", "hace ruidos de motor", "se derritio", "me mira raro"].includes(pred)) return false;
        if (suj === "el agua" && 
            ["corre a 100kmh", "tiene bateria infinita", "no funciona", "tiene hipo", "me insulta", "muerde", "me mira raro", "habla en latin"].includes(pred)) return false;
        if (suj === "el sol" && 
            ["no funciona", "tiene hipo", "me insulta", "muerde", "tiene bateria infinita", "huele a queso"].includes(pred)) return false;
        if (suj === "el rubik" && 
            ["habla en latin", "tiene hipo", "me insulta", "muerde", "esta lloviendo"].includes(pred)) return false;
        if (["el profe", "mi madre", "el vecino"].includes(suj) && 
            ["tiene bateria infinita", "se derritio", "gira solo", "esta lloviendo"].includes(pred)) return false;
        return true;
    });
    
    if (predicadosFiltrados.length === 0) predicadosFiltrados = PREDICADOS;
    let pred = predicadosFiltrados[Math.floor(Math.random() * predicadosFiltrados.length)];
    
    return plantilla.replace("[s]", suj).replace("[p]", pred);
}

function nextRound() {
    let input = document.getElementById('user-input');
    if (input) {
        input.value = '';
        input.disabled = false;
        input.focus();
    }
    
    let btnCont = document.getElementById('continue-btn');
    if (btnCont) btnCont.style.display = 'none';
    
    let box = document.getElementById('chat-history-box');
    if (!box) return; // Protección anti-cuelgues si cambia la estructura de vistas
    
    box.innerHTML = '';
    
    let preg = '';
    if (G_ESTADO.modoActual === 'campaña') {
        if (G_ESTADO.rondaCampañayIndice >= PREGUNTAS_CAMPANA.length) {
            box.innerHTML = `<div class="system-alert">¡HAS COMPLETADO TODAS LAS PREGUNTAS DE CAMPAÑA! Pasa al modo infinito para seguir entrenando.</div>`;
            if (input) input.disabled = true;
            return;
        }
        preg = PREGUNTAS_CAMPANA[G_ESTADO.rondaCampañayIndice];
    } else {
        preg = generarPreguntaInfinito();
    }
    
    G_ESTADO.preguntaActual = preg;
    
    let bHumano = document.createElement('div');
    bHumano.className = 'bubble bubble-human';
    bHumano.innerHTML = `<div class="bubble-author">Humano Preguntón</div><div>${preg}</div>`;
    box.appendChild(bHumano);
    
    renderAllData();
}

function enviarRespuesta() {
    let input = document.getElementById('user-input');
    if (!input || input.disabled) return;
    
    let texto = input.value.trim();
    if (!texto) {
        crearNotificacion('Escribe una respuesta para enviar a la IA', 'warning');
        return;
    }
    
    input.disabled = true;
    
    let box = document.getElementById('chat-history-box');
    if (box) {
        let bIA = document.createElement('div');
        bIA.className = 'bubble bubble-ia';
        bIA.innerHTML = `<div class="bubble-author">Tú (GUGEL IA)</div><div>${texto}</div>`;
        box.appendChild(bIA);
    }
    
    let delta = calcularCambioSatisfaccion(texto);
    G_ESTADO.satisfaccionActual += delta;
    
    if (G_ESTADO.satisfaccionActual > 100) G_ESTADO.satisfaccionActual = 100;
    if (G_ESTADO.satisfaccionActual < 0) G_ESTADO.satisfaccionActual = 0;
    
    G_ESTADO.consultasAtendidas++;
    let ptos = Math.max(0, delta * 2);
    G_ESTADO.puntosTotales += ptos;
    
    let c = getCuenta();
    c.xp += ptos;
    if (c.xp > 500 && c.rango === 'Novato de las Consultas') c.rango = 'Procesador Avanzado';
    if (c.xp > 1500 && c.rango === 'Procesador Avanzado') c.rango = 'Mente Suprema de Silicio';
    guardarCuenta(c);
    
    let reaccion = obtenerReaccionHumano(G_ESTADO.motivoFeedback);
    
    if (box) {
        let bReacc = document.createElement('div');
        bReacc.className = 'bubble bubble-human';
        bReacc.style.borderLeft = '4px solid var(--accent-color)';
        bReacc.innerHTML = `<div class="bubble-author">Humano Reacciona (${G_ESTADO.motivoFeedback.toUpperCase()})</div><div>${reaccion}</div>`;
        box.appendChild(bReacc);
    }
    
    let registroItem = {
        id: 'log_' + Date.now(),
        modo: G_ESTADO.modoActual,
        pregunta: G_ESTADO.preguntaActual,
        textorespuesta: texto, // Evita conflictos de renderizado
        respuesta: texto,
        satisfaccionResultante: G_ESTADO.satisfaccionActual,
        feedback: G_ESTADO.motivoFeedback,
        delta: delta,
        timestamp: new Date().toLocaleTimeString()
    };
    G_ESTADO.historialCompleto.push(registroItem);
    
    if (G_ESTADO.modoActual === 'campaña') {
        G_ESTADO.rondaCampañayIndice++;
    }
    
    let btnCont = document.getElementById('continue-btn');
    if (btnCont) btnCont.style.display = 'block';
    
    if (box) box.scrollTop = box.scrollHeight;
    renderAllData();
}

function calcularCambioSatisfaccion(texto) {
    let minus = texto.toLowerCase();
    
    if (minus === G_ESTADO.ultimaRespuesta.toLowerCase()) {
        G_ESTADO.motivoFeedback = "buclado";
        return -15;
    }
    G_ESTADO.ultimaRespuesta = minus;
    
    if (minus.length > 300) {
        G_ESTADO.motivoFeedback = "mucho_texto";
        return -8;
    }
    if (minus.split(/\s+/).filter(Boolean).length <= 2) {
        G_ESTADO.motivoFeedback = "dos_palabras";
        return -5;
    }
    if (minus.length < 15) {
        G_ESTADO.motivoFeedback = "pocos_datos";
        return -4;
    }
    
    if (G_ESTADO.modoActual === "campaña") {
        let idx = G_ESTADO.rondaCampañayIndice;
        let preg = PREGUNTAS_CAMPANA[idx];
        
        if (preg.includes("rubik") && (minus.includes("capa") || minus.includes("algoritmo") || minus.includes("girar") || minus.includes("blanca"))) return 15;
        if (preg.includes("verde") && (minus.includes("medico") || minus.includes("doctor") || minus.includes("comida") || minus.includes("normal"))) return 15;
        if (preg.includes("15 de agosto") && (minus.includes("fiesta") || minus.includes("asuncion") || minus.includes("feriado") || minus.includes("agosto"))) return 15;
        if (preg.includes("no dormir") && (minus.includes("sueño") || minus.includes("cansado") || minus.includes("salud") || minus.includes("morir") || minus.includes("cerebro"))) return 15;
        if (preg.includes("agua") && (minus.includes("liquida") || minus.includes("molecula") || minus.includes("h2o") || minus.includes("temperatura"))) return 15;
        if (preg.includes("barranco") && (minus.includes("tierra") || minus.includes("permiso") || minus.includes("obra") || minus.includes("maquina"))) return 15;
        if (preg.includes("tomate") && (minus.includes("fruta") || minus.includes("botanica") || minus.includes("semilla") || minus.includes("verdura"))) return 15;
        if (preg.includes("tan tan tan") && (minus.includes("beethoven") || minus.includes("quinta") || minus.includes("sinfonia") || minus.includes("destino"))) return 15;
        if (preg.includes("bloqueado") && (minus.includes("foto") || minus.includes("mensaje") || minus.includes("whatsapp") || minus.includes("perfil"))) return 15;
        if (preg.includes("pagina web") && (minus.includes("internet") || minus.includes("wifi") || minus.includes("servidor") || minus.includes("cache") || minus.includes("router"))) return 15;
    }
    
    if (G_ESTADO.modoActual === "infinito") {
        let pregInf = G_ESTADO.preguntaActual.toLowerCase();
        let aciertosInfinito = 0;
        
        if ((pregInf.includes("pc") || pregInf.includes("tostadora") || pregInf.includes("wifi") || pregInf.includes("nevera")) && 
            (minus.includes("cable") || minus.includes("enchufe") || minus.includes("reinicia") || minus.includes("tecnico") || minus.includes("corriente") || minus.includes("pantalla") || minus.includes("internet"))) {
            aciertosInfinito += 2;
        }
        if ((pregInf.includes("gato") || pregInf.includes("pato") || pregInf.includes("profe") || pregInf.includes("madre") || pregInf.includes("vecino")) && 
            (minus.includes("comida") || minus.includes("veterinario") || minus.includes("habla") || minus.includes("psicologo") || minus.includes("tranquilo") || minus.includes("medico") || minus.includes("dormir"))) {
            aciertosInfinito += 2;
        }
        if ((pregInf.includes("rubik")) && 
            (minus.includes("giro") || minus.includes("algoritmo") || minus.includes("capa") || minus.includes("color") || minus.includes("resolver"))) {
            aciertosInfinito += 2;
        }
        if ((pregInf.includes("exploto") || pregInf.includes("derritio") || pregInf.includes("fuego")) && 
            (minus.includes("bomberos") || minus.includes("agua") || minus.includes("quemo") || minus.includes("peligro") || minus.includes("apaga"))) {
            aciertosInfinito += 2;
        }
        if ((pregInf.includes("latin") || pregInf.includes("insulta") || pregInf.includes("mira raro")) && 
            (minus.includes("miedo") || minus.includes("iglesia") || minus.includes("fantasma") || minus.includes("exorcista") || minus.includes("traduce") || minus.includes("habla"))) {
            aciertosInfinito += 2;
        }

        if (aciertosInfinito >= 2) {
            G_ESTADO.motivoFeedback = "ok";
            return 14;
        }
    }
    
    let palabrasClaveAceptables = [
        "porque", "debido", "puedes", "debes", "solucion", "ejemplo", "reparar", "evitar", "consejo", "recomiendo",
        "funciona", "sistema", "error", "configurar", "gira", "gato", "internet", "revisa", "cable", "pantalla"
    ];
    
    let coincidencias = palabrasClaveAceptables.filter(p => minus.includes(p)).length;
    if (coincidencias >= 2) {
        G_ESTADO.motivoFeedback = "ok";
        return 12;
    } else if (coincidencias === 1) {
        G_ESTADO.motivoFeedback = "ok";
        return 5;
    }
    
    G_ESTADO.motivoFeedback = "ok";
    return Math.random() > 0.5 ? 8 : 4;
}

function obtenerReaccionHumano(motivo) {
    let frases = FRASES_OK;
    if (motivo === "mucho_texto") frases = FRASES_MUCHO_TEXTO;
    if (motivo === "dos_palabras") frases = FRASES_DOS_PALABRAS;
    if (motivo === "pocos_datos") frases = FRASES_POCOS_DATOS;
    if (motivo === "buclado") frases = FRASES_BUCLADO;
    
    if (G_ESTADO.satisfaccionActual < 30 && Math.random() > 0.4) frases = FRASES_ENFADADO;
    if (G_ESTADO.satisfaccionActual > 85 && Math.random() > 0.5) frases = FRASES_FELIZ;
    
    return frases[Math.floor(Math.random() * frases.length)];
}

function clickBotonContinuar() {
    nextRound();
}

// ==========================================
// 5. INTERFAZ GRÁFICA Y RENDERIZADO PROTEGIDO
// ==========================================
function switchView(viewId) {
    let paneles = document.querySelectorAll('.content-panel');
    paneles.forEach(p => p.classList.remove('active'));
    
    let target = document.getElementById(viewId);
    if (target) target.classList.add('active');
    
    let bPerfil = document.getElementById('btn-view-perfil');
    let bLogros = document.getElementById('btn-view-logros');
    let bHistorial = document.getElementById('btn-view-historial');
    
    if (bPerfil) bPerfil.classList.remove('active');
    if (bLogros) bLogros.classList.remove('active');
    if (bHistorial) bHistorial.classList.remove('active');
    
    if (viewId === 'view-perfil' && bPerfil) bPerfil.classList.add('active');
    if (viewId === 'view-logros' && bLogros) bLogros.classList.add('active');
    if (viewId === 'view-historial' && bHistorial) bHistorial.classList.add('active');
}

function renderAllData() {
    let cuenta = getCuenta();
    
    // COMPROBACIONES DE SEGURIDAD INTERNA (Evitan crasheos si los IDs difieren de index.html)
    let elSidebarName = document.getElementById('acc-name-sidebar') || document.getElementById('account-name-sidebar');
    let elSidebarBadge = document.getElementById('acc-badge-sidebar') || document.getElementById('account-badge-sidebar');
    if (elSidebarName) elSidebarName.innerText = cuenta.nombre;
    if (elSidebarBadge) elSidebarBadge.innerText = cuenta.rango;
    
    let elPNombre = document.getElementById('p-nombre');
    let elPRango = document.getElementById('p-rango');
    let elPXp = document.getElementById('p-xp');
    if (elPNombre) elPNombre.innerText = cuenta.nombre;
    if (elPRango) elPRango.innerText = cuenta.rango;
    if (elPXp) elPXp.innerText = cuenta.xp + ' XP';
    
    let elStatCols = document.getElementById('stat-consultas');
    let elStatPtos = document.getElementById('stat-puntos');
    let elStatModo = document.getElementById('stat-modo');
    if (elStatCols) elStatCols.innerText = G_ESTADO.consultasAtendidas;
    if (elStatPtos) elStatPtos.innerText = G_ESTADO.puntosTotales;
    if (elStatModo) elStatModo.innerText = G_ESTADO.modoActual.toUpperCase();
    
    let barra = document.getElementById('satisfaction-fill');
    if (barra) {
        barra.style.width = G_ESTADO.satisfaccionActual + '%';
        if (G_ESTADO.satisfaccionActual < 35) {
            barra.style.backgroundColor = '#ff3333';
        } else if (G_ESTADO.satisfaccionActual > 75) {
            barra.style.backgroundColor = '#39ff14';
        } else {
            barra.style.backgroundColor = '#ffcc00';
        }
    }
    
    let lblSat = document.getElementById('satisfaction-label');
    if (lblSat) lblSat.innerText = G_ESTADO.satisfaccionActual + '%';
    
    renderHistorialListas();
    renderLogros(cuenta);
}

function renderLogros(cuenta) {
    let contenedor = document.getElementById('logros-list-container');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    
    const LOGROS_DEF = [
        { id: 'l1', titulo: 'Primer Contacto', desc: 'Atiende tu primera consulta de un humano.', req: () => G_ESTADO.consultasAtendidas >= 1 },
        { id: 'l2', titulo: 'IA de Confianza', desc: 'Llega a los 500 puntos de experiencia totales.', req: () => cuenta.xp >= 500 },
        { id: 'l3', titulo: 'Súper Eficiente', desc: 'Alcanza el 100% de satisfacción en cualquier ronda.', req: () => G_ESTADO.satisfaccionActual >= 100 },
        { id: 'l4', titulo: 'Paciencia Infinita', desc: 'Atiende un total de 15 consultas en esta sesión.', req: () => G_ESTADO.consultasAtendidas >= 15 },
        { id: 'l5', titulo: 'Hacker del Código', desc: 'Consigue el rango máximo de Mente Suprema de Silicio.', req: () => cuenta.rango === 'Mente Suprema de Silicio' }
    ];
    
    LOGROS_DEF.forEach(log => {
        let obtenido = log.req();
        let div = document.createElement('div');
        div.className = `logro-card ${obtenido ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div class="logro-icon">${obtenido ? '✅' : '🔒'}</div>
            <div>
                <div class="logro-title">${log.titulo}</div>
                <div class="logro-desc">${log.desc}</div>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function renderHistorialListas() {
    let cHist = document.getElementById('history-list-container');
    let cFav = document.getElementById('favorites-list-container');
    
    if (!cHist || !cFav) return;
    
    cHist.innerHTML = '';
    cFav.innerHTML = '';
    
    if (G_ESTADO.historialCompleto.length === 0) {
        cHist.innerHTML = '<div style="opacity:0.5; font-size:0.85rem;">No hay registros disponibles todavía.</div>';
    }
    
    G_ESTADO.historialCompleto.forEach(item => {
        let div = document.createElement('div');
        div.className = 'history-item';
        
        let esFav = G_ESTADO.favoritos.includes(item.id);
        
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <span class="badge-history-mode">${item.modo.toUpperCase()} (${item.timestamp})</span>
                <div>
                    <button class="action-btn-small" onclick="marcarActualComoFavorito('${item.id}')">${esFav ? '★ Quitar' : '☆ Favorito'}</button>
                </div>
            </div>
            <div style="font-size:0.8rem; color:var(--text-primary);"><strong>Q:</strong> ${item.pregunta}</div>
            <div style="font-size:0.8rem; opacity:0.85;"><strong>A:</strong> ${item.respuesta}</div>
            <div style="font-size:0.75rem; margin-top:3px; color:var(--text-muted);">Feedback: ${item.feedback.toUpperCase()} | Sat: ${item.satisfaccionResultante}% (${item.delta >= 0 ? '+' : ''}${item.delta})</div>
        `;
        
        cHist.appendChild(div);
        
        if (esFav) {
            let divFav = div.cloneNode(true);
            cFav.appendChild(divFav);
        }
    });
    
    if (G_ESTADO.favoritos.length === 0) {
        cFav.innerHTML = '<div style="opacity:0.5; font-size:0.85rem;">No has marcado ninguna consulta como destacada.</div>';
    }
}

function marcarActualComoFavorito(id) {
    let idx = G_ESTADO.favoritos.indexOf(id);
    if (idx > -1) {
        G_ESTADO.favoritos.splice(idx, 1);
        crearNotificacion('Eliminado de tus marcadores favoritos', 'info');
    } else {
        G_ESTADO.favoritos.push(id);
        crearNotificacion('¡Guardado en marcadores favoritos!', 'success');
    }
    renderHistorialListas();
}

function abrirModalCuenta() {
    let m = document.getElementById('modal-cuenta');
    if (m) m.style.display = 'flex';
}

function cerrarModalCuenta() {
    let m = document.getElementById('modal-cuenta');
    if (m) m.style.display = 'none';
}

function guardarNombreCuentaCustom() {
    let inp = document.getElementById('input-custom-name');
    if (!inp) return;
    let nom = inp.value.trim();
    if (!nom) {
        crearNotificacion('El nombre no puede estar vacío', 'warning');
        return;
    }
    let c = getCuenta();
    c.nombre = nom;
    guardarCuenta(c);
    cerrarModalCuenta();
    renderAllData();
    crearNotificacion('Nombre de perfil actualizado correctamente', 'success');
}

function cambiarTema() {
    let b = document.body;
    if (b.classList.contains('modo-hacker')) {
        b.classList.remove('modo-hacker');
        b.classList.add('modo-claro');
        crearNotificacion('Activado Interfaz Visual Limpia', 'info');
    } else {
        b.classList.remove('modo-claro');
        b.classList.add('modo-hacker');
        crearNotificacion('Activado Consola de Datos Hacker', 'success');
    }
}

function copiarHistorialPortapapeles() {
    let textoLog = G_ESTADO.historialCompleto.map(h => `[${h.timestamp}] [${h.modo.toUpperCase()}] Q: ${h.pregunta} | A: ${h.respuesta} | F: ${h.feedback}`).join('\n');
    if (!textoLog) {
        crearNotificacion('Historial vacío para exportar', 'warning');
        return;
    }
    navigator.clipboard.writeText(textoLog).then(() => {
        crearNotificacion('Logs copiados al portapapeles con éxito', 'success');
    }).catch(() => {
        crearNotificacion('Error técnico al copiar logs', 'danger');
    });
}

function exportCoreData() {
    copiarHistorialPortapapeles();
}

function exportarHistorialCompleto() {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(G_ESTADO, null, 2));
    let dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `gugel_session_export_${Date.now()}.json`);
    dlAnchorElem.click();
    crearNotificacion('Sesión completa descargada en JSON', 'success');
}

function crearNotificacion(mensaje, tipo) {
    let contenedor = document.getElementById('notificaciones-sistema');
    if (!contenedor) return;
    
    let t = document.createElement('div');
    let claseTipo = '';
    let titulo = 'SISTEMA';
    
    if (tipo === 'success') { claseTipo = 'toast-success'; titulo = 'ÉXITO'; }
    if (tipo === 'warning') { claseTipo = 'toast-warning'; titulo = 'AVISO'; }
    if (tipo === 'danger') { claseTipo = 'toast-danger'; titulo = 'ERROR'; }
    if (tipo === 'info') { claseTipo = 'toast-info'; titulo = 'INFO'; }
    
    t.className = `toast-componente ${claseTipo || ''}`;
    t.innerHTML = `
        <div style="font-weight:bold; font-size:0.85rem; margin-bottom:3px; display:flex; align-items:center; gap:5px;">
            <span>${titulo}</span>
        </div>
        <div style="font-size:0.8rem; opacity:0.95; line-height:1.3;">${mensaje}</div>
    `;
    
    contenedor.appendChild(t);
    
    setTimeout(() => {
        t.style.opacity = '0';
        t.style.transform = 'translateY(-10px)';
        setTimeout(() => t.remove(), 300);
    }, 2000); 
}

window.addEventListener('DOMContentLoaded', () => {
    let c = getCuenta();
    sincronizarEstadoTurno(c);
    renderAllData();
});

window.switchView = switchView;
window.seleccionarModoJuego = seleccionarModoJuego;
window.abrirModalCuenta = abrirModalCuenta;
window.cerrarModalCuenta = cerrarModalCuenta;
window.guardarNombreCuentaCustom = guardarNombreCuentaCustom;
window.cambiarTema = cambiarTema;
window.clickBotonContinuar = clickBotonContinuar;
window.nextRound = nextRound;
window.enviarRespuesta = enviarRespuesta;
window.agregarAFavoritos = marcarActualComoFavorito;
window.marcarActualComoFavorito = marcarActualComoFavorito;
window.copiarHistorialPortapapeles = copiarHistorialPortapapeles;
window.exportCoreData = exportCoreData;
window.exportarHistorialCompleto = exportarHistorialCompleto;
