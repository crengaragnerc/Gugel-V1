const PREGUNTAS_CAMPAÑA = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto", "no dormir una noche", "xq agua es liquida", "como allanar un barranco"];
let gameState = { score: parseInt(localStorage.getItem('gugel_score')) || 0, campaignIndex: 0 };

document.getElementById('chat-form').onsubmit = handleUserResponse;

function appendMessage(sender, text) {
    const box = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.innerHTML = sender === 'gugel' ? `<strong>GUGEL:</strong> ${text}` : text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function nextRound() {
    const input = document.getElementById('user-input');
    const btn = document.getElementById('send-btn');
    input.disabled = true; btn.disabled = true;

    let timeLeft = 4;
    input.placeholder = `🧠 REFLEXIONANDO... (${timeLeft}s)`;
    const timer = setInterval(() => {
        timeLeft--;
        input.placeholder = `🧠 REFLEXIONANDO... (${timeLeft}s)`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            input.disabled = false; btn.disabled = false;
            input.placeholder = "Escribe tu respuesta técnica...";
            input.focus();
        }
    }, 1000);

    appendMessage('gugel', PREGUNTAS_CAMPAÑA[gameState.campaignIndex % PREGUNTAS_CAMPAÑA.length]);
}

function handleUserResponse(e) {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('ai', text);
    const pts = text.length > 20 ? 10 : 5;
    gameState.score += pts;
    localStorage.setItem('gugel_score', gameState.score);
    
    document.getElementById('modal-score-number').innerText = `${pts}/10`;
    document.getElementById('result-modal').style.display = "flex";
    input.value = "";
}

function closeResultModal() {
    document.getElementById('result-modal').style.display = "none";
    gameState.campaignIndex++;
    nextRound();
}

nextRound();
