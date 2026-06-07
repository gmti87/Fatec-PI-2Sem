async function saveUser(event) {
    event.preventDefault();

    try {
        // 1. CADASTRA USUÁRIO
        const resposta = await fetch("http://localhost:3000/login/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                senha: document.getElementById("senha").value,
                tipo: document.getElementById("tipo").value
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem);
            return;
        }

        const id_usuario = dados.id_usuario;

        // 2. SALVA FORMAÇÃO
        await fetch("http://localhost:3000/login/formacao", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_usuario,
                curso: document.getElementById("curso-usr").value,
                instituicao: document.getElementById("inst-usr").value,
                semestre: document.getElementById("sem-usr").value,
                turno: document.getElementById("turno-usr").value,
                data_inicio: document.getElementById("dt-inicio").value,
                data_termino: document.getElementById("dt-term").value
            })
        });

        // 3. SALVA ENDEREÇO
        await fetch("http://localhost:3000/login/endereco", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_usuario,
                cep: document.getElementById("cep-usr").value,
                logradouro: document.getElementById("rua-usr").value,
                complemento: document.getElementById("comp-end-usr").value,
                numero: document.getElementById("num-comp-usr").value,
                bairro: document.getElementById("bairro-usr").value,
                cidade: document.getElementById("cidade-usr").value,
                estado: document.getElementById("estado-usr").value
            })
        });

        alert("Cadastro completo com sucesso!");
        window.location.href = "login.html";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao cadastrar usuário");
    }
}