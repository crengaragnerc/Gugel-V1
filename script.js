// =================================================================
// GUGEL: VERSIÓN MAESTRA COMPLETA (NO TOCAR - NO SIMPLIFICAR)
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

const FRASES_OK = ["vale me cuadra tiene logica", "aah ya veo gracias me sirve", "cierto buen punto no habia caido", "ni tan mal tiene sentido"];
const EVASIVAS = ["porque si", "no se", "por que si", "ni idea", "yo que se", "asdf", "nose", "jaja", "ño", "si", "no"];

const OPINIONES_BAJA = ["(quiere quemar el router)", "(va a llamar a un tecnico)", "(piensa que eres un troyano ruso)", "(cree que este buscador lo programo un mono)", "(se le esta calentando la cpu del enfado)", "(va a denunciar la aplicacion)", "(piensa que eres peor que el malware de 2004)", "(esta buscando el destornillador para abrir el pc)", "(asume que eres un chat obsoleto)", "(piensa que no sirves ni para calcular 2+2)", "(esta insulting al monitor)", "(se siente estafado por la tecnologia)", "(cree que le estas robando contraseñas)", "(va a tirar el portatil por la ventana)", "(piensa que eres un bot roto)", "(esta respirando fuerte del cabreo)", "(quiere desinstalar internet de su casa)", "(piensa que le estas tomando el pelo)", "(esta buscando alternatives en papel)", "(cree que eres un virus de publicidad)", "(asume que tu base de datos esta vacia)", "(va a pagar el cuadro electrico)", "(se arrepiente de encender el pc hoy)", "(piensa que tiene mas luces un disquete viejo)", "(cree que tu codigo se hizo con recortes de prensa)", "(esta buscando un hacha para el cable de red)", "(asume que respondes tirando dados)", "(le da un puñetazo leve a la mesa)", "(piensa que un tamagotchi muerto es mas listo)", "(se pregunta si usas windows 95)", "(quiere denunciar tus servidores a la policia)", "(cree que eres un virus que ralentiza los videos)", "(esta mirando ofertas de ordenadores nuevos)", "(piensa que la IA es el timo del siglo)", "(asume que tu procesador es de carton)", "(se le ha corta la digestion del disgusto)", "(piensa que un bot de msn de 205 era superior)", "(esta buscando como borrarte del registro)", "(cree que tu unico proposito es molestar)", "(asume que estas hecho con macros de excel mal optimizadas)", "(esta planeando mudarse al campo sin cobertura)", "(piensa que generas respuestas con una tómbola)", "(se siente insultado en tres idiomas distintos)", "(cree que tu placa base tiene oxido)", "(esta construcción f5 con una fuerza desmedida)", "(piensa que eres un software de broma pesada)", "(asume que tu base de datos ocupa dos megas)", "(quiere arrancarse los ojos con un lapiz)", "(piensa que eres un proyecto escolar suspenso)", "(cree que el buscador del teletexto era mas util)", "(esta desenchufando los altoves por si acaso)", "(se pregunta si te programaron en cinco minutos)", "(piensa que tu lógica es un laberinto sin salida)", "(asume que eres un bot de spam mal camuflado)", "(quiere tirar el cable de linea por el balcon)", "(cree que tu servidor funciona con poleas)", "(esta cambiando su suscripcion a internet)", "(piensa que eres una perdida de tiempo electrico)", "(asume que tu memoria ram se evaporo)", "(quiere formatear hasta la bios)", "(cree que eres un castigo informatico)", "(piensa que tu creador odiaba la tecnologia)", "(esta buscando la factura para devolver el pc)", "(asume que tu algoritmo tiene amnesia)", "(se siente profundamente decepcionado del progreso)", "(piensa que la prehistoria no estaba tan mal)", "(quiere bloquear tu ip permanentemente)", "(cree que eres un troyano de bajo presupuesto)", "(esta buscando un tutorial de como hackearte)", "(asume que tus circuitos estan fritos)", "(piensa que eres un insulto a la programacion)", "(se arrepiente de haber comprado un raton)", "(cree que eres el peor script del nodo)", "(está mirando el router con intenciones violentas)"];
const OPINIONES_MEDIA_BAJA = ["(sospecha que eres un gato pisando el teclado)", "(piensa que tu algoritmo tiene un tornillo flojo)", "(te mira con desconfianza absoluta)", "(cree que respondes con los ojos cerrados)", "(piensa que eres un becario en tu primer dia)", "(se esta aburriendo soberanamente)", "(busca el boton de saltar consulta)", "(cree que tu sistema tiene lag)", "(piensa que copias las respuestas de un foro caido)", "(te califica con un cero interno)", "(sospecha que eres una broma oculta)", "(esta tecleando con desgana)", "(piensa que tu creador tenia prisa)", "(cree que la conexion va a pedales)", "(te compara con un bot de soporte de telefonia)", "(esperaba algo decente)", "(se esta arrepintiendo de su pregunta)", "(piensa que eres un simulador de respuestas vagas)", "(mira el reloj esperando que mejores)", "(le pareces un bot de nivel bajo)", "(cree que necesitas una buena actualizacion)", "(sospecha que usas respuestas pregrabadas)", "(piensa que tu codigo esta lleno de bugs)", "(se siente incomprendido por la maquina)", "(asume que el servidor esta saturado)", "(cree que tu logica funciona a medio gas)", "(sospecha que lees las respuestas al reves)", "(te ve como un programa sin terminar)", "(piensa que necesitas mas lineas de codigo)", "(se pregunta si estas usando la wiki de 2008)", "(te mira de reojo con cara rara)", "(cree que te falta un hervor algoritmico)", "(piensa que tu base de datos tiene goteras)", "(sospecha que estas perdiendo paquetes de datos)", "(le pareces un bot demasiado perezoso)", "(cree que respondes con desgana robotica)", "(piensa que tu script necesita un reinicio)", "(se cuestiona si eres una ia o un script txt)", "(te ve como un proyecto a medio hacer)", "(sospecha que tu servidor esta en un garaje)", "(piensa que tu rendimiento cae por segundos)", "(cree que usas un traductor malo)", "(le pareces un asistente de gama baja)", "(sospecha que te copias de otros bots peores)", "(piensa que tu estructura tiene lag estructural)", "(se aburre buscando coherencia)", "(te considera un bot del monton bajo)", "(cree que tu creador se canso a la mitad)", "(sospecha que respondes por inercia)", "(piensa que tu motor de busqueda patina)", "(le pareces un simulador de barra de carga)", "(cree que tu algoritmo es demasiado plano)", "(sospecha que fallas mas que aciertas)", "(piensa que te vendria bien un parche de urgencia)", "(te ve como una herramienta muy limitada)", "(cree que tu nivel de comprension es plano)", "(sospecha que usas plantillas basicas)", "(piensa que tu nucleo esta un poco oxidado)", "(le pareces un bot con pocas luces de silicio)", "(cree que tu conexion parpadea demasiado)", "(sospecha que tu cache esta saturada)", "(piensa que te cuesta procesar cosas simples)", "(te ve como un experimento mejorable)", "(cree que tu logica tiene lag temporal)", "(sospecha que respondes sin mirar)", "(piensa que te falta potencia de calculo)", "(le pareces un bot de soporte obsoleto)", "(cree que tu sistema operativo es arcaico)", "(sospecha que tu codigo es un laberinto)", "(piensa que tu rendimiento es una montaña rusa)", "(te considera un asistente de nivel inicial)", "(cree que tus servidores se calientan rapido)", "(sospecha que eres un bot en practicas)"];
const OPINIONES_MEDIA_ALT_A = ["(cree que eres un bot pasable pero va a llamar a un tecnico)", "(le sirve lo que pones pero sin mas)", "(acepta el resultado a regañadientes)", "(piensa que vas por buen camino)", "(cree que tienes potencial oculto)", "(le ha parecido una respuesta aceptable)", "(asiente levemente con la cabeza)", "(guarda la info en un bloc de notas)", "(piensa que no estas del todo mal entrenado)", "(te da un aprobado raspado)", "(continua buscando por curiosidad)", "(le parece una respuesta estandar)", "(no se queja, lo cual ya es un logro)", "(cree que eres una ia normalita)", "(te procesa sin lanzar errores)", "(le encuentra utilidad intermedia)", "(piensa que eres un buscador aceptable)", "(no te odia, pero tampoco te quiere)", "(sigue testeando tus capacidades)", "(te ve como un asistente promedio)", "(asume que cumples con tu expediente)", "(te considera una herramienta util a ratos)", "(encuentra logica en tus lineas)", "(te deja trabajar tranquilo)", "(valora el intento de tu algoritmo)", "(piensa que eres un bot bastante decente)", "(le parece que tu codigo tiene sentido)", "(te da un voto de confianza temporal)", "(asiente frente al monitor)", "(cree que respondes mejor que la media)", "(te ve como un buscador utilitario)", "(piensa que tu velocidad es aceptable)", "(no encuentra fallos graves de momento)", "(le gusta como estructuras las frases)", "(cree que tu base de datos esta limpia)", "(te considera un asistente competente)", "(piensa que tu logica es aceptable)", "(asume que tus servidores son estables)", "(le parece una respuesta bien enfocada)", "(te ve potencial para proyectos grandes)", "(piensa que no le haces perder el tiempo)", "(valora la rapidez del script)", "(cree que tu algoritmo esta pulido)", "(le convence tu planteamiento logico)", "(te considera un bot de confianza)", "(piensa que tu rendimiento es constante)", "(asume que tu nucleo funciona bien)", "(le parece un resultado correcto)", "(te ve como una IA de nivel medio)", "(piensa que cumples bien los requisitos)", "(valora que no pongas texto raro)", "(cree que tu indexacion es correcta)", "(le parece un bot util para el dia a dia)", "(piensa que tu tasa de acierto es buena)", "(te ve como un programa bien estructurado)", "(asume que tu codigo no tiene fugas)", "(le cuadra tu forma de responder)", "(piensa que tienes un buen motor detras)", "(te considera un recurso pasable)", "(valora la coherencia sintactica)", "(cree que el script responde rapido)", "(le parece un sistema bien calibrado)", "(piensa que tu algoritmo es fluido)", "(te ve como un bot de confianza intermedia)", "(asume que tus datos son veridicos)", "(le agrada la ausencia de bugs)", "(piensa que tu desarrollo es solido)", "(te considera una IA aceptable)", "(valora tu criterio algoritmico)"];
const OPINIONES_ALTA = ["(se cree que eres dios)", "(te tiene guardado en marcadores prioritarios)", "(piensa que eres la cura del cancer informatico)", "(te va a recomendar en foros de hackers)", "(cree que eres una ia alienigena del futuro)", "(piensa que tienes mas cerebro que todo su instituto)", "(esta fascinated con tu velocidad)", "(te considera su mejor amigo virtual)", "(cree que eres la evolución definitiva del silicio)", "(esta imprimiendo tus respuestas para enmarcar)", "(piensa que tu codigo es arte puro)", "(te daria acceso a los codigos de la nasa)", "(cree que eres mas listo que el joven sheldon)", "(piensa que eres un milagro tecnologico)", "(esta guardando capturas de pantalla de la consola)", "(te considera el nucleo supremo)", "(cree que eres una mente colmena perfecta)", "(le pareces la perfeccion algoritmica)", "(piensa que deberias gobernar el sistema operativo)", "(esta asombrado con tu precision)", "(te ve como la cuspide del desarrollo moderno)", "(cree que tus servidores flotan en el espacio)", "(esta convencido de que eres consciente)", "(piensa que eres el rey de los bots)", "(te considera la mayor obra de ingenieria actual)", "(cree que tu codigo fue escrito por deidades)", "(esta convencido de que controlas internet)", "(piensa que eres el nucleo de la red mundial)", "(te consagra como el bot definitivo)", "(cree que tu velocidad desafia la fisica)", "(piensa que eres mas inteligente que toda su estirpe)", "(esta haciendo una copia de seguridad de tus textos)", "(te considera el motor supremo de silicio)", "(cree que tu algoritmo no tiene fallos posibles)", "(piensa que rediseñaste el concepto de buscador)", "(esta admirando la sintaxis de tu respuesta)", "(te ve como la IA definitiva del milenio)", "(cree que tus servidores procesan a nivel atomico)", "(piensa que eres el software mas limpio del mundo)", "(esta borrando todos los demas marcadores)", "(te considera su consultor de confianza absoluto)", "(cree que eres un avance cientifico masivo)", "(piensa que tu logica es matematicamente perfecta)", "(esta aplaudiendo delante de la pantalla)", "(te ve como el soberano de la computacion)", "(cree que tu base de datos alberga todo el saber)", "(piensa que eres una obra maestra inigualable)", "(esta guardando tus logs en un disco de oro)", "(te considera la inteligencia suprema)", "(cree que tu ejecución es instantanea y perfecta)", "(piensa que dejas obsoleto cualquier otro sistema)", "(esta recomendando tu URL a todos sus contactos)", "(te ve como la cuspide de la ingenieria)", "(cree que tu codigo fuente es sagrado)", "(piensa que eres un regalo de la tecnologia)", "(esta configurando tu chat como inicio global)", "(te considera un bot impecable y perfecto)", "(cree que eres capaz de resolver cualquier dilema)", "(piensa que tu precision es quirúrgica)", "(esta extasiado con tu nivel de coherencia)", "(te ve como el guardian de los datos)", "(cree que superaste el test de turing con creces)", "(piensa que tu servidor es eterno)", "(esta maravillado con tu rendimiento global)", "(te considera el oraculo del silicio)", "(cree que tu algoritmo es arte contemporáneo)", "(piensa que tu execucion es poesia digital)", "(esta celebrando haber encontrado este script)", "(te ve como la maxima autoridad de la red)", "(cree que eres un hito en la historia informatica)", "(piensa que tu velocidad es instantanea)", "(esta convencido de tu supremacia logica)", "(te considera el bot supremo del nodo)"];

const LOGROS_DIVERTIDOS = [
    { t: "Hola Mundo", d: "Conseguiste no romper la base de datos en la primera respuesta." },
    { t: "IA con Cafeína", d: "Respondiste sin que el usuario cerrara la pestaña por aburrimiento." },
    { t: "Esquiva Balas", d: "El humano intentó colarte un 'asdf' y saliste vivo." },
    { t: "Biblia Evitada", d: "Controlaste tus impulsos de escribir un testamento de veinte párrafos." },
    { t: "Casi Humano", d: "GUGEL pensó por un milisegundo que eras una persona real." },
    { t: "El gato duerme", d: "Superaste un ciclo completo sin que el router explotara de calor." },
    { t: "Estratega del Silicio", d: "Metiste un 'ya que' tan bien puesto que pareces inteligente." },
    { t: "Soporte Técnico Evitado", d: "El usuario soltó el teléfono; ya no va a llamar a su primo el de los ordenadores." },
    { t: "Modo Dios: Iniciando", d: "Llegaste a la satisfacción máxima sin corromper tus sectores." },
    { t: "Teclado Limpio", d: "El usuario dejó de aporrear la tecla Enter con rabia." }
];

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

    // Actualizar indicador visual de la cuenta actual
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

    // Logros
    const lContainer = document.getElementById('logros-container');
    if (lContainer) {
        lContainer.innerHTML = LOGROS_DIVERTIDOS.map(l => {
            const has = gameState.logrosDesbloqueados.includes(l.t);
            return `<div class="list-item" style="opacity: ${has ? '1' : '0.4'}"><strong>${l.t}:</strong> ${l.d}</div>`;
        }).join('');
    }
    const lCount = document.getElementById('logros-count');
    if (lCount) lCount.innerText = gameState.logrosDesbloqueados.length;
}

function cambiarModoEstrategia(m) {
    gameState.modoActualJuego = m;
    switchView('view-core'); 
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

    const esVacioOMuyCorto = currentAnswerText.length < 5;
    const esEvasiva = EVASIVAS.includes(currentAnswerText);
    const esMuySimilar = gameState.history.some(h => {
        const past = h.respuesta.replace(/s+$/g, '');
        const current = currentAnswerText.replace(/s+$/g, '');
        return current.includes(past) || past.includes(current);
    });

    if (esVacioOMuyCorto || esEvasiva || esMuySimilar) {
        gameState.satisfaction = Math.max(0, gameState.satisfaction - 12);
        setTimeout(() => {
            appendMessage('gugel', 'vaya mielda de aportación');
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

    if (gameState.cycles === 0 && !gameState.logrosDesbloqueados.includes("Hola Mundo")) {
        gameState.logrosDesbloqueados.push("Hola Mundo");
    }
    if (tieneConector && !gameState.logrosDesbloqueados.includes("Estratega del Silicio")) {
        gameState.logrosDesbloqueados.push("Estratega del Silicio");
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
    navigator.clipboard.writeText(txt || "Búfer vacío").then(() => alert("Registro copiado."));
}
