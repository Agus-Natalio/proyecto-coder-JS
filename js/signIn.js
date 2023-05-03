const formRegistro = document.querySelector('#formRegistro'),
    nombre = document.querySelector('#username'),
    email = document.querySelector('#email'),
    pass = document.querySelector('#password'),
    passConfirm = document.querySelector('#confirm-password'),
    btnRegistrar = document.querySelector('#registro');


//constructor usuario
class user {
    constructor(nombre, email, contraseña, otraContra) {
        this.nombre = nombre;
        this.email = email;
        this.password = contraseña;
        this.passConfirm = otraContra;
    };
};

//Check LS
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

//Guardar usuario
function guardarUser(usuario){
    return usuarios.push(usuario);
};

//Guardar en LS
function userStorage(elemento){
    return localStorage.setItem('usuarios', JSON.stringify(elemento));
};
userStorage(usuarios);

//Check de mail y usuario

function datoExistente(elementoArray, elementoInput) {
    for (let i = 0; i < usuarios.length; i++) {
        if (elementoArray === 'email' && usuarios[i].email === elementoInput) {
            return true;
        } else if (elementoArray === 'nombre' && usuarios[i].nombre === elementoInput) {
            return true;
        }
    }
    return false;
}

//Evento
//Para que el boton de registro efectivamente cree un usuario
formRegistro.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newUser = new user(
        nombre.value,
        email.value,
        pass.value,
        passConfirm.value,
    )
    if (pass.value === passConfirm.value){
        if (datoExistente('email', email.value)) {
            document.querySelector('#mensaje').innerText = "El mail ya esta en uso!";
        } else if (datoExistente('nombre', nombre.value)) {
            document.querySelector('#mensaje').innerText = "El usuario ya existe!";
        } else {
            guardarUser(newUser);
            userStorage(usuarios);
            swal("Bienvenido "+nombre.value+"!", "Usuario creado con exito", "success");
            document.querySelector('#mensaje').innerText = "";
            formRegistro.reset();
        }
    } else{
        document.querySelector('#mensaje').innerText = "Las claves no coinciden!";
    }
});