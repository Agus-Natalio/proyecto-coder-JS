let books = [];

//Hago un fetch de libros.json y lo transformo en un array
const getBooksAsync = async () => {
    try {
        let response = await fetch('./data/libros.json');
        let data = await response.json();
        // Proceso los datos de json y los paso a books
        processBooks(data);
        // Establezco una promesa que se resuelve leugo de 3 segundos
        const loadingBooks = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
        // Espero a que se resuelva la promesa antes de ejecutar la función crearHTML
        await loadingBooks;
        crearHTML(books);
        //Listeners para los botones de añadir al carrito
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
        search.addEventListener('input', ()=> {
            loadingFilter();
            setTimeout (()=>{
                let newFilter = filtrar(books, search.value, 'title');
                if (newFilter.length > 0){
                    crearHTML(newFilter);
                }else{
                    errorMsgFilter();
                }
            },1000);
        });
    }catch(error){
        // Si hay un error, llamo a la función errorMsgList()
        errorMsgList();
    };
};

//Procesa los datos y los almacena la variable tipo array books
function processBooks(data) {
    books = data; 
};

//Invoco a la funcion principal
getBooksAsync();

//Mensaje de error lista
function errorMsgList() {
    contenedor.innerHTML = `
        <p class="loadingError">Ha ocurrido un error al cargar la pagina.<br>Le recomendamos esperar unos minutos antes de volver a entrar mientras solventamos esta crisis.</p>
    `
}

//Mensaje de error filtro
function errorMsgFilter() {
    contenedor.innerHTML =`
        <p class="loadingError">No encontramos el libro que estas buscando</p>
    `
}

//Funcion de carga para el filtro
function loadingFilter() {
    contenedor.innerHTML = `
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `
}

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
};

//Manipulacion del DOM
async function crearHTML(array) {
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
    contenedor.innerHTML += html;
};
//Simulacion de carga mediante promesas
/*let productos = []
const cargaLibros = (arr)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(arr);
        }, 1000);
    });
        cargaLibros(data)
    .then((response)=>{
        productos = response;
        crearHTML(productos);
    })
    .catch(()=>{
        errorMsg();
    });
};
*/

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
        arrayEraseBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
              const index = cart.findIndex((el) => el.isbn == btn.id);
              if (index !== -1) {
                cart.splice(index, 1);
                guardarLS(cart);
              }
              if (cart.length >= 1) {
                crearCart(cart);
              } else {
                const html = "<p>Aun no has agregado ningun libro al carrito</p>";
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

//Pagar items del carrito
const pagarBotonCart = document.getElementById('pagar-cart');
function pagarCart () {
    //Vaciar HTML del carrito, local storage y array cart
    if (usuarioActivo != null && Object.keys(usuarioActivo).length > 0) {
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
        //Construccion del html default del carrito
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
            <button type="button" class="btn loggedUser-btn" id="userNameBtn">${usuarioActivo.nombre}</button>
            <button type="button" class="btn loggedUser-btn dpBtn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item disabled" href="#"><i class='bx bx-user' ></i> Mi Perfil</a></li>
                <li><a class="dropdown-item disabled" href="#"><i class='bx bx-receipt'></i> Historial de compras</a></li>
                <li><a class="dropdown-item disabled" href="#"><i class='bx bxs-magic-wand' ></i> Mas sobre Tales of Norion™</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" id="logOut"><i class='bx bx-power-off' ></i> Cerrar Sesion</a></li>
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

//Agregado de swal2 a parte
const botonNombreUsuario = document.querySelector('#userNameBtn')
botonNombreUsuario.addEventListener('click', ()=>{
    Swal.fire({
        icon: 'info',
        title: 'En desarrollo',
        text: 'Proximamente te redireccionara a tu perfil!',
    })
})