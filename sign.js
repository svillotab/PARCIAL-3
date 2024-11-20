
const registroForm = document.getElementById('registro-form');

registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!usuario || !email || !password) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (localStorage.getItem('usuario') === usuario) {
        alert('El usuario ya está registrado.');
        return;
    }

    localStorage.setItem('usuario', usuario);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Registro exitoso!');
    window.location.href = 'Login.html';
});
