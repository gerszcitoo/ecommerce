let btnCrear = document.getElementById("btn-crear");
let formulario = document.getElementById("formulario");
let navLogin = document.getElementById("nav-login");
let insertUser = document.getElementById("user-profile");
let prodComprados = document.getElementById("prod-comprados");
//-----------USO DE API-----------
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
  admin: false,
};

// ----------CONDICIONAL SI ES ADMIN-----------
if (adminLogin.admin) {
  navLogin.innerText = "Cerrar Sesión";
  let vistaVendedor = document.getElementById("vista-vendedor");
  vistaVendedor.innerHTML = "(vista del vendedor)";
  formulario.style.display = "none";
  insertUser.innerHTML = `
                <p id="user-name">Hola, Administrador</p>
                <img src="./assets/img/default-user-img.png" id="user-pic">
                `;
} else {
  // si adminLogin.admin == false, muestra usuario
  // oculta botón de crear producto
  btnCrear.style.display = "none";
  const crearUsuario = () => {
    let nombreUser = JSON.parse(sessionStorage.getItem("nombreUser"));
    let apellidoUser = JSON.parse(sessionStorage.getItem("apellidoUser"));
    let fotoUser = JSON.parse(sessionStorage.getItem("fotoUser"));
    insertUser.innerHTML = `
                <p id="user-name">Hola, ${nombreUser} ${apellidoUser}</p>
                <img src="${fotoUser}" id="user-pic">
                `;
  };
  if (sessionStorage.getItem("nombreUser") != null) {
    crearUsuario();
  } else {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((resultado) => {
        // manda perfil a sessionStorage
        let apiNombre = resultado.results[0].name.first;
        let apiApellido = resultado.results[0].name.last;
        let apiFoto = resultado.results[0].picture.medium;
        sessionStorage.setItem("nombreUser", JSON.stringify(apiNombre));
        sessionStorage.setItem("apellidoUser", JSON.stringify(apiApellido));
        sessionStorage.setItem("fotoUser", JSON.stringify(apiFoto));
        // generar html con API
        insertUser.innerHTML = `
                <p id="user-name">Hola, ${apiNombre} ${apiApellido}</p>
                <img src="${apiFoto}" id="user-pic">
                `;
      })
      .catch(
        (error) => console.log(error),
        (insertUser.innerHTML = `
            <p id="user-name">Cargando usuario...</p>
            <img src="./assets/img/default-user-img.png" id="user-pic">
            `)
      );
  }
}

// ---------FORMULARIO---------
// control de boton que activa formulario
const estadoFormulario = {
  mostrar: false,
};

btnCrear.onclick = (e) => {
  e.preventDefault();
  console.log(adminLogin.admin);
  if (estadoFormulario.mostrar) {
    btnCrear.innerText = "Crear un producto";
    formulario.style.display = "none";
    estadoFormulario.mostrar = false;
    console.log(estadoFormulario);
  } else {
    btnCrear.innerText = "Cancelar";
    formulario.style.display = "flex";
    estadoFormulario.mostrar = true;
    console.log(estadoFormulario);
  }
};

// control de agregado de productos
class Producto {
  constructor(nombre, precio, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
  }
}

let crearProd = document.getElementById("btn-crear");

// lee el localStorage y si está vacío le asigna productos por default
// operador ternario
const listaProductos = JSON.parse(localStorage.getItem("productos")) || [
  { nombre: `SMART TV SAMSUNG SERIES 7 LED 4K 50"`, precio: 80000, id: 1 },
  { nombre: "NOTEBOOK DELL INSPIRON 3502", precio: 83599, id: 2 },
  { nombre: "CELULAR SAMSUNG A51 128GB", precio: 64000, id: 3 },
  { nombre: "MEMORIA RAM FURY BEAST DDR4 8GB", precio: 7300, id: 4 },
];

// Función para agregar producto al array nuevo con value de inputs
let id = 4;
const agregarProducto = () => {
  let nombre = document.getElementById("nombre").value;
  nombre = nombre.toUpperCase();
  let precio = document.getElementById("precio").value;
  id++;
  console.log("el id es: " + id);
  let productoNuevo = new Producto(nombre, precio, id);
  listaProductos.unshift(productoNuevo);

  // guarda el producto en el localStorage
  localStorage.setItem("productos", JSON.stringify(listaProductos));
  return productoNuevo;
};

// crea array del carrito

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let btnAgregar = document.getElementById("agregar");
// ..................
let idProd = 0;
// se crea la card con el contenido del formulario
btnAgregar.onclick = (e) => {
  e.preventDefault();
  if (nombre.value != "" && precio.value != "") {
    document.getElementById("main-cards").innerHTML = "";
    agregarProducto();
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    listaProductos.forEach((elemento) => {
      idProd++;
      let nodo = document.createElement("div");
      nodo.setAttribute("class", "card");
      nodo.setAttribute("style", "width: 18rem;");
      nodo.innerHTML = `
                <a class="close-icon" id="delete${idProd}"><i class="fa-solid fa-xmark"></i></a>
                <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="${elemento.nombre}">
                <div class="card-body" id="card-body">
                    <h5 class="card-title">${elemento.nombre}</h5>
                    <p class="card-text">$${elemento.precio}</p>
                    <button class="btn btn-primary" id="button${idProd}">Añadir al carrito</button>
                </div>
            `;
      document.getElementById("main-cards").appendChild(nodo);
      const addToCart = document.getElementById(`button${idProd}`);
      const deleteProduct = document.getElementById(`delete${idProd}`);
      console.log(elemento.id);

      addToCart.addEventListener("click", () => {
        // modifica navbar
        contadorProductos++;
        contadorProd();
        // Agrega al array carrito el producto y lo sube a localStorage
        carrito.unshift(elemento);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        Swal.fire("Agregaste: " + elemento.nombre);
        console.log(`clickeado ${elemento.id}`);
      });
      deleteProduct.addEventListener("click", () => {
        let deleteIndex = listaProductos.findIndex(function (product) {
          return product.nombre === elemento.nombre;
        });
        if (deleteIndex !== -1) {
          listaProductos.splice(deleteIndex, 1);
          document.getElementById("main-cards").removeChild(nodo);
          localStorage.setItem("productos", JSON.stringify(listaProductos));
        }
      });
    });
  } else {
    Swal.fire("Por favor, ingrese un valor en ambos campos");
  }
};

// ------NUMERO CARRITO EN NAVBAR----------
let contadorProductos = localStorage.getItem("prod-comprados");

function contadorProd() {
  prodComprados.innerHTML = `${contadorProductos}`;
  prodComprados.style.display = "block";
  localStorage.setItem("prod-comprados", contadorProductos);
}
if (contadorProductos > 0 && contadorProductos != undefined) {
  contadorProd();
} else {
  prodComprados.style.display = "none";
}

// Crea las cards de los productos del array ya declarados desde el inicio
listaProductos.forEach((elemento) => {
  idProd++;
  let nodo = document.createElement("div");
  nodo.setAttribute("class", "card");
  nodo.setAttribute("style", "width: 18rem;");
  nodo.innerHTML = `
        <a class="close-icon" id="delete${idProd}"><i class="fa-solid fa-xmark"></i></a>
        <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="${elemento.nombre}">
        <div class="card-body" id="card-body">
            <h5 class="card-title">${elemento.nombre}</h5>
            <p class="card-text">$${elemento.precio}</p>
            <button class="btn btn-primary" id="button${idProd}">Añadir al carrito</button>
        </div> 
        `;
  document.getElementById("main-cards").appendChild(nodo);
  const addToCart = document.getElementById(`button${idProd}`);
  const deleteProduct = document.getElementById(`delete${idProd}`);
  console.log(elemento.id);

  addToCart.addEventListener("click", () => {
    // modifica navbar
    contadorProductos++;
    contadorProd();
    // Agrega al array carrito el producto y lo sube a localStorage
    carrito.unshift(elemento);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire("Agregaste: " + elemento.nombre);
    console.log(`clickeado ${elemento.id}`);
  });

  deleteProduct.addEventListener("click", () => {
    let deleteIndex = listaProductos.findIndex(function (product) {
      return product.nombre === elemento.nombre;
    });
    if (deleteIndex !== -1) {
      listaProductos.splice(deleteIndex, 1);
      document.getElementById("main-cards").removeChild(nodo);
      localStorage.setItem("productos", JSON.stringify(listaProductos));
    }
  });
});
