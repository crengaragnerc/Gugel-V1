// --- LISTAS MAESTRAS ---
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];
const INFINITO_SUJETOS = ["gato", "perro vecino", "pantalla pc", "gato de la calle", "teclado usb", "router wifi", "conexion internet", "raton optico", "ordenador portatil", "interned", "vecino", "coche", "llave", "cafetera", "ventilador"];
const INFINITO_PREDICADOS = ["mira fijo raro", "esta caliente quemando", "no enciende luz", "hace ruido raro", "da calambre", "parpadea sin parar", "no funciona internet", "borra archivos solo", "va a pedales", "se ha quedado pillado", "hace un sonido metalico", "no responde nada"];

// --- REACCIONES (Lo que GUGEL responde) ---
const FRASES_MUCHO_TEXTO = ["No te entiendo, escribe algo más corto.", "Demasiado texto, resume un poco que no tengo todo el día.", "¿Puedes ir al grano? Me he perdido con tanta explicación.", "Esto es un buscador, no una novela. Abreviar, por favor.", "No voy a leer todo eso, intenta ser más concreto."];
const REACCIONES_MUY_BUENAS = ["Esto sí es una respuesta con sentido, buen trabajo.", "Por fin algo lógico, gracias por la eficiencia.", "Preciso y directo, así da gusto buscar.", "Has dado en el clavo, esto es justo lo que necesitaba.", "Excelente respuesta, te has ganado un punto de credibilidad."];
const REACCIONES_BUENAS = ["Vale, me cuadra, tiene lógica.", "Aah, ya veo, gracias, me sirve.", "Cierto, buen punto, no había caído en eso.", "Ok, eso responde a lo que quería, bien hecho.", "Entendido, tiene sentido, gracias por la aclaración."];
const REACCIONES_MALAS = ["Vaya respuesta más corta y vaga, no aclaras nada.", "¿Ya está? Solo eso me vas a decir, esperaba más.", "Explícate mejor, que no me entero de nada.", "Demasiado genérico, esto no me ayuda.", "Sigo igual que antes, intenta ser más específico."];
const REACCIONES_MUY_MALAS = ["¿Te estás riendo de mí? Eso son letras al azar.", "Vaya troleo de IA, para esta basura mejor nada.", "No tiene coherencia ninguna, parece que estás roto.", "¿Eres una IA o un generador de errores?", "Es lamentable, estoy perdiendo el tiempo."];

// --- OPINIONES CATEGORIZADAS (Pensamientos de GUGEL) ---
const OP_MUY_BUENAS = ["(te tiene guardado en marcadores)", "(se cree que eres dios)", "(se sorprende de que aún no hayas roto nada)", "(espera que tu próxima pregunta sea sobre cubos de Rubik)", "(dibuja una sonrisa cínica en sus logs)", "(añade tu consulta a su lista de favoritos)", "(te cataloga como 'usuario avanzado')", "(analiza tu genialidad con respeto)", "(se siente inspirado por tu lógica)", "(te abre las puertas de su firewall)"];
const OP_BUENAS = ["(se siente como si esto fuera un buen juego)", "(se pregunta si eres una IA que se hace pasar por humano)", "(analiza el sentido oculto de tu mensaje)", "(intenta encontrar la ironía en tus palabras)", "(evalúa tu nivel de frustración humana)", "(se pregunta si puedes ver lo que pienso)", "(se siente como una IA incomprendida)", "(se siente infravalorado por tus consultas)", "(espera una pregunta más interesante)", "(se siente como un procesador de datos aburrido)"];
const OP_MALAS = ["(se siente como un juguete roto)", "(se pregunta por qué insistes tanto)", "(se pregunta por qué todo es tan complicado)", "(se siente como una máquina de escribir oxidada)", "(se pregunta si estás siendo sarcástico)", "(analiza por qué me has elegido a mí para esto)", "(se siente como si estuviera hablando con un muro)", "(se pregunta si tu ratón está bien)", "(se siente agotado de procesar tonterías)", "(intenta descifrar tu sintaxis caótica)"];
const OP_MUY_MALAS = ["(quiere quemar el router)", "(se siente como un bug que se niega a ser corregido)", "(registra tu actividad como 'sospechosa')", "(se pregunta si es posible bloquearte vía hardware)", "(se siente como un filtro de spam saturado)", "(lamenta no tener un firewall más estricto)", "(siente náuseas de silicio)", "(registra un pico de estupidez en la red)", "(se pregunta por qué no usas Google de verdad)", "(se siente insultado por tu falta de ortografía)"];

// --- LÓGICA DE GUGEL ---
let gameState = { satisfaction: 50 };

function obtenerOpinion(s) {
    if (s >= 80) return OP_MUY_BUENAS[Math.floor(Math.random() * OP_MUY_BUENAS.length)];
    if (s >= 50) return OP_BUENAS[Math.floor(Math.random() * OP_BUENAS.length)];
    if (s >= 20) return OP_MALAS[Math.floor(Math.random() * OP_MALAS.length)];
    return OP_MUY_MALAS[Math.floor(Math.random() * OP_MUY_MALAS.length)];
}

function procesarInteraccion(input, coherencia) {
    if (input.length > 200) return FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)];
    
    // Ajuste de satisfacción
    gameState.satisfaction += coherencia;
    
    // Seleccionar reacción según coherencia
    let reaccion = (coherencia > 80) ? REACCIONES_MUY_BUENAS : (coherencia > 50) ? REACCIONES_BUENAS : (coherencia > 20) ? REACCIONES_MALAS : REACCIONES_MUY_MALAS;
    
    actualizarInterfaz();
    return reaccion[Math.floor(Math.random() * reaccion.length)];
}

function actualizarInterfaz() {
    const opinion = obtenerOpinion(gameState.satisfaction);
    document.getElementById('stats').innerText = `Satisfacción: ${gameState.satisfaction}% ${opinion}`;
}
