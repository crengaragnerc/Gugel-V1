const PREGUNTAS_CAMPANA = [
    "cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque",
    "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco",
    "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"
];

const INFINITO_SUJETOS = ["gato", "perro vecino", "gato callejero", "pantalla pc", "espejo cuarto", "plastilina azul", "teclado usb", "conexion fibra", "raton optico"];
const INFINITO_PREDICADOS = ["mira fijo raro", "duerme encima router caliente", "maulla pared vacia", "morder cable teclado", "conduce electricidad", "parpadea sin parar", "da calambre"];
const PLANTILLAS_PREGUNTAS = ["¿por qué [s] [p]?", "¿es normal que [s] [p]?", "¿cómo explicas que [s] [p]?", "¿qué sucede cuando [s] [p]?", "¿me dices por qué [s] [p]?"];

const INDICADORES_COHERENCIA = ["porque", "ya que", "debido a", "por eso", "entonces", "significa", "pasa que", "es por", "como", "cuando"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

// 200 Reacciones exactas divididas en 4 niveles de satisfacción
const REACCIONES_MUY_MALAS = [
    "Respuesta completamente inútil.", "No resuelve mi consulta en absoluto.", "Información falsa o inventada.", "Falta total de coherencia.", "No entiendo qué intentas explicar.", "Esto no tiene sentido.", "Pérdida de tiempo absoluta.", "El algoritmo está fallando.", "Respuesta fuera de contexto.", "Resultados no válidos.", "Sintaxis incomprensible.", "No responde a la pregunta.", "Datos erróneos.", "Decepción total con el buscador.", "Texto ilegible o mal estructurado.", "Cero utilidad práctica.", "Nivel de precisión deficiente.", "Incoherencia detectada en el texto.", "No me sirve para nada.", "Voy a usar otro buscador.", "Respuesta automatizada sin lógica.", "Falta de comprensión lectora de la IA.", "Argumento nulo.", "No aporta ningún valor.", "Desastre de información.", "Explicación vacía.", "Resultados irrelevantes.", "No coincide con lo que busco.", "Esto es basura computacional.", "Respuesta descartada.", "Fallo crítico en la respuesta.", "Incomprensión total del tema.", "No procesa bien la información.", "Explicación absurda.", "Respuesta totalmente descartable.", "Baja calidad en los datos proporcionados.", "Totalmente incorrecto.", "No tiene ninguna relación con mi búsqueda.", "Esquema de respuesta ilógico.", "Fallo en la extracción de datos.", "Mala ejecución de la búsqueda.", "Conclusión errónea.", "Falta de precisión evidente.", "No es una respuesta válida.", "Texto generado sin sentido alguno.", "Nula capacidad de deducción.", "Respuesta inservible.", "Datos no confirmados.", "Información inútil y confusa.", "Error de procesamiento evidente."
];

const REACCIONES_MALAS = [
    "Falta información clave.", "Respuesta incompleta.", "Podría ser mucho más preciso.", "Datos insuficientes.", "Explicación superficial.", "No entra en detalles necesarios.", "Se queda a medias.", "Argumento débil.", "Le falta profundidad.", "No es del todo incorrecto, pero no sirve.", "Respuesta demasiado genérica.", "Le falta contexto adicional.", "Información muy básica.", "No cubre todas las variables.", "Explicación pobre.", "Redacción mejorable.", "No soluciona el problema de raíz.", "Datos correctos pero mal explicados.", "Falta desarrollo en la idea.", "Poca utilidad práctica.", "Respuesta estándar aburrida.", "No aporta nada nuevo.", "Información ya conocida.", "Falta de especificidad.", "Se desvía ligeramente del tema.", "No responde de forma directa.", "Explicación difusa.", "Estructura de respuesta confusa.", "Faltan ejemplos prácticos.", "No concluye de forma clara.", "Demasiado texto para poca información.", "Falta concisión.", "No aborda el punto principal directamente.", "Leve desvío del tema consultado.", "Información poco relevante.", "No profundiza en absoluto.", "Falta de rigor técnico.", "Respuesta aceptable pero deficiente.", "Falta exactitud.", "No resuelve la duda principal.", "Respuesta ambigua.", "Datos no concluyentes.", "Le falta seguridad en la respuesta.", "Información sesgada o parcial.", "No cumple con las expectativas.", "Resolución insatisfactoria.", "Falta claridad en la exposición.", "No es lo que esperaba leer.", "Desarrollo argumental pobre.", "Explicación insuficiente."
];

const REACCIONES_BUENAS = [
    "Respuesta aceptable.", "Información útil.", "Bien explicado.", "Me sirve la información proporcionada.", "Datos correctos y verificables.", "Buena estructura de respuesta.", "Responde a la pregunta principal.", "Información clara.", "Contexto adecuado.", "Explicación lógica.", "Buen nivel de detalle.", "Cumple su función.", "Respuesta satisfactoria.", "Información directa al punto.", "Buen uso de la sintaxis.", "Razonamiento correcto.", "Conclusión acertada.", "Aporta los datos necesarios.", "Buena capacidad de síntesis.", "Información relevante.", "Me ayuda a resolver la duda.", "Respuesta coherente.", "Buen rendimiento del algoritmo.", "Explicación fácil de entender.", "Datos precisos.", "Respuesta válida.", "Información de calidad estándar.", "Buen enfoque del problema.", "Resolución adecuada.", "Explicación técnica correcta.", "Datos fiables.", "Buen nivel de respuesta.", "Satisface mi consulta.", "Información bien procesada.", "Respuesta estructurada correctamente.", "Aporta soluciones viables.", "Buena redacción.", "Información bien clasificada.", "Resultados positivos.", "Búsqueda exitosa.", "Datos de interés.", "Respuesta competente.", "Buen análisis de la información.", "Explicación razonable.", "Información objetiva.", "Respuesta equilibrada.", "Datos confirmados.", "Buen soporte de información.", "Explicación funcional.", "Cumple con los parámetros de búsqueda."
];

const REACCIONES_MUY_BUENAS = [
    "Respuesta perfecta.", "Exactamente lo que buscaba.", "Información muy detallada y correcta.", "Excelente nivel de precisión.", "Explicación magistral.", "Resolución impecable.", "Datos exhaustivos y precisos.", "Máxima utilidad demostrada.", "Rendimiento óptimo del sistema.", "Respuesta de alta calidad.", "Análisis profundo y certero.", "Estructura de información impecable.", "Razonamiento avanzado.", "Claridad absoluta en la exposición.", "Información inmejorable.", "Solución definitiva a la consulta.", "Excelente capacidad de deducción.", "Resultados sobresalientes.", "Precisión milimétrica.", "Explicación técnica perfecta.", "Datos altamente relevantes.", "Máxima eficiencia en la respuesta.", "Calidad de redacción excepcional.", "Argumento irrefutable.", "Información de valor incalculable.", "Resolución superior a la esperada.", "Excelencia en el procesamiento de datos.", "Máxima satisfacción con la respuesta.", "Nivel de detalle extraordinario.", "Explicación definitiva.", "Datos perfectamente organizados.", "Respuesta insuperable.", "Rigor técnico absoluto.", "Información vital encontrada.", "Resolución maestra.", "Análisis impecable del contexto.", "Datos sumamente valiosos.", "Respuesta brillante.", "Excelente uso de la lógica.", "Información concluyente y exacta.", "Solución óptima proporcionada.", "Máximo acierto en la búsqueda.", "Explicación detallada y clara.", "Datos verificados y exactos.", "Respuesta altamente competente.", "Información de máxima prioridad correcta.", "Resolución experta.", "Análisis de datos perfecto.", "Respuesta definitiva y correcta.", "Excelente ejecución del algoritmo."
];

// Generación de 200 logros
const LOGROS_SISTEMA = [];
for (let i = 1; i <= 200; i++) {
    LOGROS_SISTEMA.push({
        id: `logro_${i}`,
        titulo: `Nivel de Operación ${i}`,
        desc: `Ciclo de transmisión completado con éxito en la iteración ${i}.`
    });
}

let gameState = { 
    modoActualJuego: "campaña", 
    campanaIndex: 0, 
    campanaCompletada: false,
    satisfaction: 50, 
    cycles: 0, 
    totalChars: 0, 
    lastOpinion: "Esperando datos...", 
    currentPregunta: "", 
    history: [], 
    logrosDesbloqueados: [],
    temaActual: "modo-hacker"
};
let currentUser = null;
let timerInterval = null;
let countdownValue = 5;
let currentAnswerText = "";

function iniciarSesion() {
    const userIn = prompt("Identificador de usuario:");
    if (!userIn) return;
    const userClean = userIn.trim().toLowerCase();
    let db = JSON.parse(localStorage.getItem("gugel_db") || "{}");

    if (db[userClean]) {
        const passIn = prompt("Clave de acceso:");
        if (passIn === db[userClean].pass) {
            currentUser = userClean;
            gameState = db[userClean].data;
            alert("Acceso concedido.");
        } else { alert("Credenciales inválidas."); }
    } else {
        const passIn = prompt("Crear nueva clave de acceso:");
        if (passIn) {
            db[userClean] = { pass: passIn, data: gameState };
            localStorage.setItem("gugel_db", JSON.stringify(db));
            currentUser = userClean;
            alert("Usuario registrado.");
        }
    }
    renderAllData();
    if (!gameState.currentPregunta) nextRound(true);
}

function guardarDatos() {
    if (!currentUser) return;
    let db = JSON.parse(localStorage.getItem("gugel_db") || "{}");
    if (db[currentUser]) {
        db[currentUser].data = gameState;
        localStorage.setItem("gugel_db", JSON.stringify(db));
    }
}

function generarPregunta() {
    if (gameState.modoActualJuego === "campaña") {
        if (gameState.campanaIndex >= PREGUNTAS_CAMPANA.length) {
            gameState.campanaCompletada = true;
            gameState.modoActualJuego = "infinito"; // Auto-cambio interno
            return generarPregunta(); // Llamada recursiva para obtener la primera del infinito
        }
        return PREGUNTAS_CAMPANA[gameState.campanaIndex++];
    } else {
        const s = INFINITO_SUJETOS[Math.floor(Math.random() * INFINITO_SUJETOS.length)];
        const p = INFINITO_PREDICADOS[Math.floor(Math.random() * INFINITO_PREDICADOS.length)];
        const plantilla = PLANTILLAS_PREGUNTAS[Math.floor(Math.random() * PLANTILLAS_PREGUNTAS.length)];
        return plantilla.replace("[s]", s).replace("[p]", p);
    }
}

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    if (box) {
        box.innerHTML += `<div class="message ${sender}"><strong>${sender.toUpperCase()}:</strong> ${text}</div>`;
        box.scrollTop = box.scrollHeight;
    }
}

function limpiarChat() {
    const box = document.getElementById('chat-messages');
    if (box) box.innerHTML = "";
}

function nextRound(forzarNueva = false) {
    if (forzarNueva || !gameState.currentPregunta) {
        gameState.currentPregunta = generarPregunta();
    }
    limpiarChat();
    appendMessage('gugel', gameState.currentPregunta);
    guardarDatos();
}

function cambiarTema(tema) {
    document.body.className = tema;
    gameState.temaActual = tema;
    guardarDatos();
}

function cambiarModoEstrategia(modo) {
    if (modo === "campaña" && gameState.campanaCompletada) return; // Bloqueo de campaña completada
    
    gameState.modoActualJuego = modo;
    gameState.currentPregunta = ""; // Limpieza estricta de la pregunta anterior
    switchView('view-core');
    nextRound(true); // Generar nueva pregunta obligatoria del modo seleccionado
    renderAllData();
}

function renderAllData() {
    const selectTema = document.getElementById('mode-select');
    if (selectTema) selectTema.value = gameState.temaActual;
    document.body.className = gameState.temaActual;

    const btnCampaña = document.getElementById('btn-mode-campana');
    if (btnCampaña) {
        if (gameState.campanaCompletada) {
            btnCampaña.style.opacity = "0.3";
            btnCampaña.style.cursor = "not-allowed";
        } else {
            btnCampaña.style.opacity = "1";
            btnCampaña.style.cursor = "pointer";
        }
    }

    const uStatus = document.getElementById('user-status');
    if (uStatus) uStatus.innerText = currentUser ? currentUser.toUpperCase() : "INVITADO";

    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    if (gameState.modoActualJuego === 'campaña' && !gameState.campanaCompletada && btnCampaña) btnCampaña.classList.add('active');
    if (gameState.modoActualJuego === 'infinito') document.getElementById('btn-mode-infinito').classList.add('active');

    document.getElementById('prof-opinion').innerText = gameState.lastOpinion;
    document.getElementById('prof-satisfaction').innerText = gameState.satisfaction + "%";
    document.getElementById('prof-cycles').innerText = gameState.cycles;
    document.getElementById('prof-chars').innerText = gameState.totalChars;

    const hContainer = document.getElementById('history-list-container');
    if (hContainer) {
        hContainer.innerHTML = gameState.history.map((h, idx) => `
            <div class="historial-item" onclick="verChatCompleto(${idx})">
                <strong>Ciclo ${idx + 1}:</strong> ${h.pregunta}
            </div>
        `).join('') || "Registro vacío.";
    }

    const lContainer = document.getElementById('logros-container');
    if (lContainer) {
        const desbloqueados = LOGROS_SISTEMA.filter(l => gameState.logrosDesbloqueados.includes(l.id));
        if (desbloqueados.length === 0) {
            lContainer.innerHTML = "<div class='list-item'>No hay logros desbloqueados.</div>";
        } else {
            lContainer.innerHTML = desbloqueados.map(l => `
                <div class="list-item"><strong>${l.titulo}:</strong> ${l.desc}</div>
            `).join('');
        }
        document.getElementById('logros-count').innerText = desbloqueados.length;
    }
}

function switchView(id) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('btn-' + id).classList.add('active');
}

window.verChatCompleto = function(idx) {
    const h = gameState.history[idx];
    alert(`REGISTRO DE CICLO ${idx + 1}\n\nPREGUNTA DE GUGEL:\n${h.pregunta}\n\nRESPUESTA TRANSMITIDA:\n${h.respuesta}\n\nEVALUACIÓN DEL USUARIO:\n${h.reaccion}`);
};

function confirmContinue() {
    clearInterval(timerInterval);
    document.getElementById('continue-btn').style.display = 'none';
    document.getElementById('transmit-btn').style.display = 'inline-block';
    document.getElementById('user-input').disabled = false;

    appendMessage('ai', currentAnswerText);

    // Sistema de validación de entradas
    const esCorto = currentAnswerText.length < 3;
    const esEvasiva = EVASIVAS.includes(currentAnswerText);
    
    // Penalización estricta por letras repetidas o palabras duplicadas masivas
    const palabras = currentAnswerText.split(' ');
    const esSpamRepetitivo = /([a-zA-Z])\1{4,}/.test(currentAnswerText) || 
                             (palabras.length > 3 && palabras.every(w => w === palabras[0]));

    if (esSpamRepetitivo) {
        gameState.satisfaction = Math.max(0, gameState.satisfaction - 15);
        finalizarTurno("Entrada rechazada. Patrón repetitivo anómalo detectado por el sistema.");
        return;
    }

    if (esCorto || esEvasiva) {
        gameState.satisfaction = Math.max(0, gameState.satisfaction - 10);
        finalizarTurno(REACCIONES_MUY_MALAS[Math.floor(Math.random() * REACCIONES_MUY_MALAS.length)]);
        return;
    }

    let tieneConector = INDICADORES_COHERENCIA.some(c => currentAnswerText.includes(c));
    if (tieneConector) {
        gameState.satisfaction = Math.min(100, gameState.satisfaction + 10);
    } else {
        gameState.satisfaction = Math.max(0, gameState.satisfaction - 5);
    }

    let arrayReacciones;
    if (gameState.satisfaction <= 25) arrayReacciones = REACCIONES_MUY_MALAS;
    else if (gameState.satisfaction <= 50) arrayReacciones = REACCIONES_MALAS;
    else if (gameState.satisfaction <= 75) arrayReacciones = REACCIONES_BUENAS;
    else arrayReacciones = REACCIONES_MUY_BUENAS;

    const opinionFinal = arrayReacciones[Math.floor(Math.random() * arrayReacciones.length)];
    finalizarTurno(opinionFinal);
}

function finalizarTurno(reaccion) {
    gameState.lastOpinion = reaccion;
    
    if (gameState.cycles < 200) {
        const nextLogro = LOGROS_SISTEMA[gameState.cycles].id;
        if (!gameState.logrosDesbloqueados.includes(nextLogro)) {
            gameState.logrosDesbloqueados.push(nextLogro);
        }
    }

    setTimeout(() => {
        appendMessage('gugel', reaccion);
        gameState.history.push({ 
            pregunta: gameState.currentPregunta, 
            respuesta: currentAnswerText,
            reaccion: reaccion
        });
        gameState.cycles++;
        gameState.totalChars += currentAnswerText.length;
        renderAllData();
        guardarDatos();
        nextRound(true);
    }, 600);

    document.getElementById('user-input').value = "";
}

window.onload = function() {
    document.getElementById("btn-gestion-cuenta").onclick = iniciarSesion;

    document.getElementById('chat-form').onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('user-input');
        currentAnswerText = input.value.trim().toLowerCase();
        
        if (!currentAnswerText) return;
        
        input.disabled = true;
        document.getElementById('transmit-btn').style.display = 'none';
        const contBtn = document.getElementById('continue-btn');
        contBtn.style.display = 'inline-block';
        
        countdownValue = 5;
        contBtn.innerText = `PROCESANDO (${countdownValue})`;

        timerInterval = setInterval(() => {
            countdownValue--;
            if (countdownValue <= 0) confirmContinue();
            else contBtn.innerText = `PROCESANDO (${countdownValue})`;
        }, 1000);
    };
    
    renderAllData();
    nextRound(false);
};

window.exportCoreData = function() {
    let txt = gameState.history.map(h => `Q: ${h.pregunta}\nA: ${h.respuesta}\nR: ${h.reaccion}\n---`).join('\n');
    navigator.clipboard.writeText(txt || "Búfer vacío").then(() => alert("Registros copiados al portapapeles."));
};
