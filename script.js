function loginUser(username) {
    gameState.currentUser = username;
    if (loggedUserName) loggedUserName.innerText = username;
    
    // Forzar el cambio visual al instante
    authScreen.style.display = "none";
    mainApp.style.display = "flex"; 
    
    renderHistory();
    updateSidebarUI();
    
    // Asegurar que el formulario escucha el envío de respuestas
    if (chatForm) {
        chatForm.onsubmit = handleUserResponse;
    }
    
    // Arrancar la primera pregunta con margen suficiente para que el HTML exista de verdad
    setTimeout(() => {
        nextRound();
    }, 800);
}

function nextRound(forcedQuestion = null) {
    gameState.roundStep = 1;
    
    // Asegurar la existencia de los elementos antes de tocarlos
    if (userInput) {
        userInput.disabled = true;
        userInput.value = "";
        userInput.placeholder = "Elgoog está pensando...";
    }
    if (sendBtn) sendBtn.disabled = true;
    if (elgoogStatus) elgoogStatus.innerText = "Escribiendo...";
    
    // Lanzar la pregunta
    gameState.currentQuestion = forcedQuestion ? forcedQuestion : getNextQuestion();
    appendMessage('elgoog', gameState.currentQuestion);
    
    let timeLeft = 5;
    if (userInput) userInput.placeholder = `🧠 REFLEXIÓN OBLIGATORIA... (${timeLeft}s)`;
    if (elgoogStatus) elgoogStatus.innerText = "Analizando petición humana...";

    // Cuenta atrás del temporizador
    const countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            if (userInput) userInput.placeholder = `🧠 REFLEXIÓN OBLIGATORIA... (${timeLeft}s)`;
        } else {
            clearInterval(countdown);
            
            // DESBLOQUEO TOTAL
            gameState.roundStep = 2;
            if (userInput) {
                userInput.disabled = false;
                userInput.placeholder = "Escribe tu respuesta como una IA profesional...";
                userInput.focus();
            }
            if (sendBtn) sendBtn.disabled = false;
            if (elgoogStatus) elgoogStatus.innerText = "Esperando respuesta...";
        }
    }, 1000);
}
