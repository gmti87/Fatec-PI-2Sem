let editando = false;

async function carregarPerfil() {
    try {

        const resposta = await fetch(
            'http://localhost:3000/login/perfil',
            {
                credentials: 'include'
            }
        );

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status}`);
        }

        const usuario = await resposta.json();

        console.log("USUARIO:", usuario);
        // ADICIONE AQUI
        console.log("USUARIO COMPLETO:", usuario);
        console.log("FORMACAO:", usuario.formacao);
        console.log("ENDERECO:", usuario.endereco);

        // Dados do usuário

        document.getElementById('nome-usr-al').value =
            usuario.nome || '';

        document.getElementById('email-usr-al').value =
            usuario.email || '';

        document.getElementById('tipo-usr-al').value =
            usuario.tipo || '';

        document.getElementById('dataCadastro-usr').value =
            usuario.data_cadastro
                ? usuario.data_cadastro.split('T')[0]
                : '';

        document.getElementById('status-usr-al').textContent =
            usuario.status === 'A'
                ? 'Ativo'
                : 'Inativo';

        // Formação

        document.getElementById('curso-usr-al').value =
            usuario.formacao?.curso || '';

        console.log(
            document.getElementById('curso-usr-al').value
        );

        document.getElementById('inst-usr-al').value =
            usuario.formacao?.instituicao || '';

        document.getElementById('sem-usr-al').value =
            usuario.formacao?.semestre || '';

        document.getElementById('turno-usr-al').value =
            usuario.formacao?.turno
                ? usuario.formacao.turno.toLowerCase()
                : '';

        document.getElementById('data-inicio-al').value =
            usuario.formacao?.data_inicio
                ? usuario.formacao.data_inicio.split('T')[0]
                : '';

        document.getElementById('data-term-al').value =
            usuario.formacao?.data_termino
                ? usuario.formacao.data_termino.split('T')[0]
                : '';

        // Endereço

        document.getElementById('cep-usr-al').value =
            usuario.endereco?.cep || '';

        document.getElementById('rua-usr-al').value =
            usuario.endereco?.logradouro || '';

        document.getElementById('comp-end-usr-al').value =
            usuario.endereco?.complemento || '';

        document.getElementById('num-end-usr-al').value =
            usuario.endereco?.numero || '';

        document.getElementById('bairro-usr-al').value =
            usuario.endereco?.bairro || '';

        document.getElementById('cidade-usr-al').value =
            usuario.endereco?.cidade || '';

        document.getElementById('estado-usr-al').value =
            usuario.endereco?.estado || '';

        travarCampos();

    } catch (erro) {

        console.error('Erro ao carregar perfil:', erro);

    }
}

function liberarCampos() {
    const form = document.querySelector('.form-usr');

    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.disabled = false;
        el.readOnly = false;
    });

    // se quiser manter campos protegidos, re-trava aqui:
    document.getElementById('dataCadastro-usr').disabled = true;
    // document.getElementById('nome-usr-al').disabled = false;
    // document.getElementById('email-usr-al').disabled = false;
    // document.getElementById('tipo-usr-al').disabled = false;

    // document.getElementById('nome-usr-al').readOnly = false;
    // document.getElementById('email-usr-al').readOnly = false;
}

function travarCampos() {

    const form = document.querySelector('.form-usr');

    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.disabled = true;
        el.readOnly = true; // reforço para inputs
    });

    // document.getElementById('nome-usr-al').disabled = true;
    // document.getElementById('email-usr-al').disabled = true;
    // document.getElementById('tipo-usr-al').disabled = true;

    // document.getElementById('nome-usr-al').readOnly = true;
    // document.getElementById('email-usr-al').readOnly = true;

}

function configurarBotaoEditar() {

    const btn = document.getElementById('btnAtualizar');

    btn.addEventListener('click', async (event) => {
        event.preventDefault();

        if (!editando) {

            liberarCampos();

            btn.textContent = 'Salvar';
            editando = true;

        } else {

            try {
                const resposta = await fetch('http://localhost:3000/login/usuario', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        nome: document.getElementById('nome-usr-al').value,
                        email: document.getElementById('email-usr-al').value,
                        tipo: document.getElementById('tipo-usr-al').value
                    })
                });

                console.log("Status:", resposta.status);

                const texto = await resposta.text();
                console.log("Resposta servidor:", texto);

                if (!resposta.ok) {
                    throw new Error(`Erro ${resposta.status}`);
                }

                travarCampos();

                btn.textContent = 'Atualizar';
                editando = false;

            } catch (erro) {
                console.error('Erro ao salvar:', erro);
            }
        }
    });
}

function removeUser() {

    const btn = document.getElementById('btnRemover');

    btn.addEventListener('click', async (event) => {

        event.preventDefault();

        try {

            const resposta = await fetch(
                'http://localhost:3000/login/status',
                {
                    method: 'PUT',
                    credentials: 'include'
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.mensagem);
            }

            document.getElementById('status-usr-al').textContent =
                dados.novo_status === 'A'
                    ? 'Ativo'
                    : 'Inativo';

            alert(dados.mensagem);

        } catch (erro) {

            console.error(erro);

        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarPerfil();
    configurarBotaoEditar();
    removeUser();
})
