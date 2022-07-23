let btnCrear = document.getElementById("btn-crear");
let btnBorrar = document.getElementById("btn-borrar");
let formulario = document.getElementById("formulario");

// control de boton que activa formulario
const estadoFormulario = {
    mostrar: false
}

btnCrear.onclick = (e) => {
    e.preventDefault();
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


let listaProductos = [
    { nombre: `SMART TV SAMSUNG SERIES 7 LED 4K 50"`, precio: 80000 },
    { nombre: "NOTEBOOK DELL INSPIRON 3502", precio: 83599 },
    { nombre: "CELULAR SAMSUNG A51 128GB", precio: 64000 },
    { nombre: "MEMORIA RAM FURY BEAST DDR4 8GB", precio: 7300 },
];

// Función para agregar producto al array nuevo con value de inputs
const agregarProducto = () => {
    let nombre = document.getElementById("nombre").value;
    nombre = nombre.toUpperCase();
    let precio = document.getElementById("precio").value;

    let productoNuevo = new Producto(nombre, precio);
    listaProductos.unshift(productoNuevo);
    return productoNuevo;
}


let btnAgregar = document.getElementById("agregar");

// se crea la card con el contenido del formulario
btnAgregar.onclick = (e) => {
    document.getElementById("main-cards").innerHTML = "";
    e.preventDefault();
    agregarProducto();
    if (nombre != "" && precio != 0) {
        listaProductos.forEach(elemento => {
            let nodo = document.createElement("div")
            nodo.setAttribute("class", "card");
            nodo.setAttribute("style", "width: 18rem;");
            nodo.innerHTML = `
            <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="${elemento.nombre}">
            <div class="card-body" id="card-body">
            <h5 class="card-title">${elemento.nombre}</h5>
            <p class="card-text">$${elemento.precio}</p>
            <a href="#" class="btn btn-primary">Añadir al carrito</a>
            `
            document.getElementById("main-cards").appendChild(nodo);
        })
    }
}

// Crea las cards de los productos del array ya declarados desde el inicio
listaProductos.forEach(elemento => {
    let nodo = document.createElement("div")
    nodo.setAttribute("class", "card");
    nodo.setAttribute("style", "width: 18rem;");
    nodo.innerHTML = `
    <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="${elemento.nombre}">
    <div class="card-body" id="card-body">
    <h5 class="card-title">${elemento.nombre}</h5>
    <p class="card-text">$${elemento.precio}</p>
    <a href="#" class="btn btn-primary">Añadir al carrito</a>
    `
    document.getElementById("main-cards").appendChild(nodo);
})