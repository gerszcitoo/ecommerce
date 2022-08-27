let insertUser = document.getElementById("user-profile");
let carritoContainer = document.getElementById("cart-container");


//-----------USO DE API-----------
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}

// ----------CONDICIONAL SI ES ADMIN-----------
if (adminLogin.admin) {
    navLogin.innerText = "Cerrar Sesión";
    let vistaVendedor = document.getElementById("vista-vendedor");
    vistaVendedor.innerHTML = "(vista del vendedor)";
    formulario.style.display = "none";
    insertUser.innerHTML = `
                <p id="user-name">Hola, Administrador</p>
                <img src="./assets/img/default-user-img.png" id="user-pic">
                `
} else {
    const crearUsuario = () => {
        let nombreUser = JSON.parse(sessionStorage.getItem("nombreUser"));
        let apellidoUser = JSON.parse(sessionStorage.getItem("apellidoUser"));
        let fotoUser = JSON.parse(sessionStorage.getItem("fotoUser"));
        insertUser.innerHTML = `
                <p id="user-name">Hola, ${nombreUser} ${apellidoUser}</p>
                <img src="${fotoUser}" id="user-pic">
                `
    }
    if (sessionStorage.getItem("nombreUser") != null) {
        crearUsuario();
    } else {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(resultado => {
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
                `
            })
            .catch(error => console.log(error), insertUser.innerHTML = `
            <p id="user-name">Cargando usuario...</p>
            <img src="./assets/img/default-user-img.png" id="user-pic">
            `)
    }
}

// -----------FUNCIONALIDAD CARRITO-------------
const carritoCompleto = JSON.parse(localStorage.getItem("carrito")) || [];
carritoCompleto.forEach(producto => {
    let prodCarrito = document.createElement("div");
    prodCarrito.innerHTML = `
                        <div class="cart-item">
                            <p class="card-title">${producto.nombre}</p>
                            <p class="card-text">$${producto.precio}</p>
                            <button class="btn btn-danger btn-sm" id="borrar${producto.id}">x</button>
                        </div>
                        `
    carritoContainer.appendChild(prodCarrito);
    let btnBorrar = document.getElementById(`borrar${producto.id}`);
    btnBorrar.addEventListener('click', (e) => {
        borrarProductos(e);
        // console.log(carritoCompleto.splice(producto.id, 1));
        // localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
    })
})

function borrarProductos(e) {
    let botonBorrarClick = e.target;
    botonBorrarClick.parentElement.remove();
}


// ----------CARRITO VACÍO---------
if (carritoCompleto === undefined || carritoCompleto.length == 0) {
    carritoContainer.innerHTML = `
                                <h3>El carrito está vacío</h3>
                                <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                `
}

/* const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cart = (productoId) => {
    console.log("llegue a cart.js")
    const cartContainer = document.getElementById("cart-container");
    const mostrarCarrito = () => {
        let producto = listaProductos.find(producto => elemento.id == productoId);
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        let div = document.createElement("div");
        div.classList.add("lista-productos")
        div.innerHTML = `
                        <p class="card-title">${producto.nombre}</p>
                        <p class="card-text">$${producto.precio}</p>
                        <button class="btn btn-danger btn-sm" id="borrar${producto.id}">x</button>
                    `
        cartContainer.appendChild(div);
        let btnBorrar = document.getElementById(`borrar${producto.id}`);
        btnBorrar.addEventListener('click', (e) => {
            borrarProductos(e);
        })
    }
    mostrarCarrito();
}

function borrarProductos(e) {
    let botonBorrarClick = e.target;
    botonBorrarClick.parentElement.remove();
} */