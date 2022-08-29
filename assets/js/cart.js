let insertUser = document.getElementById("user-profile");
let navLogin = document.getElementById("nav-login");
let carritoContainer = document.getElementById("cart-container");
let confirmaCompra = document.getElementById("confirma-compra");
let totalCarrito = document.getElementById("total");
let sumaTotal = 0;
//=========== USO DE API ===========
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}

// ========= CONDICIONAL SI ES ADMIN ==========
if (adminLogin.admin) {
    navLogin.innerText = "Cerrar Sesión";
    insertUser.innerHTML = `
                <p id="user-name">Hola, Administrador</p>
                <img src="../assets/img/default-user-img.png" id="user-pic">
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

// ======== NUMERO CARRITO EN NAVBAR ===========
let prodComprados = document.getElementById("prod-comprados");
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

// ============ FUNCIONALIDAD CARRITO =============
let idProd = 0;
const carritoCompleto = JSON.parse(localStorage.getItem("carrito")) || [];
carritoCompleto.forEach(producto => {
    let prodCarrito = document.createElement("div");
    // da ID unico a cada elemento
    if (carritoCompleto.length > 0) {
        idProd++;
    }
    prodCarrito.innerHTML = `
                                <div class="cart-item">
                                    <p class="card-title">${producto.nombre}</p>
                                    <p class="card-text">$${producto.precio}</p>
                                    <button class="btn btn-danger btn-sm elim-prod" id="borrar${idProd}">x</button>
                                </div>
                                `
    let precio = parseInt(producto.precio);
    sumaTotal = sumaTotal + precio;
    carritoContainer.appendChild(prodCarrito);
    let btnBorrar = document.getElementById(`borrar${idProd}`);
    btnBorrar.addEventListener('click', (e) => {
        // modifica navbar
        sumaTotal = sumaTotal - precio;
        calcTotal();
        contadorProductos--;
        contadorProd();
        if (contadorProductos <= 0 || contadorProductos == undefined) {
            prodComprados.style.display = "none";
            localStorage.setItem("prod-comprados", 0);
        }
        borrarProductos(e);
        // elimina elementos del carrito
        const index = carritoCompleto.indexOf(producto);
        if (index > -1) {
            carritoCompleto.splice(index, 1);
        }
        // si el carrito está vacío cambia HTML
        localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
        if (carritoCompleto.length == 0) {
            carritoContainer.innerHTML = `
                                        <h3>El carrito está vacío</h3>
                                        <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                        `
            confirmaCompra.style.display = "none";
        }
    })
})

// función que borra elemento visual del carrito
function borrarProductos(e) {
    let botonBorrarClick = e.target;
    botonBorrarClick.parentElement.remove();
}

// ============ CARRITO VACÍO ===========
if (carritoCompleto === undefined || carritoCompleto.length == 0) {
    carritoContainer.innerHTML = `
                                <h3>El carrito está vacío</h3>
                                <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                `
    confirmaCompra.style.display = "none";
} else {
    // Botón confirmar compra
    confirmaCompra.style.display = "block";
    confirmaCompra.onclick = (e) => {
        localStorage.setItem("prod-comprados", 0);
        e.preventDefault();
        // vacía el carrito y actualiza localstorage
        while (carritoCompleto.length > 0) {
            carritoCompleto.pop();
        }
        localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
        // crea alerta que al aceptar recarga
        Swal.fire(
            '¡Muchas gracias por su compra!',
            '¡Que tenga un buen día!',
            'success'
        ).then((resultado) => {
            if (resultado.isConfirmed) {
                window.location.reload();
            }
        })
    }
}
// ========TOTAL=======
function calcTotal() {
    if (sumaTotal == 0) {
        totalCarrito.style.display = "none";
    } else {
        totalCarrito.innerHTML = `Total $${sumaTotal}`;
    }
}
calcTotal();