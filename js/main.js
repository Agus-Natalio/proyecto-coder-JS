function comprobacion (dato, datoAct, datoRequerido){
    do{
        if (dato != datoAct){
            dato = prompt(datoRequerido +" incorrecto.\nVuelva a ingresar su " + datoRequerido);
        }else{
            break;
        }
    }while(dato != datoAct);
}

let nombreUsuario = prompt("Ingresa tu nombre de usuario");
let mailUsuario = prompt("Ingrese su e-mail");
let claveUsuario = prompt("Ingresa tu clave");
let confirmacion = prompt("Vuelve a ingresar tu clave");

comprobacion (confirmacion, claveUsuario, "Clave");

let nombreUsuarioAct = prompt("Vuelva a ingresar su nombre de usuario");
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
    alert("Bienvenido a Books of Norion "+ nombreUsuario +"!");
    let suma = 0;
    let menu = prompt("Los siguientes libros se encuentran en stock:\n1- Folgstagt el Eterno // Precio: 4300\n2- La Piramide Negra // Precio: 4000\n3- Los Exiliados // Precio:3200\nIngresa 0 para finalizar la sesion");
    while (menu != 0){
        switch (menu) {
            case "1":
                suma += 4300;
                alert ("Libro adicionado correctamente!\nTienes $"+suma+" en tu carrito");
                break;
            case "2":
                suma += 4000;
                alert ("Libro adicionado correctamente!\nTienes $"+suma+" en tu carrito");
                break;
            case "3":
                suma += 3200;
                alert ("Libro adicionado correctamente!\nTienes $"+suma+" en tu carrito");
                break;
            case "0":
                alert("Finalizando la sesion");
                break;   
            default:
                alert ("Ingreso no admitido");
        }
        menu = prompt("Los siguientes libros se encuentran en stock:\n1- Folgstagt el Eterno // Precio: 4300\n2- La Piramide Negra // Precio: 4000\n3- Los Exiliados // Precio:3200\nIngresa 0 para finalizar la sesion");
    }
    if (suma != 0){
        alert("Debes pagar una suma de $"+suma+".\nHemos enviado el recibo a "+mailUsuario+"\nDisfruta tus libros!")
    }else{
        alert("No has seleccionado ningun libro.\nTe esperamos la proxima.")
    }
}else{
    alert("Has ingresado incorrectamente la clave demasiadas veces.\nSe ha enviado un mail a tu direccion de correo electronico");
    alert("Compras inhabilitadas");
};