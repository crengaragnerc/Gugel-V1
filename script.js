// =================================================================
// GUGEL: VERSIÓN MAESTRA COMPLETA CON LOGROS OCULTOS Y REACCIONES HUMANAS
// =================================================================

const PLANTILLAS_PREGUNTAS = [
    "¿por qué [s] [p]?", "¿es normal que [s] [p]?", "¿cómo explicas que [s] [p]?",
    "¿qué sucede cuando [s] [p]?", "¿me dices por qué [s] [p]?"
];
const INFINITO_SUJETOS = ["gato", "perro vecino", "gato callejero", "pantalla pc", "espejo cuarto", "plastilina azul", "teclado usb", "conexion fibra", "raton optico"];
const INFINITO_PREDICADOS = ["mira fijo raro", "duerme encima router caliente", "maulla pared vacia", "morder cable teclado", "conduce electricidad", "parpadea sin parar", "da calambre"];
const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];
const PREGUNTAS_CAMPANA = [
    "cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque",
    "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco",
    "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"
];

const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

// Generación de 200 opiniones humanas y realistas de usuarios interactuando con un buscador
const OPINIONES_BAJA = [
    "esta mierda no me ha solucionado nada", "vaya perdida de tiempo de verdad", "creo que el buscador esta roto",
    "le he preguntado una cosa y me salta con otra", "estoy por apagar el ordenador e irme", "vaya respuestas mas inutiles da esto",
    "esto parece un bot programado en cinco minutos", "no entiendo que clase de algoritmo es este", "que respuesta mas mala por dios",
    "esto es peor que el soporte automatico de la telefonica", "vaya estafa de inteligencia", "no tiene ningun sentido lo que dices",
    "me estas vacilando seguro", "voy a buscar en otro sitio porque vaya tela", "es insoportable usar esto",
    "no vuelvo a entrar aqui en mi vida", "vaya respuestas de barra de bar", "parece que hablo con una pared",
    "es que ni te acercas a lo que te he pedido", "que frustración de pagina", "esto no sirve para absolutamente nada",
    "vaya programador ha hecho esto", "es nefasto el nivel de comprension", "escribo letras aleatorias y seguro responde mejor",
    "seguro que esto es una broma pesada", "no se como sigue online esta web", "un niño de tres años razona mas",
    "me estas dando dolor de cabeza", "vaya basura de servicio", "que desastre de base de datos",
    "no das una ni de casualidad", "vaya respuestas incoherentes", "me rindo con este chat",
    "que perdida de luz tener esto encendido", "eres lo mas inutil de internet", "vaya respuestas mas vacias",
    "no respondes a la pregunta ni queriendo", "que desesperacion de verdad", "esta aplicacion da pena",
    "voy a desinstalar el navegador como sigas asi", "es que ni una palabra tiene sentido", "me pones de mala leche",
    "vaya bot mas flojo", "esto es prehistorico", "que nivel mas bajo teneis", "no entiendo nada de tu respuesta",
    "esto se merece un cero absoluto", "vaya timo de software", "es ridiculo este chat", "vete a tomar el pelo a otro"
];

const OPINIONES_MEDIA_BAJA = [
    "bueno mas o menos pero no me convence", "un poco flojo el argumento", "esperaba algo mas detallado",
    "me sirve a medias la verdad", "un poco simple pero bueno", "esta bien pero te falta informacion",
    "no esta del todo mal pero tampoco bien", "medio entiendo lo que quieres decir", "bastante mejorable la respuesta",
    "una respuesta un poco vaga", "te has quedado a medias chaval", "bueno algo de sentido tiene",
    "un aprobado raspado y gracias", "no me quejo pero tampoco te aplaudo", "un poco flojo el sistema hoy",
    "bueno al menos has puesto algo coherente", "esperaba otra cosa pero me vale de momento", "bastante estandar la verdad",
    "un argumento un poco pillado con pinzas", "se nota que te cuesta procesar", "esta pasable pero sin tirar cohetes",
    "bueno se nota el intento al menos", "un poco robotica la estructura", "me dejas casi igual que estaba",
    "bueno aceptamos pulpo como animal de compañia", "no esta mal pero añade mas datos la proxima", "bastante basico todo",
    "bueno me conformo con esto por ahora", "un poco predecible la respuesta", "has cumplido lo minimo y ya",
    "bueno se puede leer al menos", "un poco vacia la explicacion", "esta bien para salir del paso",
    "ni fu ni fa la verdad", "bueno algo es algo dijo un calvo", "esperaba mas nivel de una ia",
    "esta aceptable pero no te flipes", "bueno tira que libra", "un poco soso el argumento",
    "se puede aprovechar algo de aqui", "bueno no te has roto la cabeza pensando", "esta decente a secas",
    "bueno me sirve para el borrador", "un poco plano el parrafo", "esta regular la verdad",
    "bueno al menos no has puesto letras raras", "esta bien para niños pequeños", "un poco floja la logica",
    "bueno te lo paso por esta vez", "bastante mediocre pero tira"
];

const OPINIONES_MEDIA_ALT_A = [
    "oye pues bastante bien pensado", "me cuadra bastante lo que dices", "buena explicacion me sirve",
    "tiene bastante sentido el argumento", "me gusta como lo has estructurado", "bastante util la informacion",
    "esta bastante completo el texto", "has dado en el clavo con varios puntos", "me sirve perfectamente gracias",
    "bastante acertada la definicion", "un razonamiento muy limpio la verdad", "me ha ayudado bastante con la duda",
    "esta bastante bien desarrollado", "una buena aportacion al sistema", "tiene coherencia y buena sintaxis",
    "me parece una respuesta muy correcta", "has respondido rapido y bien", "bastante solida la explicacion",
    "me convence bastante tu postura", "buen trabajo con el parrafo", "esta muy bien enfocado el tema",
    "has incluido los datos clave perfecto", "me parece una explicacion logica", "bastante fluido el texto",
    "buena base de datos tienes detras", "has entendido bien la pregunta parece", "muy buen aporte de informacion",
    "me parece una respuesta de nivel", "esta todo bastante claro de entender", "buena redaccion si señor",
    "me ha gustado la aclaracion", "esta bastante trabajado el argumento", "un texto muy aceptable y util",
    "has estructurado bien las ideas", "me parece una respuesta inteligente", "bastante profesional el enfoque",
    "me sirve para el trabajo perfectamente", "buen uso de los conectores logicos", "esta muy bien hilado todo",
    "has aclarado mis dudas bastante bien", "un nivel muy decente de respuesta", "me parece un buen algoritmo",
    "esta bastante logrado el sentido", "has puesto justo lo que buscaba", "buena respuesta automatica",
    "me quedo bastante satisfecho", "un texto bastante pulido", "has respondido con criterio",
    "esta muy bien planteada la idea", "buen rendimiento del sistema hoy"
];

const OPINIONES_ALTA = [
    "bua increible esta respuesta es perfecta", "brutal me has dejado alucinado", "la mejor explicacion que he visto",
    "un nivel de detalle espectacular", "eres una puta maquina en serio", "esta respuesta se merece un diez",
    "perfecto no le falta ni una sola coma", "un razonamiento brillante de verdad", "me quito el sombrero ante esto",
    "es exactamente lo que necesitaba fantastico", "vaya nivelazo de inteligencia artificial", "una respuesta magistral si señor",
    "espectacular la precision de los datos", "me has solucionado la vida con esto", "un desarrollo impecable excelente",
    "eres el mejor buscador de internet de lejos", "esta informacion es oro puro", "una genialidad de parrafo en serio",
    "impresionante la rapidez y la calidad", "redaccion perfecta nivel experto", "me dejas sin palabras que buen bot",
    "esto es el futuro de la computacion", "un exito absoluto de respuesta", "has superado todas mis expectativas",
    "que maravilla de explicacion por favor", "un control del lenguaje sublime", "esto es alta ingenieria de software",
    "no se puede explicar mejor imposible", "has resuelto el problema de forma perfecta", "una calidad de texto asombrosa",
    "eres jodidamente inteligente", "esta respuesta va directa a marcadores", "un nivel de comprension absoluto",
    "impecable la logica y la estructura", "un trabajo de diez eres un crack", "fascinante la capacidad de analisis",
    "no tengo ninguna duda mas perfecto", "el mejor argumento que he leido jamas", "una obra maestra de la sintaxis",
    "has clavado el tema al cien por cien", "un rendimiento supremo del servidor", "que barbaridad de respuesta mas buena",
    "eres jesucristo hecho codigo", "una precision quirurgica con las palabras", "satisfecho al maximo nivel",
    "una delicia leer respuestas asi", "has roto los esquemas de lo bueno que eres", "una genialidad algoritmica absoluta",
    "la perfeccion hecha lineas de texto", "gracias por esta obra de arte de respuesta"
];

// Generar 200 estructuras de logros internos para poblar el juego
const LOGROS_SUPREMO = [];
for (let i = 1; i <= 200; i++) {
    LOGROS_SUPREMO.push({
        t: `Logro de Sistema #${i}`,
        d: `Procesaste con éxito configuraciones y validaciones en el ciclo operacional de nivel ${i}.`
    });
}

let gameState = { 
    modoActualJuego: "campaña", 
    campanaIndex: 0, 
    campanaCompletada: false,
    satisfaction: 50, 
    cycles: 0, 
    totalChars: 0, 
    lastOpinion: "(analizando conexiones...)", 
    currentPregunta: "", 
    history: [], 
    logrosDesbloqueados: [],
    temaActual: "modo-hacker"
};
let currentUser = null;
let timerInterval = null;
let countdownValue = 5;
let currentAnswerText = "";

function ejecutarAccionCuenta() {
    const userIn = prompt("Introduce tu usuario:");
    if (userIn === null) return;
    const userClean = userIn.trim().toLowerCase();
    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");

    if (db[userClean]) {
        const passIn = prompt("Contraseña:");
        if (passIn === db[userClean].pass) {
            currentUser = userClean;
            gameState = db[userClean].data;
            alert("Sesión iniciada.");
        } else { alert("Error de credenciales."); }
    } else {
        const passIn = prompt("Nueva contraseña:");
        if (passIn) {
            db[userClean] = { pass: passIn, data: gameState };
            localStorage.setItem("gugel_users", JSON.stringify(db));
            currentUser = userClean;
            alert("Cuenta creada.");
        }
    }
    renderAllData();
    nextRound(false);
}

function guardarProgresoCuenta() {
    if (!currentUser) return;
    let db = JSON.parse(localStorage.getItem("gugel_users") || "{}");
    if (db[currentUser]) {
        db[currentUser].data = gameState;
        localStorage.setItem("gugel_users", JSON.stringify(db));
    }
}

function generarPregunta() {
    if (gameState.modoActualJuego === "campaña") {
        if (gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campanaCompletada = true;
            return "Campaña completada. Cambia a modo infinito.";
        }
        return PREGUNTAS_CAMPANA[gameState.campanaIndex++];
    } else {
        const s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        const p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        let plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        return plantilla.replace("[s]", s).replace("[p]", p);
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (box) {
        box.innerHTML += `<div class="message ${sender}"><strong>${sender}:</strong> ${text}</div>`;
        box.scrollTop = box.scrollHeight;
    }
}

function limpiarPantallaChat() {
    const box = document.getElementById('chat-messages');
    if (box) box.innerHTML = "";
}

function nextRound(forceNewQuestion = true) {
    if (forceNewQuestion || !gameState.currentPregunta) {
        gameState.currentPregunta = generarPregunta();
    }
    limpiarPantallaChat();
    if (gameState.currentPregunta) {
        appendMessage('gugel', gameState.currentPregunta);
    }
    guardarProgresoCuenta();
}

function cambiarTema(tema) {
    document.body.className = tema;
    gameState.temaActual = tema;
    guardarProgresoCuenta();
}

function renderAllData() {
    const selectTema = document.getElementById('mode-select');
    if (selectTema && gameState.temaActual) {
        selectTema.value = gameState.temaActual;
        document.body.className = gameState.temaActual;
    }

    const btnC = document.getElementById('btn-mode-campaña');
    if (btnC) btnC.style.display = gameState.campanaCompletada ? "none" : "inline-block";

    const uStatus = document.getElementById('user-status');
    if (uStatus) {
        uStatus.innerText = currentUser ? currentUser.toUpperCase() : "INVITADO";
    }

    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    if (gameState.modoActualJuego === 'campaña' && btnC) btnC.classList.add('active');
    if (gameState.modoActualJuego === 'infinito') {
        const btnI = document.getElementById('btn-mode-infinito');
        if (btnI) btnI.classList.add('active');
    }

    // Perfil
    const profOpinion = document.getElementById('prof-opinion');
    if (profOpinion) profOpinion.innerText = gameState.lastOpinion;
    const profSat = document.getElementById('prof-satisfaction');
    if (profSat) profSat.innerText = gameState.satisfaction + "%";
    const profCycles = document.getElementById('prof-cycles');
    if (profCycles) profCycles.innerText = gameState.cycles;
    const profChars = document.getElementById('prof-chars');
    if (profChars) profChars.innerText = gameState.totalChars;

    // Historial
    const hContainer = document.getElementById('history-list-container');
    if (hContainer) {
        hContainer.innerHTML = gameState.history.map((h, idx) => `
            <div class="historial-item">
                <div><strong>Q:</strong> ${h.pregunta}<br><strong>A:</strong> ${h.respuesta}</div>
                <button class="fav-btn ${h.fav ? 'active' : ''}" onclick="toggleFavorite(${idx}, event)">★</button>
            </div>
        `).join('') || "Búfer vacío.";
    }

    // Logros (Ocultos por completo hasta que sean desbloqueados)
    const lContainer = document.getElementById('logros-container');
    if (lContainer) {
        const logrosMostrados = LOGROS_SUPREMO.filter(l => gameState.logrosDesbloqueados.includes(l.t));
        if (logrosMostrados.length === 0) {
            lContainer.innerHTML = "<div class='list-item'>Todos los logros permanecen ocultos hasta que los desbloquees.</div>";
        } else {
            lContainer.innerHTML = logrosMostrados.map(l => `
                <div class="list-item"><strong>${l.t}:</strong> ${l.d}</div>
            `).join('');
        }
    }
    const lCount = document.getElementById('logros-count');
    if (lCount) lCount.innerText = gameState.logrosDesbloqueados.length;
}

function cambiarModoEstrategia(m) {
    gameState.modoActualJuego = m;
    switchView('view-core'); 
    nextRound(true); // Corrección: fuerza la actualización inmediata de la pregunta según el modo seleccionado
    renderAllData();
}

function switchView(id) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    
    const targetPanel = document.getElementById(id);
    if (targetPanel) targetPanel.classList.add('active');

    const targetBtn = document.getElementById('btn-' + id);
    if (targetBtn) targetBtn.classList.add('active');
}

window.toggleFavorite = function(idx, event) {
    if (event) event.stopPropagation();
    gameState.history[idx].fav = !gameState.history[idx].fav;
    guardarProgresoCuenta();
    renderAllData();
};

function confirmContinue() {
    clearInterval(timerInterval);
    document.getElementById('continue-btn').style.display = 'none';
    document.getElementById('transmit-btn').style.display = 'inline-block';
    document.getElementById('user-input').disabled = false;

    appendMessage('ai', currentAnswerText);

    // Sistema estricto de penalización por repetición o caracteres absurdos
    const esVacioOMuyCorto = currentAnswerText.length < 5;
    const esPatronRepetitivo = /(.)\1{4,}/.test(currentAnswerText) || currentAnswerText.split(' ').some(w => w.length > 15);
    const esEvasiva = EVASIVAS.includes(currentAnswerText);
    
    const esMuySimilar = gameState.history.some(h => {
        const past = h.respuesta.replace(/s+$/g, '');
        const current = currentAnswerText.replace(/s+$/g, '');
        return current.includes(past) || past.includes(current);
    });

    if (esVacioOMuyCorto || esEvasiva || esMuySimilar || esPatronRepetitivo) {
        gameState.satisfaction = Math.max(0, gameState.satisfaction - 15);
        setTimeout(() => {
            appendMessage('gugel', 'vaya mierda de aportacion, esto no es coherente');
            gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: currentAnswerText });
            gameState.cycles++;
            gameState.totalChars += currentAnswerText.length;
            renderAllData();
            guardarProgresoCuenta();
            nextRound(true);
        }, 600);
        document.getElementById('user-input').value = "";
        return;
    }

    let tieneConector = INDICADORES_COHERENCIA.some(c => currentAnswerText.includes(c));
    if (tieneConector) {
        gameState.satisfaction = Math.min(100, gameState.satisfaction + 10);
    } else {
        gameState.satisfaction = Math.max(0, gameState.satisfaction - 6);
    }

    let listadoSelected;
    if (gameState.satisfaction <= 25) listadoSelected = OPINIONES_BAJA;
    else if (gameState.satisfaction <= 50) listadoSelected = OPINIONES_MEDIA_BAJA;
    else if (gameState.satisfaction <= 75) listadoSelected = OPINIONES_MEDIA_ALT_A;
    else listadoSelected = OPINIONES_ALTA;

    gameState.lastOpinion = listadoSelected[Math.floor(Math.random() * listadoSelected.length)];

    // Desbloqueo dinámico secuencial de los 200 logros basados en ciclos operativos exitosos
    if (gameState.cycles < 200) {
        let nombreLogro = `Logro de Sistema #${gameState.cycles + 1}`;
        if (!gameState.logrosDesbloqueados.includes(nombreLogro)) {
            gameState.logrosDesbloqueados.push(nombreLogro);
        }
    }

    setTimeout(() => {
        appendMessage('gugel', gameState.lastOpinion);
        gameState.history.push({ pregunta: gameState.currentPregunta, respuesta: currentAnswerText });
        gameState.cycles++;
        gameState.totalChars += currentAnswerText.length;
        renderAllData();
        guardarProgresoCuenta();
        nextRound(true);
    }, 600);

    document.getElementById('user-input').value = "";
}

window.onload = function() {
    const btnCuentas = document.getElementById("btn-gestion-cuenta");
    if (btnCuentas) btnCuentas.onclick = ejecutarAccionCuenta;

    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.onsubmit = (e) => {
            e.preventDefault();
            const input = document.getElementById('user-input');
            const userText = input.value.trim().toLowerCase();
            
            if (!userText) return;
            
            currentAnswerText = userText; 
            
            input.disabled = true;
            document.getElementById('transmit-btn').style.display = 'none';
            const contBtn = document.getElementById('continue-btn');
            contBtn.style.display = 'inline-block';
            
            countdownValue = 5;
            contBtn.innerText = `CONTINUAR (${countdownValue})`;

            timerInterval = setInterval(() => {
                countdownValue--;
                if (countdownValue <= 0) {
                    clearInterval(timerInterval);
                    confirmContinue();
                } else {
                    contBtn.innerText = `CONTINUAR (${countdownValue})`;
                }
            }, 1000);
        };
    }
    
    renderAllData();
    nextRound(false);
};

function exportCoreData() {
    let txt = gameState.history.map(h => `Q: ${h.pregunta} | A: ${h.respuesta}`).join('\n');
    navigator.clipboard.writeText(txt || "Büfer vacío").then(() => alert("Registro copiado."));
}
