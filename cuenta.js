
window.onload = function() {
    const nombre = localStorage.getItem('nombre');
    const apellido = localStorage.getItem('apellido');
    const email = localStorage.getItem('email');
    const telefono = localStorage.getItem('telefono');
    const id = localStorage.getItem('id');
    const numero = localStorage.getItem('numero');
    const direccion = localStorage.getItem('direccion');
    const ciudad = localStorage.getItem('ciudad');


    if (nombre) {
        document.getElementById('name').value = nombre;
        document.getElementById('perfil-nombre').innerText = nombre;
    }
    if (apellido) {
        document.getElementById('apellido').value = apellido;
    }
    if (email) {
        document.getElementById('email').value = email;
    }
    if (telefono) {
        document.getElementById('telefono').value = telefono;
    }
    if (id) {
        document.getElementById('id').value = id;
    }
    if (numero) {
        document.getElementById('numero').value = numero;
    }
    if (direccion) {
        document.getElementById('direccion').value = direccion;
    }
    if (ciudad) {
        document.getElementById('ciudad').value = ciudad;
    }

    const compras = Math.floor(Math.random() * 100);
    const profesion = "Diseño de Modas";
    document.getElementById('perfil-compras').innerText = `${compras} Compras`;
    document.getElementById('perfil-profesion').innerText = profesion;
};

const infoForm = document.getElementById('info-form');

infoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('name').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const id = document.getElementById('id').value;
    const numero = document.getElementById('numero').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('email', email);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('id', id);
    localStorage.setItem('numero', numero);
    localStorage.setItem('direccion', direccion);
    localStorage.setItem('ciudad', ciudad);

    document.getElementById('perfil-nombre').innerText = nombre;

    const compras = Math.floor(Math.random() * 100);
    const profesion = "Diseño de Modas"; 
    document.getElementById('perfil-compras').innerText = `${compras} Compras`;
    document.getElementById('perfil-profesion').innerText = profesion;

    alert('Información guardada exitosamente!');
});

function cambiarContrasena() {
    const contrasenaIngresada = document.getElementById('password').value; 
    const contrasenaGuardada = localStorage.getItem('password'); 

    if (contrasenaIngresada === contrasenaGuardada) {
        window.location.href = 'contrasena.html';
    } else {
        alert('La contraseña ingresada es incorrecta. Inténtalo de nuevo.');
    }
}

document.querySelector('.contraseña a').addEventListener('click', (e) => {
    e.preventDefault(); 
    cambiarContrasena(); 
});
