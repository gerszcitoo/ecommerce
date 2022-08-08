// -----------LOGIN------------
let login = document.getElementById("login")
let btnLogin = document.getElementById("btn-login");

// Si adminLogin no existe, lo crea y le establece admin: false
const adminLogin = JSON.parse(localStorage.getItem("adminLogin")) || {
    admin: false
}

if (adminLogin.admin) {
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
            var: user
        })
    }
    localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
}