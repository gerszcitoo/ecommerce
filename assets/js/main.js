class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

let listaProductos = [
    { nombre: `SMART TV SAMSUNG SERIES 7 LED 4K 50"`, precio: 80000 },
    { nombre: "NOTEBOOK DELL INSPIRON 3502", precio: 83599 },
    { nombre: "CELULAR SAMSUNG A51 128GB", precio: 64000 },
    { nombre: "MEMORIA RAM FURY BEAST DDR4 8GB", precio: 7300 }
];

const agregarProducto = () => {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;

    let productoNuevo = new Producto(nombre, precio);
    listaProductos.push(productoNuevo);
    return productoNuevo;
}

listaProductos.forEach(elemento => {
    let nodo = document.createElement("div")
    nodo.setAttribute("class", "card");
    nodo.innerHTML = `
    <img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="...">
    <div class="card-body" id="card-body">
    <h5 class="card-title">${elemento.nombre}</h5>
    <p class="card-text">$${elemento.precio}</p>
    <a href="#" class="btn btn-primary">Añadir al carrito</a>
    `
    document.getElementById("card-body").appendChild(nodo);
})

let btnAgregar = document.querySelector("#agregar");

btnAgregar.addEventListener("click", agregarProducto());

/* function agregarProducto() {
    let imgCard = document.createElement("img");
    imgCard.setAttribute("class", "card-img-top");
    imgCard.setAttribute("src", "https://dummyimage.com/600x400/000/fff");
    document.getElementById("card").appendChild(imgCard);

    console.log(imgCard);

    let titleCard = document.createElement("h5");
    titleCard.setAttribute("class", "card-title");
    titleCard.innerText = prompt("Nombre de producto");
    document.getElementById("card-body").appendChild(titleCard);

    let precioCard = document.createElement("p");
    precioCard.setAttribute("class", "card-text");
    precioCard.innerText = ("$" + prompt("Precio del producto"));
    document.getElementById("card-body").appendChild(precioCard);

    let btnCompra = document.createElement("a");
    btnCompra.setAttribute("class", "btn btn-primary");
    btnCompra.innerText = ("Añadir al carrito");
    document.getElementById("card-body").appendChild(btnCompra);
} */