const PREGUNTAS = [
    "cagar verde normal", 
    "como hacer cubo rubik", 
    "que se celebra 15 de agosto"
];
let gameState = { index: 0 };

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.innerHTML = sender === 'gugel' ? `<strong>GUGEL:</strong> ${text}` : text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function nextRound() {
    const input = document.getElementById('user-input');
    const btn = document.getElementById('send-btn');
    input.disabled = true; 
    btn.disabled = true;
    
    let timeLeft = 5;
    input.placeholder = `REFLEXIONANDO... (${timeLeft}s)`;
    
    const timer = setInterval(() => {
        timeLeft--;
        input.placeholder = `REFLEXIONANDO... (${timeLeft}s)`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = false; 
            btn.disabled = false;
            input.placeholder = "Escribe tu respuesta...";
            input.focus();
        }
    }, 1000);
    
    appendMessage('gugel', PREGUNTAS[gameState.index % PREGUNTAS.length]);
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    if (!input.value.trim()) return;
    
    appendMessage('ai', input.value);
    
    document.getElementById('modal-score-number').innerText = "10/10";
    document.getElementById('result-modal').style.display = "flex";
    input.value = "";
};

function closeResultModal() {
    document.getElementById('result-modal').style.display = "none";
    gameState.index++;
    nextRound();
}

// Inicialización automática
nextRound();
