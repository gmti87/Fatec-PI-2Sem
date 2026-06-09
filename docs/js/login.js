async function fazerLogin() {

    const email = document.getElementById("userEmail").value;
    const senha = document.getElementById("password").value;

    try {

        const resposta = await fetch(
            "http://localhost:3000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );

        const dados = await resposta.json();

        console.log("STATUS:", resposta.status);
        console.log("DADOS:", dados);

        if (resposta.ok) {

            //alert("Login OK: " + dados.nome);
            alert("Login OK")

            //window.location.href = "area-logada.html";
            setTimeout(() => {
                window.location.href = "area-logada.html";
            }, 150);

        } else {

            //alert(dados.mensagem || "Email ou senha inválidos");
            alert("Email ou senha inválidos!!");
        }

    } catch (erro) {

        console.error(erro);
        alert("Erro ao conectar ao servidor");
    }
}

function newuser() {
    window.location.href = "/pages/escolha-usuario.html";
}

function forgotpsw() {
    window.location.href = "/pages/nova-senha.html";
}
