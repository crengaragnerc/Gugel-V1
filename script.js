const EVASIVAS = ["porque si", "no se", "jaja", "nose", "ni idea"];
let gameState = { satisfaction: 50 };

function switchView(id) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
}

document.getElementById('chat-form').onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const val = input.value.trim().toLowerCase();
    if (!val) return;

    const box = document.getElementById('chat-messages');
    box.innerHTML += `<div class="message ai"><strong>tú:</strong> ${val}</div>`;
    
    let esEvasiva = EVASIVAS.some(e => val.includes(e)) || val.length <= 3;
    gameState.satisfaction += esEvasiva ? -10 : 10;
    
    setTimeout(() => {
        const reaccion = esEvasiva ? "vaya pérdida de tiempo" : "entendido, anotado en el búfer";
        box.innerHTML += `<div class="message gugel"><strong>gugel:</strong> ${reaccion}</div>`;
        document.getElementById('prof-opinion').innerText = esEvasiva ? "Usuario evasivo." : "Argumento estructurado.";
        box.scrollTop = box.scrollHeight;
    }, 500);
    
    input.value = "";
};

function changeSystemMode() {
    document.body.className = document.getElementById('mode-select').value;
}
