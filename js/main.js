/*let ingreso = parseFloat(prompt("Ingresa un numero mogolico"))

if(ingreso < 10) {
    console.log("El numerico es menor a 10, el numerico es: "+ingreso)
}else{
    console.log("El numerico es mayor a 10, el numerico es: "+ingreso)
}

let resultSuma = 10;
let ingresoDelAlumno = parseFloat(prompt(Ingrese el valor de la siguiente operacion: 2 * 5));

//variables booleanas

let ingresoDelAlumno = parseFloat(prompt("Ingrese el resultado de la siguiente operacion: 2 * 5"))

let resultSuma = 10

let verdadero = ingresoDelAlumno == resultSuma;

console.log(verdadero);

if(verdadero) {
    console.log("Muy bien pibe, pasa") 
}else{
    console.log("Sos lo mas pelotudo que vi en mi vida, poco queda ya, no sobreviviras al final de todo")
}*/


//Inicio de sesion
//Generar un script que se adecue a la estructura de un Log In
/*El mismo deberia tener:
1- Display de bienvenida y requisar datos
2- Informar que la clave es incorrecta y dejar al usuario intentar de nuevo en dicho caso
  2a- Si el ingreso es correcto mostrar mensaje de bienvenida
  2b- Si se falla mas de 5 veces informar al usuario que debera restablecer su clave desde el mail
3- Mostrar las siguientes opciones:
  a- Proceder al Home
  b- Ver carrito  
  c- Proceder al perfil del usuario
  d- Salir
4- Al finalizar mostrar mensaje.
*/ 

let nombreUsuario = prompt("Ingresa tu nombre de usuario");
let mailUsuario = prompt("Ingrese su e-mail");
let claveUsuario = prompt("Ingresa tu clave");
let confirmacion = prompt("Vuelve a ingresar tu clave");

function comprobacion (dato, datoAct, datoRequerido){
    do{
        if (dato != datoAct){
            dato = prompt(datoRequerido +" incorrecto.\nVuelva a ingresar su " + datoRequerido);
        }else{
            break;
        }
    }while(dato != datoAct);
}

comprobacion (confirmacion, claveUsuario, "Clave");

let nombreUsuarioAct = prompt("Ingrese su nombre de usuario");
comprobacion (nombreUsuarioAct, nombreUsuario, "Usuario");

let ingreso = false;
confirmacion = prompt ("Bienvenido "+ nombreUsuario +"!\nIngresa tu clave, te quedan 5 intentos." );

if (confirmacion != claveUsuario){
    for (let i = 4; i >= 0; i--){
        confirmacion = prompt ("Clave incorrecta.\nTe quedan "+ i +" intentos.");
        if(confirmacion == claveUsuario){
            ingreso = true;
            break;
        }
    }
}else{
    ingreso = true;
}

if (ingreso) {
    alert("Bienvenido a Books of Norion "+ nombreUsuario +"!")
}else{
    alert("Isto es postinha?\nErraste la clave 5 veces hermano, anda a fijarte de restablecerla en tu mail")
    alert("Compras inhabilitadas")
}