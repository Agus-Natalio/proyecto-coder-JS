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
        image: "SapoGrande.png",
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

let cart = [];

/* FUNCIONES */
//Local Storage
function guardarLS(arr) {
    localStorage.setItem("booksCart", JSON.stringify(arr))
}

function usuarioLogueado() {
    const usuarioActivo =JSON.parse(localStorage.getItem('usuarioActivo'));
    return usuarioActivo;
};

//Filtros
function filtrar(arr, filtro, parametro) {
    return arr.filter((el)=> {
        return el[`${parametro}`].toLowerCase().includes(filtro.toLowerCase());
    });
}

//Manipulacion del DOM
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
      <button type="button" class="btn main__books__btn btn__compra" id="${book.isbn}">Agregar al carrito</button>
      </div>
      `;
      // Cerrar el div con la clase "row" después del quinto elemento
      if (i % 5 === 4 || i === array.length - 1) {
          html += '</div>';
        }
    }
    contenedor.innerHTML = html;
};

//Llamo a la funcion
crearHTML(books);

//Seguimos con funciones y listeners
let totalPrice = 0;
function crearCart(array) {
    //Vaciar HTML
    let html= "";
    contCart.innerHTML= "";
    totalPrice = 0;
    //Construir HTML
    for (const book of array) {
        html =
        `
        <li>
        <div class="product-item">
          <img src="./img/${book.image}" alt=${book.title}>
          <div class="product-info">
            <p class="product-title">${book.title}</p>
            <p class="product-price">$${book.price}</p>
            <div class="product-spacer"></div>
            <div class="product-erase">
              <button type="button" class="btn btn-danger product-btn" id="${book.isbn}">X</button>
            </div>
          </div>
        </div>
        </li>
        <hr>
        `;
        contCart.innerHTML += html;
        totalPrice += book.price;
        //Eliminar un item del carrito (Va dentro de la funcion para asegurarme de que el boton ya existe en el DOM antes de agregar el evento)
        const arrayEraseBtns = document.querySelectorAll(".product-btn");
        arrayEraseBtns.forEach((btn)=>{
            btn.addEventListener('click', ()=>{
                cart = cart.filter((el) => el.isbn != btn.id)
                guardarLS(cart);
                if (cart.length >= 1){
                    crearCart(cart);
                }else{
                    html = "<p>Aun no has agregado ningun libro al carrito</p>"
                    contCart.innerHTML = html;
                }
                console.log(cart);
            });
        });
    };
    // Agregar HTML para mostrar la suma total si esta es distinta de 0
    if (totalPrice > 0) {
        totalPrice = parseFloat(totalPrice.toFixed(2));
        const totalCart = document.createElement('span');
        totalCart.classList.add('total-cart');
        totalCart.textContent = `Total a pagar: $${totalPrice}`;
        contCart.appendChild(totalCart);
    }
};
const arrayBtns = document.querySelectorAll(".btn__compra");
arrayBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        if (cart.length == 0 && localStorage.getItem('booksCart') != null) {
            cart = JSON.parse(localStorage.getItem('booksCart'))
        }
        const addBook = books.find((el)=> el.isbn == btn.id);
        cart.push(addBook);
        guardarLS(cart);
        crearCart(cart);
        Toastify({
            text: "Se agrego el libro al carrito",
            duration: 3000,
            position: "left",   
            style: {
                background: "rgb(30, 122, 11)"
            }, 
            }).showToast();
    });
});

//Pagar items del carrito
const pagarBotonCart = document.getElementById('pagar-cart');
function pagarCart () {
    //Vaciar HTML del carrito, local storage y array cart
    if (usuarioActivo != null) {
        if (cart.length == 0) {
            swal("Oops!", "El carrito esta vacio", "error");
        }else{
            let html = "";
            contCart.innerHTML = "";
            localStorage.removeItem('booksCart');
            cart = [];
            html = `
                <p>Aun no has agregado ningun libro al carrito</p>
            `
            contCart.innerHTML += html;
            swal("Compra exitosa!", "se ha enviado un comprobante a "+usuarioActivo.email, "success");
        }
    }else{
        swal("Oops!", "Necesitas una cuenta para utilizar esta funcionalidad", "warning");
    };
};
pagarBotonCart.addEventListener('click', pagarCart);

//Vaciar completamente el carrito
const vaciarBotonCart = document.getElementById('vaciar-cart');
function vaciarCart() {
    //Vaciar HTML del carrito, local storage y array cart
    let html = "";
    contCart.innerHTML = "";
    if (localStorage.getItem('booksCart') != null){
        localStorage.removeItem('booksCart');
        cart= [];
        //Construccion del html deafult del carrito
        html = 
        `
            <p>Aun no has agregado ningun libro al carrito</p>
        `
        contCart.innerHTML += html;
        Toastify({
          text: 'Se eliminaron los libros del carrito',
          duration: 3000,
          position: 'left',
          style: {
            background: '#a81120',
          },
        }).showToast();
    }else{
        html = 
        `
            <p>Aun no has agregado ningun libro al carrito</p>
        `
        contCart.innerHTML += html;
        Toastify({
            text: 'Aun no agregaste nada al carrito',
            duration: 3000,
            position: 'left',
            style: {
              background: 'rgb(184, 181, 0)',
            },
          }).showToast();
    }
}
vaciarBotonCart.addEventListener('click', vaciarCart);

//Reconstruccion del carrito al salir y volver a la vista principal
if (localStorage.getItem('booksCart') != null && JSON.parse(localStorage.getItem('booksCart')).length > 0) {
    console.log(cart);
    cart = JSON.parse(localStorage.getItem('booksCart'));
    crearCart(cart);
};

//Cambio del DOM al hacer log in
let usuarioActivo = usuarioLogueado();
if (usuarioActivo != null || usuarioActivo != {}) {
    document.querySelector('#logInfo').innerHTML = `
        <div class="btn-group">
            <button type="button" class="btn loggedUser-btn">${usuarioActivo.nombre}</button>
            <button type="button" class="btn loggedUser-btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item disabled" href="#">Mi Perfil</a></li>
                <li><a class="dropdown-item disabled" href="#">Historial de compras</a></li>
                <li><a class="dropdown-item disabled" href="#">Mas sobre Tales of Norion™</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" id="logOut">Cerrar Sesion</a></li>
            </ul>
        </div>
    `;
    crearCart(cart);
};
//Cambio del DOM al hacer log out
const logOut = document.querySelector('#logOut')
logOut.addEventListener('click', () =>{
    swal("Se ha cerrado tu sesion", "Esperamos verte de nuevo "+usuarioActivo.nombre+"!", "warning");
    usuarioActivo = {};
    localStorage.removeItem('usuarioActivo');
    document.querySelector('#logInfo').innerHTML = `
    <a href="./vistas/logForm.html" class="nav-item header__nav__links__btn">
        <span class="span1"></span>
        <span class="span2"></span>
        <span class="span3"></span>
        <span class="span4"></span>
        Log In
    </a>
    ` ;
})

//Listeners de busqueda
search.addEventListener('input', ()=> {
    let newFilter = filtrar(books, search.value, 'title');
    crearHTML(newFilter);
});