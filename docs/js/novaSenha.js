function enviarRecuperacao() {

    const email = document.getElementById("emailRecuperacao").value;

    // valida campo vazio
    if(email === ""){

        alert("Digite um email");

        return;
    }

    // fake envio
    alert("Email de recuperação enviado com sucesso!");

    // salva email se quiser
    //localStorage.setItem("emailRecuperacao", email);
}
