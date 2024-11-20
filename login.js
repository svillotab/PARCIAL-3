
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (!email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (storedEmail === email && storedPassword === password) {
        alert('Inicio de sesión exitoso!');
        window.location.href = 'cuenta.html';
    } else {
        alert('Email o contraseña incorrectos.');
    }
});
