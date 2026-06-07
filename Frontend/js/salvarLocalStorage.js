function fazerLogin() {

    const emailInput = document.getElementById("userEmail");
    const senhaInput = document.getElementById("password");

    // proteção contra null
    if (!emailInput || !senhaInput) {
        alert("Inputs não encontrados no HTML");
        return;
    }

    const email = emailInput.value;
    const senha = senhaInput.value;

    if (email === "" || senha === "") {
        alert("Preencha email e senha");
        return;
    }

    const usuarioFake = {
        nome: "João",
        email: "joao@email.com",
        senha: "123456"
    };

    if (email === usuarioFake.email && senha === usuarioFake.senha) {

        localStorage.setItem("user", JSON.stringify(usuarioFake));

        window.location.href = "area-logada.html";

    } else {
        alert("Email ou senha inválidos");
    }
}

function newuser() {
    window.location.href = "../../pages/escolha-usuario.html";
}

function forgotpsw() {
    window.location.href = "../../pages/nova-senha.html";
}