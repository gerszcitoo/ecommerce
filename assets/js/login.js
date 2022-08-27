// -----------LOGIN------------
let login = document.getElementById("login")
let btnLogin = document.getElementById("btn-login");
let navLogin = document.getElementById("nav-login");
let insertUser = document.getElementById("user-profile");

// Si adminLogin no existe, lo crea y le establece admin: false
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}

// Si ya inició sesión modifica interfaz
if (adminLogin.admin) {
    // inserta imagen de admin
    insertUser.innerHTML = `
                <p id="user-name">Hola, Administrador</p>
                <img src="../assets/img/default-user-img.png" id="user-pic">
                `
    navLogin.innerText = "Cerrar Sesión";
    login.innerHTML = "";
    login.innerHTML = `
    <h1>Hola, admin</h1>
    <button type="submit" class="login-submit btn btn-primary" id="btn-unlog">Cerrar Sesión</button>
    `
    let btnUnlog = document.getElementById("btn-unlog");
    btnUnlog.onclick = (e) => {
        e.preventDefault();
        adminLogin.admin = false;
        localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
        window.location.reload();
    }
}


// si no es admin, muestra perfil random
if (adminLogin.admin == false) {
    //-----------USO DE API-----------
    const crearUsuario = () => {
        let nombreUser = JSON.parse(sessionStorage.getItem("nombreUser"));
        let apellidoUser = JSON.parse(sessionStorage.getItem("apellidoUser"));
        let fotoUser = JSON.parse(sessionStorage.getItem("fotoUser"));
        // generar html con API
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

// login
btnLogin.onclick = (e) => {
    e.preventDefault();
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    if (user == "admin" && pass == "123") {
        adminLogin.admin = true;
        console.log(adminLogin.admin)
            // redirecciona a home si el login es exitoso
        window.location.href = "../index.html";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Hubo un problema...',
            text: 'No se pudo ingresar a "' + user + '"',
        })
    }
    localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
}