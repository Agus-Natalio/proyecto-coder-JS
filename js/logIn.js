const formIngreso = document.querySelector("#login"),
    userInput = document.querySelector("#username"),
    passInput = document.querySelector("#password"),
    p = document.querySelector("#mensaje");

let activeUser = [];

/* funciones */
function guardarUsuarioActivo(usuario) {
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
};

function inicioSesion(usuarios) {
    //Inicio de sesion
    localStorage.removeItem('usuarioActivo');
    let userFound = usuarios.find((user) =>{
        return user.nombre == userInput.value && user.password == passInput.value;
    });
    if (userFound){
        guardarUsuarioActivo(userFound);
        window.location.href = "../index.html";
    }else{
        document.querySelector('#mensaje').innerText = "Usuario y/o clave incorrecto/s";
    };
};

function recuperarLS() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

/* Ejecutamos funciones */
const usuariosRegistrados = recuperarLS();

/* Listeners */
formIngreso.addEventListener('submit', (e) =>{
    e.preventDefault();
    inicioSesion(usuariosRegistrados);
})