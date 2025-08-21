document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
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

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Voorkom dat de pagina herlaadt

            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;

            // Controleer of de wachtwoorden overeenkomen
            if (password !== confirmPassword) {
                alert("Wachtwoorden komen niet overeen!");
                return;
            }

            // Controleer de wachtwoordlengte
            if (password.length < 6) {
                alert("Wachtwoord moet minimaal 6 tekens bevatten!");
                return;
            }

            // https://github.com/nathanthpos-cpu/inlogsysteem-.git
            // VERGEET NIET DEZE URL TE VERVANGEN
            const scriptURL = 'HIER_PLAATS_JE_DE_GEKOPIEERDE_URL';

            // Maak een FormData-object aan
            const formData = new FormData();
            formData.append('action', 'register');
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
                    console.log("Registratie succesvol!");
                    registerForm.reset(); // Leeg het formulier
                }
            })
            .catch(error => {
                console.error('Fout bij het registreren:', error);
                alert("Er is een fout opgetreden. Probeer het opnieuw.");
            });
        });
    }
});