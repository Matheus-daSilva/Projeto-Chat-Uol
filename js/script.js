let enviarMensagens = document.querySelector(".barra-baixo input")
let nomeDoUsuario = null;
let mensagemGlobal = null;
let atualizarStatus = null;

// função para enviar o nome da tela de entrada 

function enviarNome() {
    let nomeEntrada = document.querySelector(".entrada input");
    nomeDoUsuario = {
        name: nomeEntrada.value
    }
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nomeDoUsuario);
    requisicao.then(fecharTelaDeEntrada);
    requisicao.catch(tratarErro);
}

// função que fecha a tela de entrada após uma request

function fecharTelaDeEntrada(){
        let remover = document.querySelector(".topo");
        remover.classList.remove("escondido");
        remover = document.querySelector(".centro");
        remover.classList.remove("escondido");
        remover = document.querySelector(".rodape");
        remover.classList.remove("escondido");
        let adicionar = document.querySelector(".tela-de-entrada");
        adicionar.classList.add("escondido");
        iniciarLoops();
}

function tratarErro(){
    let entrada = document.querySelector(".entrada");
    entrada.innerHTML = `<input type="text" placeholder="Digite outro nome">`;
}

// função que carrega as mensagens do servidor

function carregarMensagens(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promessa.then((mensagem) => {mostrarAsMensagens(mensagem)});
}

// função responsável por pegar a array de "carregarMensagens()" e formatá-las

function mostrarAsMensagens(lista){
    const batePapo = document.querySelector(".bate-papo");
    batePapo.innerHTML = "";
    let ultimaMensagem = "";
    for (let i = 0; i < lista.data.length; i++) {
        if (i === lista.data.length - 1){
            ultimaMensagem = "ultima";
        }
        if (lista.data[i].text === "entra na sala..." || lista.data[i].text === "sai da sala..."){
            batePapo.innerHTML += `
            <div class="mensagem-de-login ${ultimaMensagem}" data-identifier="message">
                <p>(${lista.data[i].time}) <b>${lista.data[i].from}</b> ${lista.data[i].text}</p>
            </div>
            `;
        }
        else{
            batePapo.innerHTML += `
            <div class="mensagens ${ultimaMensagem}" data-identifier="message">
                <p class="">(${lista.data[i].time}) <b>${lista.data[i].from}</b> para <b>${lista.data[i].to}</b>: ${lista.data[i].text}</p>
            </div>
            `;
        }
    }
    const ultimoElemento = document.querySelector(".ultima");
    ultimoElemento.scrollIntoView();
}

function enviarStatus(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nomeDoUsuario);
}

// função responsável por enviar a mensagem do usuário ao sevidor

function enviarMensagem(){
    mensagemGlobal = {
        from: nomeDoUsuario.name,
	    to: "Todos",
	    text: enviarMensagens.value,
	    type: "message"
    }
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagemGlobal);
    requisicao.then(enviarNovaMensagem);
    requisicao.catch(enviarNovaMensagem);
}

// função que limpa a última mensagem do input

function enviarNovaMensagem() {
    const barraBaixo = document.querySelector(".rodape")
    barraBaixo.innerHTML = `
        <div class="barra-baixo">
            <input type="text" placeholder="Digite sua mensagem..."/>
            <ion-icon name="paper-plane-outline" onclick="enviarMensagem()"></ion-icon>
        </div>
        `;
}

function iniciarLoops(){
    atualizarStatus = setInterval(enviarStatus, 5000);
    atualizarMensagens = setInterval(carregarMensagens, 3000);
}

carregarMensagens();