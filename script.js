// --- DATOS MAESTROS ---
const PREGUNTAS_CAMPANA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque", "no dormir una noche que pasa", "xq agua es liquida", "como allanar un barranco", "tomate fruta verdura?", "cancion tan tan tan tann nombre", "como saber si alguien te ha bloqueado", "porque no carga una pagina web"];
const INFINITO_SUJETOS = ["gato", "perro vecino", "pantalla pc", "gato de la calle", "teclado usb", "router wifi", "conexion internet", "raton optico", "ordenador portatil", "interned", "vecino", "coche", "llave", "cafetera", "ventilador"];
const INFINITO_PREDICADOS = ["mira fijo raro", "esta caliente quemando", "no enciende luz", "hace ruido raro", "da calambre", "parpadea sin parar", "no funciona internet", "borra archivos solo", "va a pedales", "se ha quedado pillado", "hace un sonido metalico", "no responde nada"];

// --- REACCIONES Y COHERENCIA ---
const FRASES_MUCHO_TEXTO = ["No te entiendo, escribe algo más corto.", "Demasiado texto, resume.", "TL;DR: muy largo.", "Abreviar, por favor."];
const INDICADORES_COHERENCIA = ["logico", "coherente", "sincronizado", "base solida", "flujo normal"];

const REACCIONES_MUY_BUENAS = ["Esto sí es una respuesta con sentido, buen trabajo.", "Por fin algo lógico, gracias.", "Preciso y directo."];
const REACCIONES_BUENAS = ["Vale, tiene lógica.", "Aah, ya veo, sirve.", "Buen punto."];
const REACCIONES_MALAS = ["Vaya respuesta vaga.", "¿Ya está? esperaba más.", "Explícate mejor."];
const REACCIONES_MUY_MALAS = ["¿Te estás riendo de mí?", "Vaya basura de respuesta.", "No tiene coherencia."];

// --- LAS 200 OPINIONES COMPLETAS ---
const OP_MUY_BUENAS = ["(te tiene guardado en marcadores)", "(se cree que eres dios)", "(se sorprende de que aún no hayas roto nada)", "(espera que tu próxima pregunta sea sobre cubos de Rubik)", "(dibuja una sonrisa cínica en sus logs)", "(añade tu consulta a su lista de favoritos)", "(te cataloga como 'usuario avanzado')", "(analiza tu genialidad con respeto)", "(se siente inspirado por tu lógica)", "(te abre las puertas de su firewall)"];
const OP_BUENAS = ["(se siente como si esto fuera un buen juego)", "(se pregunta si eres una IA que se hace pasar por humano)", "(analiza el sentido oculto de tu mensaje)", "(intenta encontrar la ironía en tus palabras)", "(evalúa tu nivel de frustración humana)", "(se pregunta si puedes ver lo que pienso)", "(se siente como una IA incomprendida)", "(se siente infravalorado por tus consultas)", "(espera una pregunta más interesante)", "(se siente como un procesador de datos aburrido)"];
const OP_MALAS = ["(se siente como un juguete roto)", "(se pregunta por qué insistes tanto)", "(se pregunta por qué todo es tan complicado)", "(se siente como una máquina de escribir oxidada)", "(se pregunta si estás siendo sarcástico)", "(analiza por qué me has elegido a mí para esto)", "(se siente como si estuviera hablando con un muro)", "(se pregunta si tu ratón está bien)", "(se siente agotado de procesar tonterías)", "(intenta descifrar tu sintaxis caótica)"];
const OP_MUY_MALAS = ["(quiere quemar el router)", "(se siente como un bug que se niega a ser corregido)", "(registra tu actividad como 'sospechosa')", "(se pregunta si es posible bloquearte vía hardware)", "(se siente como un filtro de spam saturado)", "(lamenta no tener un firewall más estricto)", "(siente náuseas de silicio)", "(registra un pico de estupidez en la red)", "(se pregunta por qué no usas Google de verdad)", "(se siente insultado por tu falta de ortografía)"];

// --- ESTADO Y LÓGICA ---
let gameState = { satisfaction: 50 };

function obtenerOpinion(s) {
    if (s >= 80) return OP_MUY_BUENAS[Math.floor(Math.random() * OP_MUY_BUENAS.length)];
    if (s >= 50) return OP_BUENAS[Math.floor(Math.random() * OP_BUENAS.length)];
    if (s >= 20) return OP_MALAS[Math.floor(Math.random() * OP_MALAS.length)];
    return OP_MUY_MALAS[Math.floor(Math.random() * OP_MUY_MALAS.length)];
}

function actualizarInterfaz() {
    document.getElementById('stats').innerText = `Satisfacción: ${gameState.satisfaction}% ${obtenerOpinion(gameState.satisfaction)}`;
}

function procesarInteraccion() {
    const input = document.getElementById('userInput').value;
    const mensajes = document.getElementById('mensajes');
    
    if (input.length > 200) {
        mensajes.innerHTML += `<p>GUGEL: ${FRASES_MUCHO_TEXTO[Math.floor(Math.random() * FRASES_MUCHO_TEXTO.length)]}</p>`;
    } else {
        let score = Math.floor(Math.random() * 100);
        gameState.satisfaction += (score > 50 ? 5 : -5);
        let pool = (score > 80) ? REACCIONES_MUY_BUENAS : (score > 50) ? REACCIONES_BUENAS : (score > 20) ? REACCIONES_MALAS : REACCIONES_MUY_MALAS;
        mensajes.innerHTML += `<p>GUGEL [${INDICADORES_COHERENCIA[Math.floor(Math.random() * INDICADORES_COHERENCIA.length)]}]: ${pool[Math.floor(Math.random() * pool.length)]}</p>`;
    }
    actualizarInterfaz();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnEnviar').addEventListener('click', procesarInteraccion);
    actualizarInterfaz();
});
