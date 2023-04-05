function comprobacion (dato, datoAct, datoRequerido){
    do{
        if (dato != datoAct){
            dato = prompt(datoRequerido +" incorrecto.\nVuelva a ingresar su " + datoRequerido);
        }else{
            break;
        }
    }while(dato != datoAct);
}

function filterRegion (arr, filtro){
    return arr.filter((el)=>{
        return el.region == filtro
    })
}

/*const findBook = (arr, filtro) =>{
    const encontrado = arr.find((el)=>{
        return el.name.includes(filtro); //Mediante el include no es necesario ingresar el nombre completo del libro en este caso
    })
} De momento no es necesario para la cantidad de libros que hay*/

class userData {
    constructor(userName, userMail, userPass){
        this.name = userName;
        this.mail = userMail;
        this.pass = userPass;
    }
}

class bookData {
    constructor(nombre, precio, autor, region){
        this.name = nombre;
        this.price = precio;
        this.author = autor;
        this.region = region;
    }
}

let nombreUsuario = prompt("Ingresa tu nombre de usuario");
let mailUsuario = prompt("Ingrese su e-mail");
let claveUsuario = prompt("Ingresa tu clave");
let ingreso = false;

const book1 = new bookData ("Folgstagt el Eterno", 4300, "Octopus Savinolla", "Frozeros");
const book2 = new bookData ("La Piramide Negra", 4000, "Augustus Nataliovsky", "Shularan");
const book3 = new bookData ("Los Exiliados", 3200, "Jean Pierre Chevallier", "Reinos Sureños");
const booksArray = [book1, book2, book3];
const user = new userData (nombreUsuario, mailUsuario, claveUsuario);

claveUsuario = prompt("Vuelve a ingresar tu clave");

comprobacion (claveUsuario, user.pass, "Clave");

nombreUsuario = prompt("Vuelve a ingresar tu nombre de usuario");

comprobacion (nombreUsuario, user.name, "Usuario");

claveUsuario = prompt ("Bienvenido "+ user.name +"!\nIngresa tu clave, tienes 5 intentos." );

if (claveUsuario != user.pass){
    for (let i = 4; i >= 0; i--){
        claveUsuario = prompt ("Clave incorrecta.\nTe quedan "+ i +" intentos.");
        if(claveUsuario == user.pass){
            ingreso = true;
            break;
        }
    }
}else{
    ingreso = true;
}

if (ingreso) {
    alert("Bienvenido a Books of Norion "+user.name+"!");
    let menu = prompt("Desesa filtrar los libros por region?\nIngrese Y para SI ó N para NO");
    let suma = 0;
    const carrito = [];
    while (menu == 'Y'){
        let filtro = prompt("Ingrese la region a filtrar entre las siguiente:\n1- Frozeros\n2- Shularan\n3- Reinos Sureños");
        let filteredBooks = [];
        switch(filtro){
            case '1':
                filteredBooks = filterRegion(booksArray, 'Frozeros');
                break;
            case '2':
                filteredBooks = filterRegion(booksArray, 'Shularan');
                break;
            case '3':
                filteredBooks = filterRegion(booksArray, 'Reinos Sureños');
                break;
            default:
                alert('Ingreso de region invalido');
        }
        let bookNames = filteredBooks.map((book) => book.name).join('\n');
        menu = prompt("El libro perteneciente a la region seleccionada es:\n "+bookNames+"\nIngresa 1 para agregarlo al carrito ó cualquier otra tecla para cancelar")
        if(menu == 1){
            carrito.push(filteredBooks[0]);
            alert("Has agregado " + filteredBooks[0].name + " al carrito");
        }
        menu = prompt("Desea seleccionar otra opcion de filtrado?\nIngrese Y para SI ó N para NO");
    }
    menu = prompt("Books of Norion.\nSelecciona el numero que corresponda.\n1-Ver lista completa\n2-Ver carrito\n3-Cerrar sesion");
    while(menu != '3'){
        switch(menu){
            case '1':
                menu = prompt("Listado de libros:\n1- "+book1.name+" // Precio: "+book1.price+"\n2-"+book2.name+" // Precio: "+book2.price+"\n3- "+book3.name+" // Precio: "+book3.price+"\n4- Volver al menu");
                while(menu != '4'){
                    switch(menu){
                        case '1':
                            carrito.push(book1);
                            alert("Has agregado "+book1.name+" al carrito");
                            break;
                        case '2':
                            carrito.push(book2);
                            alert("Has agregado "+book2.name+" al carrito");
                            break;
                        case '3':
                            carrito.push(book3);
                            alert("Has agregado "+book3.name+" al carrito");
                            break;
                        case '4':
                            alert("Regresando al menu");
                            break;
                        default:
                            alert("Opcion invalida");
                    }
                    menu = prompt("Listado de libros:\n1- "+book1.name+" // Precio: "+book1.price+"\n2-"+book2.name+" // Precio: "+book2.price+"\n3- "+book3.name+" // Precio: "+book3.price+"\n4- Volver al menu");
                    if (menu == '4'){
                        alert("Regresando al menu")
                    }
                }
                break;  
            case '2':
                if(carrito != null){
                    for (let i=0; i < carrito.length; i++){
                        suma += carrito[i].price;
                    }
                    alert("Tienes un total de $"+suma+" acumulado en el carrito");         
                }else{
                    alert("Aun no hay libros en el carrito :(");
                }
                break;
            case '3':
                alert("Finalizando la sesion");
                break;
            default:
                alert("Ingreso invalido");
        }
        menu = prompt("Books of Norion.\nSelecciona el numero que corresponda.\n1-Ver lista completa\n2-Ver carrito\n3-Cerrar sesion");
        if (menu == '3'){
            alert("Finalizando la sesion");
        }
    }
    if(carrito.length){
        alert("Ha pagado un total de $"+suma+"\nSe ha enviado el comprobante de pago a "+user.mail);
    }else{
        alert("Te fuiste sin comprar :(");
    }
}else{
    alert("Usuario bloqueado.\nSe ha enviado un correro para desbloquearlo a "+user.mail);
}