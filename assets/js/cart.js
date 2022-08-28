let insertUser = document.getElementById("user-profile");
let navLogin = document.getElementById("nav-login");
let carritoContainer = document.getElementById("cart-container");
let confirmaCompra = document.getElementById("confirma-compra");

//-----------USO DE API-----------
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}

// ----------CONDICIONAL SI ES ADMIN-----------
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

// ------NUMERO CARRITO EN NAVBAR----------
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

// -----------FUNCIONALIDAD CARRITO-------------
const carritoCompleto = JSON.parse(localStorage.getItem("carrito")) || [];
carritoCompleto.forEach(producto => {
    let prodCarrito = document.createElement("div");
    // Comprueba elementos repetidos y si hay los guarda en "duplicado"
    idDuplicados = carritoCompleto
        .map(e => e['id'])
        .map((e, i, final) => final.indexOf(e) !== i && i)
        .filter(obj => carritoCompleto[obj])
        .map(e => carritoCompleto[e]["id"])

    duplicado = carritoCompleto.filter(obj => idDuplicados.includes(obj.id));
    // SI NO HAY DUPLICADOS
    if (duplicado.length == 0) {
        console.log("NO HAY DUPLICADOS");
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
            // modifica navbar
            contadorProductos--;
            contadorProd();
            if (contadorProductos <= 0 || contadorProductos == undefined) {
                prodComprados.style.display = "none";
                localStorage.setItem("prod-comprados", 0);
            }
            borrarProductos(e);
            // elimina elementos no repetidos del carrito
            const index = carritoCompleto.indexOf(producto);
            if (index > -1) {
                carritoCompleto.splice(index, 1);
            }
            localStorage.setItem("carrito", JSON.stringify(carritoCompleto));
            if (carritoCompleto.length == 0) {
                carritoContainer.innerHTML = `
                                            <h3>El carrito está vacío</h3>
                                            <a class="login-submit btn btn-primary" href="../index.html">¡Compra algo!</a>
                                            `
                confirmaCompra.style.display = "none";
            }
        })
    } else {
        // --SI HAY ELEMENTOS DUPLICADOS--
        console.log("duplicados")
    }
    // ...........
})

// función que borra elemento visual del carrito
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
    confirmaCompra.style.display = "none";
} else {
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