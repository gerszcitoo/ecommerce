// -----------VISTA ADMIN---------
let btnCrear = document.getElementById("btn-crear");
let formulario = document.getElementById("formulario");
let navLogin = document.getElementById("nav-login");

//-----------USO DE API-----------

const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}

if (adminLogin.admin) {
    navLogin.innerText = "Cerrar Sesión";
} else {
    // si adminLogin.admin == false, muestra usuario
    let insertUser = document.getElementById("user-profile");

    // función para generar html con API
    const generateUser = async() => {
        try {
            let response = await fetch('https://randomuser.me/api/');
            let resultado = await response.json();
            console.log(resultado.results[0]);
            insertUser.innerHTML = `
        <p id="user-name">Hola, ${resultado.results[0].name.first} ${resultado.results[0].name.last}</p>
        <img src="${resultado.results[0].picture.medium}" id="user-pic">
        `
        } catch (error) {
            console.log(error);
        }
    }

    window.onload = generateUser();
}

// ---------FORMULARIO---------
// control de boton que activa formulario
const estadoFormulario = {
    mostrar: false
}

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
        formulario.style.display = "block";
        estadoFormulario.mostrar = true;
        console.log(estadoFormulario);
    }
}


// control de agregado de productos
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

let crearProd = document.getElementById("btn-crear");

// lee el localStorage y si está vacío le asigna productos por default
// operador ternario
const listaProductos = JSON.parse(localStorage.getItem("productos")) || [
    { nombre: `SMART TV SAMSUNG SERIES 7 LED 4K 50"`, precio: 80000 },
    { nombre: "NOTEBOOK DELL INSPIRON 3502", precio: 83599 },
    { nombre: "CELULAR SAMSUNG A51 128GB", precio: 64000 },
    { nombre: "MEMORIA RAM FURY BEAST DDR4 8GB", precio: 7300 },
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];



// Función para agregar producto al array nuevo con value de inputs
const agregarProducto = () => {
    let nombre = document.getElementById("nombre").value;
    nombre = nombre.toUpperCase();
    let precio = document.getElementById("precio").value;

    let productoNuevo = new Producto(nombre, precio);
    listaProductos.unshift(productoNuevo);

    // guarda el producto en el localStorage
    localStorage.setItem("productos", JSON.stringify(listaProductos));

    return productoNuevo;
}

// Guardar productos agregados en localstorage


let btnAgregar = document.getElementById("agregar");
// se crea la card con el contenido del formulario
btnAgregar.onclick = (e) => {
    e.preventDefault();
    if (nombre.value != "" && precio.value != "") {
        document.getElementById("main-cards").innerHTML = "";
        agregarProducto();
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        listaProductos.forEach(elemento => {
            let nodo = document.createElement("div")
            nodo.setAttribute("class", "card");
            nodo.setAttribute("style", "width: 18rem;");
            nodo.innerHTML = `
            <a id="btn-borrar"><i class="fa-solid fa-xmark close-icon"></i></a>
            <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="${elemento.nombre}">
            <div class="card-body" id="card-body">
            <h5 class="card-title">${elemento.nombre}</h5>
            <p class="card-text">$${elemento.precio}</p>
            <a href="#" class="btn btn-primary">Añadir al carrito</a>
            `
            document.getElementById("main-cards").appendChild(nodo);
        })
    } else {
        Swal.fire("Por favor, ingrese un valor en ambos campos");
    }
}

// Crea las cards de los productos del array ya declarados desde el inicio
listaProductos.forEach(elemento => {
    let nodo = document.createElement("div")
    nodo.setAttribute("class", "card");
    nodo.setAttribute("style", "width: 18rem;");
    nodo.innerHTML = `
    <a id="btn-borrar"><i class="fa-solid fa-xmark close-icon"></i></a>
    <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="${elemento.nombre}">
    <div class="card-body" id="card-body">
    <h5 class="card-title">${elemento.nombre}</h5>
    <p class="card-text">$${elemento.precio}</p>
    <a href="#" class="btn btn-primary">Añadir al carrito</a>
    `
    document.getElementById("main-cards").appendChild(nodo);
})