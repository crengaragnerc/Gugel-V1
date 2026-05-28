// --- VARIABLES DE CONTROL SIMPLIFICADAS ---
let authScreen, mainApp, authForm, loggedUserName;

window.addEventListener('DOMContentLoaded', () => {
    authScreen = document.getElementById('auth-screen');
    mainApp = document.getElementById('main-app');
    authForm = document.getElementById('auth-form');
    loggedUserName = document.getElementById('logged-user-name');

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('auth-username').value.trim();
            if (username) {
                // Forzar el salto de pantalla al hacer clic
                if (authScreen) authScreen.style.display = "none";
                if (mainApp) mainApp.style.display = "flex";
                if (loggedUserName) loggedUserName.innerText = username;
                console.log("¡El login funciona perfectamente!");
            }
        });
    }
});
