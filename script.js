const PREGUNTAS = ["cagar verde normal", "como hacer cubo rubik", "que se celebra 15 de agosto y porque"];
let score = parseInt(localStorage.getItem('gugel_score')) || 0;

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('chat-form').onsubmit = handleUserResponse;
    nextRound();
});

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
    input.disabled = true;
    btn.disabled = true;

    let timeLeft = 4;
    input.placeholder = `🧠 REFLEXIONANDO... (${timeLeft}s)`;
    
    const interval = setInterval(() => {
        timeLeft--;
        input.placeholder = `🧠 REFLEXIONANDO... (${timeLeft}s)`;
        if(timeLeft <= 0) {
            clearInterval(interval);
            input.disabled = false;
            btn.disabled = false;
            input.placeholder = "Escribe tu respuesta técnica...";
            input.focus();
        }
    }, 1000);

    appendMessage('gugel', PREGUNTAS[Math.floor(Math.random() * PREGUNTAS.length)]);
}

function handleUserResponse(e) {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if(!text) return;

    appendMessage('ai', text);
    const pts = text.length > 20 ? 10 : 5;
    score += pts;
    localStorage.setItem('gugel_score', score);
    
    document.getElementById('modal-score-number').innerText = `${pts}/10`;
    document.getElementById('result-modal').style.display = "flex";
    input.value = "";
}

function closeResultModal() {
    document.getElementById('result-modal').style.display = "none";
    nextRound();
}
