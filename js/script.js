let nomeEntrada = document.querySelector(".entrada input");
let nomeDoUsuario = null;

function enviarNome() {
    nomeDoUsuario = {
        name: nomeEntrada.value
    }
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nomeDoUsuario);
    requisicao.then(fecharTelaDeEntrada);
    requisicao.catch(tratarErro);
}

function fecharTelaDeEntrada(){
        let remover = document.querySelector(".topo");
        remover.classList.remove("escondido");
        remover = document.querySelector(".centro");
        remover.classList.remove("escondido");
        remover = document.querySelector(".rodape");
        remover.classList.remove("escondido");
        let adicionar = document.querySelector(".tela-de-entrada");
        adicionar.classList.add("escondido");
}

function tratarErro(){
    nomeEntrada = document.querySelector(".entrada");
    nomeEntrada.innerHTML = `<input type="text" placeholder="Digite um outro nome">`;
    nomeDoUsuario = {
        name: nomeEntrada.value
    }
    requisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nomeDoUsuario);
    requisicao.then(fecharTelaDeEntrada);
}

function carregarMensagens(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promessa.then((mensagem) => {mostrarAsMensagens(mensagem)});
}

function mostrarAsMensagens(lista){
    console.log(lista);
    for (let i = 0; i < lista.data.length; i++) {
        const batePapo = document.querySelector(".bate-papo");
        if (lista.data[i].text === "entra na sala..." || lista.data[i].text === "sai da sala..."){
            batePapo.innerHTML += `
            <div class="mensagem-de-login">
                <p>(${lista.data[i].time}) <b>${lista.data[i].from}</b> ${lista.data[i].text}</p>
            </div>
            `;
        }
        else{
            batePapo.innerHTML += `
            <div class="mensagens">
                <p class="">(${lista.data[i].time}) <b>${lista.data[i].from}</b> para <b>${lista.data[i].to}</b>: ${lista.data[i].text}</p>
            </div>
            `;
        }
}
}

carregarMensagens();