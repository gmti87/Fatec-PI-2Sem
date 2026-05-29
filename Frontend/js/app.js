window.addEventListener("DOMContentLoaded", () => {

    const usuario = localStorage.getItem("user");

    const btnLogin = document.getElementById("btnLogin");

    const btnPerfil = document.getElementById("btnPerfil");

    const btnSair = document.getElementById("btnSair");

    // usuário logado
    if(usuario){

        btnLogin.style.display = "none";

        btnPerfil.style.display = "block";

        btnSair.style.display = "block";

    } else {

        // usuário NÃO logado
        btnLogin.style.display = "block";

        btnPerfil.style.display = "none";

        btnSair.style.display = "none";
    }

});