// Base de datos local simulada del núcleo del sistema
let modoActual = 'infinito';
let operadorActivo = 'Invitado';
let satisfaccionSujeto = 50;
let listaDeFavoritos = [];
let bufferLogs = [];

// Base de datos de logros integrada en el sistema (40 objetivos teóricos)
const baseLogros = [
    { id: 1, titulo: "CONEXIÓN ESTABLECIDA", desc: "Has iniciado sesión en el simulador central de GUGEL.", tipo: "positivo", obtenido: true },
    { id: 2, titulo: "ALERTA DE DESBORDAMIENTO", desc: "El usuario humano ha realizado una consulta masiva.", tipo: "negativo", obtenido: false },
    { id: 3, titulo: "OPERADOR CERTIFICADO", desc: "Cambiaste el alias predeterminado de la terminal.", tipo: "positivo", obtenido: false },
    { id: 4, titulo: "SABOR PERSONALIZADO", desc: "Alteraste la matriz del tema visual básico.", tipo: "positivo", obtenido: false }
];

// Inicialización de componentes al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    actualizarInterfazLogros();
    agregarMensajeSimulado("gugel", "SISTEMA OPERATIVO ONLINE. Esperando comandos del analista humano...");
    
    // Escucha del formulario de chat
    const formularioChat = document.getElementById("chat-form");
    if(formularioChat) {
        formularioChat.addEventListener("submit", (e) => {
            e.preventDefault();
            procesarEntradaTerminal();
        });
    }
});

/**
 * MOTOR DE VENTANITAS EMERGENTES DINÁMICAS (TOASTS)
 * Genera réplicas de alertas con la misma estructura visual que los logros
 */
function lanzarVentanitaAlerta(titulo, mensaje, tipo = 'positivo') {
    const contenedor = document.getElementById('contenedor-notificaciones-sistema');
    if (!contenedor) return;

    const nuevaVentanita = document.createElement('div');
    nuevaVentanita.className = `ventanita-notificacion-flotante ${tipo}`;

    nuevaVentanita.innerHTML = `
        <div class="toast-titulo">${titulo}</div>
        <div class="toast-cuerpo">${mensaje}</div>
    `;

    contenedor.appendChild(nuevaVentanita);

    // Auto-eliminación temporizada tras 4.5 segundos
    setTimeout(() => {
        nuevaVentanita.classList.add('salida-toast');
        nuevaVentanita.addEventListener('transitionend', () => {
            nuevaVentanita.remove();
        });
    }, 4500);
}

// Controladores de navegación de la barra lateral (Modos de Juego)
function seleccionarModoJuego(modo) {
    modoActual = modo;
    const btnCampaña = document.getElementById("btn-modo-campaña");
    const btnInfinito = document.getElementById("btn-modo-infinito");
    
    if(modo === 'campaña') {
        btnCampaña.classList.add("active");
        btnInfinito.classList.remove("active");
        lanzarVentanitaAlerta("MODO CONFIGURADO", "Campaña analítica activa. Progresión lineal activada.", "positivo");
    } else {
        btnInfinito.classList.add("active");
        btnCampaña.classList.remove("active");
        lanzarVentanitaAlerta("MODO CONFIGURADO", "Consultas Infinitas sin restricciones de búfer.", "positivo");
    }
    switchView('view-chat');
}

// Alternar entre los diferentes paneles (Vistas)
function switchView(viewId) {
    const todosLosPaneles = document.querySelectorAll(".content-panel");
    todosLosPaneles.forEach(panel => panel.classList.remove("active"));
    
    const todosLosBotones = document.querySelectorAll("#sidebar .sub-btn");
    todosLosBotones.forEach(btn => btn.classList.remove("active"));

    const panelDestino = document.getElementById(viewId);
    if(panelDestino) {
        panelDestino.classList.add("active");
    }

    const botonActivo = document.getElementById(`btn-${viewId}`);
    if(botonActivo) {
        botonActivo.classList.add("active");
    }
}

// Selector de esquemas cromáticos (Temas)
function cambiarTema(nuevoTema) {
    document.body.className = nuevoTema;
    lanzarVentanitaAlerta("MATRIZ MODIFICADA", `Se ha cargado el esquema: ${nuevoTema.replace('modo-', '').toUpperCase()}`, "positivo");
    
    // Desbloqueo automático del logro de cambio de tema
    if(!baseLogros[3].obtenido) {
        baseLogros[3].obtenido = true;
        actualizarInterfazLogros();
        lanzarVentanitaAlerta("🏆 LOGRO DESBLOQUEADO", baseLogros[3].titulo, "positivo");
    }
}

// Gestión interna de cuentas de operadores (Modal flotante)
function abrirModalCuenta() {
    document.getElementById("modal-cuenta").classList.add("active");
}

function cerrarModalCuenta() {
    document.getElementById("modal-cuenta").classList.remove("active");
}

function cerrarModalCuentaExterno(event) {
    if(event.target.id === "modal-cuenta") {
        cerrarModalCuenta();
    }
}

function guardarNombreCuenta() {
    const inputUser = document.getElementById("account-username");
    if(inputUser && inputUser.value.trim() !== "") {
        operadorActivo = inputUser.value.trim();
        
        // Sincronizar textos en toda la interfaz
        document.getElementById("sidebar-user-display").innerText = operadorActivo;
        document.getElementById("panel-user-status").innerText = operadorActivo;
        document.getElementById("prof-usuario").innerText = operadorActivo;
        
        cerrarModalCuenta();
        
        // Lanzamiento de la alerta flotante exacta
        lanzarVentanitaAlerta("SESIÓN ACTUALIZADA", `Código de Operador '${operadorActivo}' verificado con éxito.`, "positivo");
        
        if(!baseLogros[2].obtenido) {
            baseLogros[2].obtenido = true;
            actualizarInterfazLogros();
            lanzarVentanitaAlerta("🏆 LOGRO DESBLOQUEADO", baseLogros[2].titulo, "positivo");
        }
    } else {
        lanzarVentanitaAlerta("ERROR DE ACCESO", "El identificador de terminal no puede estar vacío.", "negativo");
    }
}

// Procesamiento de comandos y mensajes del chat
function procesarEntradaTerminal() {
    const input = document.getElementById("user-input");
    if(!input || input.value.trim() === "") return;
    
    const textoMensaje = input.value.trim();
    agregarMensajeSimulado("usuario", textoMensaje);
    
    // Almacenar en el registro interno de logs
    bufferLogs.push({ texto: textoMensaje, timestamp: new Date().toLocaleTimeString() });
    actualizarHistorialLogs();

    input.value = "";
    document.getElementById("chat-actions-bar").style.display = "block";

    // Respuesta simulada de la Inteligencia Artificial (Gugel)
    setTimeout(() => {
        agregarMensajeSimulado("gugel", `Análisis completado para: "${textoMensaje}". Consistencia del sistema estable.`);
    }, 1000);
}

function agregarMensajeSimulado(remitente, texto) {
    const contenedorChat = document.getElementById("chat-messages");
    if(!contenedorChat) return;

    const divMensaje = document.createElement("div");
    divMensaje.className = `message ${remitente}`;
    divMensaje.innerHTML = `<strong>[${remitente.toUpperCase()}]:</strong> ${texto}`;
    
    contenedorChat.appendChild(divMensaje);
    contenedorChat.scrollTop = contenedorChat.scrollHeight;
}

// Favoritos e Historial
function marcarActualComoFavorito() {
    if(bufferLogs.length === 0) return;
    const ultimoLog = bufferLogs[bufferLogs.length - 1].texto;
    
    if(!listaDeFavoritos.includes(ultimoLog)) {
        listaDeFavoritos.push(ultimoLog);
        actualizarFavoritosInterfaz();
        lanzarVentanitaAlerta("MARCADOR GUARDADO", "Consulta anclada al índice de favoritos.", "positivo");
    }
}

function actualizarFavoritosInterfaz() {
    const container = document.getElementById("favorites-list-container");
    if(!container) return;
    container.innerHTML = "";
    
    listaDeFavoritos.forEach(fav => {
        const item = document.createElement("div");
        item.className = "log-item-card";
        item.innerHTML = `<div class="log-item-info">★ ${fav}</div>`;
        container.appendChild(item);
    });
}

function actualizarHistorialLogs() {
    const container = document.getElementById("history-list-container");
    if(!container) return;
    container.innerHTML = "";
    
    bufferLogs.forEach(log => {
        const item = document.createElement("div");
        item.className = "log-item-card";
        item.onclick = () => {
            document.getElementById("user-input").value = log.texto;
            switchView('view-chat');
        };
        item.innerHTML = `
            <div class="log-item-info">[${log.timestamp}] ${log.texto}</div>
            <div class="log-item-action"><button class="mini-fav-btn">CARGAR</button></div>
        `;
        container.appendChild(item);
    });
}

// Renderizado y control de logros obtenidos en el panel estático
function actualizarInterfazLogros() {
    const contenedor = document.getElementById("logros-container");
    const contador = document.getElementById("logros-count");
    if(!contenedor) return;
    
    contenedor.innerHTML = "";
    let obtenidosContador = 0;
    
    baseLogros.forEach(logro => {
        if(logro.obtenido) obtenidosContador++;
        
        const item = document.createElement("div");
        item.className = `item-logro ${logro.tipo}`;
        item.innerHTML = `<strong>${logro.titulo}</strong> - ${logro.desc} ${logro.obtenido ? '✔️' : '🔒'}`;
        contenedor.appendChild(item);
    });
    
    if(contador) contador.innerText = obtenidosContador;
}

// Exportación de datos al portapapeles
function exportCoreData() {
    if(bufferLogs.length === 0) {
        lanzarVentanitaAlerta("BÚFER VACÍO", "No hay registros de logs para exportar en esta sesión.", "negativo");
        return;
    }
    const textoLogs = bufferLogs.map(l => `[${l.timestamp}] ${l.texto}`).join("\n");
    navigator.clipboard.writeText(textoLogs).then(() => {
        lanzarVentanitaAlerta("PORTAPAPELES", "Logs del sistema copiados correctamente.", "positivo");
    });
}

function exportarHistorialCompleto() {
    lanzarVentanitaAlerta("VOLCADO CENTRAL", "Compilando volcado binario de la sesión del operador...", "positivo");
}

function clickBotonContinuar() {
    lanzarVentanitaAlerta("FLUJO CONTINUADO", "Cargando siguiente petición en la cola de memoria.", "positivo");
}
