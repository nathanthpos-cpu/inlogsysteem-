document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Functie om wachtwoord zichtbaar/onzichtbaar te maken
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁' : '🙈';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Voorkomt dat de pagina herlaadt

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            // https://script.google.com/macros/s/AKfycbw2vJeezSR7COpUSHFUSZroxAQ7m8LBgvIYevd7-h4_Mf28USk6i-1R6frMrNBs6z-N/exec
            const scriptURL = 'HIER_PLAATS_JE_DE_GEKOPIEERDE_URL';

            // Maak een FormData-object aan
            const formData = new FormData();
            formData.append('action', 'login');
            formData.append('email', email);
            formData.append('password', password);

            // Stuur de gegevens naar de Apps Script Web App
            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                if (data.includes("succesvol")) {
                    console.log("Inloggen succesvol!");
                    // Hier kun je een redirect toevoegen, bijvoorbeeld naar profiel.html
                    // window.location.href = "profiel.html";
                }
            })
            .catch(error => {
                console.error('Fout bij het inloggen:', error);
                alert("Er is een fout opgetreden. Probeer het opnieuw.");
            });
        });
    }
});