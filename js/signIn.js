const formRegistro = document.querySelector('#formReg'),
    nombre = document.querySelector('#'),
    email = document.querySelector('#'),
    pass = document.querySelector('#'),
    btnRegistro = document.querySelector('#');


    //constructor usuario
class user {
    constructor(nombre, email, contraseña) {
        this.name = nombre;
        this.email = email;
        this.password = contraseña;
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

//Evento
//Para que el boton de registro efectivamente cree un usuario
formRegistro.addEventListener('submit', (e)=>{
    e.preventDefault();
    const newUser = new Usuario(
        nombre.value,
        email.value,
        pass.value,
    )
    //Pusheo sobre el array usuarios y cargo al storage el array actualizado
    guardarUser(newUser);
    userStorage(usuarios);
});