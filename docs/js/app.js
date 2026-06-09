window.addEventListener("DOMContentLoaded", async () => {

    const btnLogin = document.getElementById("btnLogin");
    const btnPerfil = document.getElementById("btnPerfil");
    const btnSair = document.getElementById("btnSair");

    try {

        //const response = await fetch("/api/me", {
            //credentials: "include"
        //});

        const response = await fetch("http://localhost:3000/login/verificar", {
            credentials: "include"
        });

        if (response.ok) {

            const data = await response.json();

            btnLogin.style.display = "none";
            btnPerfil.style.display = "block";
            btnSair.style.display = "block";

            //console.log(data.usuario);
            console.log(data);

        } else {

            btnLogin.style.display = "block";
            btnPerfil.style.display = "none";
            btnSair.style.display = "none";
        }

    } catch (error) {

        console.error(error);

        btnLogin.style.display = "block";
        btnPerfil.style.display = "none";
        btnSair.style.display = "none";
    }
});

// window.addEventListener("DOMContentLoaded", () => {

//     const usuario = localStorage.getItem("user");

//     const btnLogin = document.getElementById("btnLogin");

//     const btnPerfil = document.getElementById("btnPerfil");

//     const btnSair = document.getElementById("btnSair");

//     // usuário logado
//     if(usuario){

//         btnLogin.style.display = "none";

//         btnPerfil.style.display = "block";

//         btnSair.style.display = "block";

//     } else {

//         // usuário NÃO logado
//         btnLogin.style.display = "block";

//         btnPerfil.style.display = "none";

//         btnSair.style.display = "none";
//     }

// });