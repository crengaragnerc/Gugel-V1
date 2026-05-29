const PREGUNTAS = ["cagar verde", "rubik", "15 agosto", "dormir", "agua"];

function changeTheme() {
    document.documentElement.setAttribute('data-theme', document.getElementById('theme-selector').value);
}

function appendMsg(sender, text) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    appendMsg('ai', input.value);
    document.getElementById('score-text').innerText = (input.value.length > 10 ? "10/10" : "5/10");
    document.getElementById('modal').style.display = "flex";
    input.value = "";
};

function closeModal() {
    document.getElementById('modal').style.display = "none";
    appendMsg('gugel', PREGUNTAS[Math.floor(Math.random() * PREGUNTAS.length)]);
}

// Iniciar con la primera pregunta
appendMsg('gugel', PREGUNTAS[0]);
