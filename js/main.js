class bookData {
    constructor(titulo, precio, autor, region, isbn, imagen){
        this.title = titulo;
        this.price = precio;
        this.author = autor;
        this.region = region;
        this.isbn = isbn;
        this.image = imagen;
    }
}

const books = [
    {
        title: "Folgstagt el Eterno",
        price: 4299.90,
        author: "Octopus Savinola",
        region: "Frozeros",
        isbn: 9781862188815,
        image: "Octopus.png",
    },
    {
        title: "Los Exiliados",
        price: 3200,
        author: "Jean Pierre Chevallier",
        region: "Reinos Sureños",
        isbn: 9781537367682,
        image: "Exiles.png",
    },
    {
        title: "La Piramide Negra",
        price: 3999.90,
        author: "Augustus Nataliovsky",
        region: "Shularan",
        isbn: 9781091526624,
        image: "Piramide.png",
    },
    {
        title: "Mas Grande de lo Normal",
        price: 3600,
        author: "Efraim Merluzki",
        region: "Las Marcas Libres",
        isbn: 9781592241842,
        image: "placeholder.jpg",
    },
    {
        title: "Arena y Sangre",
        price: 4300,
        author: "Efraim Merluzki",
        region: "Shularan",
        isbn: 9781156617168,
        image: "placeholder.jpg",
    },
    {
        title: "Thruum Blodhorn",
        price: 2300,
        author: "Francis Prattford",
        region: "Reinos del Norte",
        isbn: 9781112698880,
        image: "placeholder.jpg",
    },
    {
        title: "Clapper",
        price: 2800,
        author: "Augutus Nataliovsky",
        region: "Las Marcas Libres",
        isbn: 9781824012653,
        image: "placeholder.jpg",
    },
    {
        title: "La Caida de Farendor",
        price: 4000,
        author: "Jean Pierre Chevallier",
        region: "Reinos del Oeste",
        isbn: 9781742311548,
        image: "placeholder.jpg",
    },
    {
        title: "Titanomaquius",
        price: 3700,
        author: "Leonardo Fotunosa",
        region: "Antiguas Polis Kandoricas",
        isbn: 9781527828339,
        image: "placeholder.jpg",
    },
    {
        title: "Guerra Darkin: Tomo 1",
        price: 4100,
        author: "Efraim Merluzki",
        region: "Shularan",
        isbn: 9781129907609,
        image: "placeholder.jpg",
    },
];

function crearHTML(array) {
    // Vaciar html
    let html = "";
    contenedor.innerHTML = "";
    // Construir html
    for (let i = 0; i < array.length; i++) {
      // Agregar un nuevo div con la clase "row" cada 5 elementos
      if (i % 5 === 0) {
        html += '<div class="row my-3 main__books__fila">';
      }
      const book = array[i];
      html += `
        <div class="col">
          <img src="./img/${book.image}" alt="${book.title}">
          <p>
            ${book.title}
          </p>
          <p>
            $ ${book.price}             
          </p>
          <button type="button" class="btn main__books__btn" id="${book.isbn}">Agregar al carrito</button>
        </div>
      `;
      // Cerrar el div con la clase "row" después del quinto elemento
      if (i % 5 === 4 || i === array.length - 1) {
        html += '</div>';
      }
    }
    contenedor.innerHTML = html;
  }
  

//Llamo a la funcion
crearHTML(books);

//Listeners








































/*let books = bookData;

function books (titulo, precio, autor, region, isbn, img){
    this.title = titulo;
    this.price = precio;
    this.author = autor;
    this.region = region;
    this.isbn = isbn;
    //Si imagen es un string vacio setea this.img en la imagen defaulta asignada en la url, si no lo setea en el valor que tenga img
    img = "" ? (this.img = `https://thealmanian.com/wp-content/uploads/2019/01/product_image_thumbnail_placeholder.png`) : (this.img = img);
}

function guardarLS(arr){
    localStorage.setItem("bookData", JSON.stringify(arr));
}

function crearHTML(arr) {
    tbody.innerHTML = "";

    let html="";
    for (const item of arr){
        const{img, title, price} = item;
        html = `<tr>
        <td>${img}</td>
        <td>${title}</td>
        <td>${price}</td>
        </tr>`;
        tbody.innerHTML += html;
    }*/
    /*Adicion de libros a la vista*/
    /*const arrayBtns = document.querySelectorAll(".main__books__btn");
    arrayBtns.forEach((main__books__btn) => {
        main__books__btn.addEventListener("click", () =>{
            books = books.filter((el) => el.isbn == main__books__btn.id);
            guardarLS(books);
            crearHTML(books);
        });
    });
}


crearHTML(books);*/



































































































/*function comprobacion (dato, datoAct, datoRequerido){
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
}*/

/*const findBook = (arr, filtro) =>{
    const encontrado = arr.find((el)=>{
        return el.name.includes(filtro); //Mediante el include no es necesario ingresar el nombre completo del libro en este caso
    })
} De momento no es necesario para la cantidad de libros que hay*/

/*class userData {
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
                    if (suma == 0) {
                        for (let i=0; i < carrito.length; i++){
                            suma += carrito[i].price;
                        }
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
        if (suma == 0) {
            for (let i=0; i < carrito.length; i++){
                suma += carrito[i].price;
            }
        }
        alert("Ha pagado un total de $"+suma+"\nSe ha enviado el comprobante de pago a "+user.mail);
    }else{
        alert("Te fuiste sin comprar :(");
    }
}else{
    alert("Usuario bloqueado.\nSe ha enviado un correro para desbloquearlo a "+user.mail);
}*/