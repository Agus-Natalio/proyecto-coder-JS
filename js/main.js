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

const cart = [];

/* FUNCIONES */
//Local Storage
function guardarLS(arr) {
    localStorage.setItem("booksCart", JSON.stringify(arr))
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
function crearCart(array) {
    //Vaciar HTML
    let html= "";
    contCart.innerHTML= "";
    //Construir HTML
    for (const book of array) {
        html =
        `
        <li>
        <div class="product-item">
          <img src="./img/${book.image}" alt="Piramide Negra">
          <div class="product-info">
            <p class="product-title">${book.title}</p>
            <p class="product-price">$${book.price}</p>
          </div>
        </div>
        </li>
        <li><hr class="dropdown-divider"></li>
        `;
        //Establece un divisor entre cada libro del carrito
        contCart.innerHTML += html;
    }
};

let addBook = [];

const arrayBtns = document.querySelectorAll(".btn__compra");
arrayBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        const addBook = books.find((el)=> el.isbn == btn.id);
        console.log(addBook);
        cart.push(addBook);
        guardarLS(cart);
        crearCart(cart);
        Toastify({
            text: "Se agrego el libro al carrito",
            duration: 3000,
            position: "left",   
            style: {
                background: "rgb(41, 187, 12)"
            }, 
            }).showToast();
    });
});