// -----------LOGIN------------
let login = document.getElementById("login")
let btnLogin = document.getElementById("btn-login");
let navLogin = document.getElementById("nav-login");

// Si adminLogin no existe, lo crea y le establece admin: false
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}

// Si ya inició sesión modifica interfaz
if (adminLogin.admin) {
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

//-----------USO DE API-----------
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

// si no es admin, muestra perfil random
if (adminLogin.admin == false) {
    window.onload = generateUser();
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