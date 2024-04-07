import { calculoPRIOp } from "./algoritmos/priop.js";
import { calculoSRTF } from "./algoritmos/srtf.js";
import { calculofcfs } from "./algoritmos/fcfs.js";
import { calculoRR } from "./algoritmos/rr.js";
import { calculoPRIOc } from "./algoritmos/prioc.js";
import { calculoSJF } from "./algoritmos/sjf.js";

const numeroProcessosInput = document.getElementById('numero-processos');
const iniciarSimulacaoBtn = document.getElementById('iniciar-simulacao');
const formularioProcessos = document.getElementById('formulario-processos');
const listaProcessos = document.getElementById('lista-processos');
const enviarProcessosBtn = document.getElementById('enviar-processos');
const resultadoSimulacao = document.getElementById('resultado-simulacao');
const errorContainer = document.getElementById('error-container');
const tabelaContainer = document.getElementById('tabela-container');

iniciarSimulacaoBtn.addEventListener('click', () => {
    const numeroProcessos = parseInt(numeroProcessosInput.value);
    
    if (numeroProcessos < 5 || numeroProcessos > 10) {
        showError("A quantidade de processos deve ser entre 5 e 10.");
        return;
    }
    
    formularioProcessos.classList.remove('escondido');
    listaProcessos.innerHTML = '';

    for (let i = 1; i <= numeroProcessos; i++) {
        const itemLista = document.createElement('li');
        itemLista.innerHTML = `
            <h3>Processo ${i}</h3>
            <label for="tempo-chegada-${i}">Tempo de Chegada:</label>
            <input type="number" id="tempo-chegada-${i}" required>
            <br>
            <label for="tempo-servico-${i}">Tempo de Serviço:</label>
            <input type="number" id="tempo-servico-${i}" required>
            <br>
            <label for="prioridade-${i}">Prioridade:</label>
            <input type="number" id="prioridade-${i}" required>
        `;
        listaProcessos.appendChild(itemLista);
    }
});

enviarProcessosBtn.addEventListener('click', () => {
    const listaInputs = listaProcessos.getElementsByTagName('input');

    for (let input of listaInputs) {
        if (input.value === '') {
            showError("Todos os campos devem ser preenchidos.");
            return;
        }
    }

    const processosArray = [];
    for (let i = 0; i < listaInputs.length; i += 3) {
        const numeroProcesso = i / 3 + 1;
        const tempoChegada = parseInt(listaInputs[i].value);

        const tempoServico = parseInt(listaInputs[i + 1].value);

        const prioridade = parseInt(listaInputs[i + 2].value);

        const objetoProcesso = {
            numeroProcesso: numeroProcesso,
            tempoChegada: tempoChegada,
            tempoServico: tempoServico,
            prioridade: prioridade
        };
        processosArray.push(objetoProcesso);
    }

    resultadoSimulacao.classList.remove('escondido');
<<<<<<< HEAD
    
=======
>>>>>>> 17136048266ab24671e60a2bd9b2c88d32ce2059
    criaTabelaSJF(processosArray);
    criaTabelaFCFS(processosArray);
    criaTabelaPRIOc(processosArray);
    criaTabelaSRTF(processosArray);
    criaTabelaPRIOp(processosArray);
    criaTabelaRR(processosArray);
});

function criaTabelaFCFS(processos){
    let retorno = calculofcfs(processos);
    document.getElementById('fcfs-tempo-execucao').textContent = retorno.mediaExecucao;
    document.getElementById('fcfs-tempo-espera').textContent = retorno.mediaEspera;
    criarTabelaFCFS(processos, retorno.temposEspera);
}

function criarTabelaFCFS(processos, temposEspera){
    let tabelaBody = document.getElementById("tabela-fcfs-body");
    
    processos.forEach(p => {
        let newRow = tabelaBody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let tempoEspera = 0;
        temposEspera.forEach(t => {
            if(t.processo == p.numeroProcesso){
                tempoEspera = t.tempo;
            }
        })
        // Adicione valores às células
        cell1.innerHTML = p.numeroProcesso; // Número do Processo
        cell2.innerHTML = tempoEspera + p.tempoServico;   // Tempo de Término
        cell3.innerHTML = p.tempoServico; // Tempo Ativo
        cell4.innerHTML = tempoEspera; // Tempo de Espera - OK
    });
}


function criaTabelaSJF(processos){
    let retorno = calculoSJF(processos);
    document.getElementById('sjf-tempo-execucao').textContent = retorno.mediaExecucao;
    document.getElementById('sjf-tempo-espera').textContent = retorno.mediaEspera;

    criarTabela(retorno, 'tabela-sjf-body', 'SJF');
}

function criaTabelaPRIOc(processos){
    let retorno = calculoPRIOc(processos);
    document.getElementById('prioc-tempo-execucao').textContent = retorno.mediaExecucao;
    document.getElementById('prioc-tempo-espera').textContent = retorno.mediaEspera;

    criarTabela(retorno, 'tabela-prioc-body', 'PRIOp');
}

<<<<<<< HEAD
function criarTabelaPRIOc(processos, filaPorTempo){
    let tabelaBody = document.getElementById("tabela-prioc-body");
    console.log(filaPorTempo);
    processos.forEach(p => {
        let newRow = tabelaBody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let tempoEspera = 0;

        filaPorTempo.forEach(f => {
            if (f.processo === p.numeroProcesso) {
                // Cálculo do tempo de término
                const tempoTermino = f.tempo;
                
                // Cálculo do tempo ativo
                const tempoAtivo = tempoTermino - p.tempoChegada;

                // Cálculo do tempo de espera
                tempoEspera = tempoAtivo - p.tempoServico;
                
                // Adicione valores às células
                cell1.innerHTML = p.numeroProcesso;
                cell2.innerHTML = tempoTermino;
                cell3.innerHTML = tempoAtivo;
                cell4.innerHTML = tempoEspera;
            }
        });
    });
}


=======
>>>>>>> 17136048266ab24671e60a2bd9b2c88d32ce2059
function criaTabelaSRTF(processos){
    let retorno = calculoSRTF(processos);
    document.getElementById('srtf-tempo-execucao').textContent = retorno.mediaExecucao;
    document.getElementById('srtf-tempo-espera').textContent = retorno.mediaEspera;
    criarTabela(retorno, 'tabela-srtf-body', 'SRTF');
}

function criaTabelaRR(processos){
    let retorno = calculoRR(processos);
    document.getElementById('rr-tempo-execucao').textContent = retorno.mediaExecucao;
    document.getElementById('rr-tempo-espera').textContent = retorno.mediaEspera;
    criarTabela(retorno, 'tabela-rr-body', 'RR');
    
}

function criaTabelaPRIOp(processos){
    let retorno = calculoPRIOp(processos);
    document.getElementById('priop-tempo-execucao').textContent = retorno.mediaExecucao;
    document.getElementById('priop-tempo-espera').textContent = retorno.mediaEspera;
    criarTabela(retorno, 'tabela-priop-body', 'PRIOp');
}

function criarTabela(retornoAlgoritmo, bodyID) {

    let processos = retornoAlgoritmo.processos;
    let ultimosTempos = retornoAlgoritmo.ultimosProcessos;
    let temposEspera = retornoAlgoritmo.temposEspera;
    
    let tabelaBody = document.getElementById(bodyID);

    processos.forEach(p => {
        let ultimoTempoProcesso = 0; 
        let tempoEspera = 0;
        ultimosTempos.forEach(t => {
            if(t.processo == p.numeroProcesso){
                ultimoTempoProcesso = t.ultimoTempo;
            }
        });

        temposEspera.forEach(tE => {
            if(tE.numeroProcesso == p.numeroProcesso){
                tempoEspera = tE.tempo;
            }
        });
        let newRow = tabelaBody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        // Adicione valores às células
        cell1.innerHTML = p.numeroProcesso; // Número do Processo
        cell2.innerHTML = ultimoTempoProcesso;   // Tempo de Término
        cell3.innerHTML = ultimoTempoProcesso - p.tempoChegada; // Tempo Ativo
        cell4.innerHTML = tempoEspera; // Tempo de Espera
    });
}

function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    setTimeout(() => {
        errorContainer.textContent = '';
        errorContainer.style.display = 'none';
    }, 3000);
}
