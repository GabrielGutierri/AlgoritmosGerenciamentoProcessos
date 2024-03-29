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
            tempoEspera: 0,
            prioridade: prioridade
        };

        processosArray.push(objetoProcesso);
    }

    const resultadosMockados = {
        fcfs: { tempoExecucao: '30s', tempoEspera: '10s' },
        sjf: { tempoExecucao: '25s', tempoEspera: '5s' },
        rr: { tempoExecucao: '35s', tempoEspera: '15s' },
        srtf: { tempoExecucao: '20s', tempoEspera: '2s' }
    };

    document.getElementById('fcfs-tempo-execucao').textContent = resultadosMockados.fcfs.tempoExecucao;
    document.getElementById('fcfs-tempo-espera').textContent = resultadosMockados.fcfs.tempoEspera;
    document.getElementById('sjf-tempo-execucao').textContent = resultadosMockados.sjf.tempoExecucao;
    document.getElementById('sjf-tempo-espera').textContent = resultadosMockados.sjf.tempoEspera;
    document.getElementById('rr-tempo-execucao').textContent = resultadosMockados.rr.tempoExecucao;
    document.getElementById('rr-tempo-espera').textContent = resultadosMockados.rr.tempoEspera;
    document.getElementById('srtf-tempo-execucao').textContent = resultadosMockados.srtf.tempoExecucao;
    document.getElementById('srtf-tempo-espera').textContent = resultadosMockados.srtf.tempoEspera;

    resultadoSimulacao.classList.remove('escondido');

    let processos = [
        {
            numeroProcesso: 1,
            tempoChegada: 0,
            tempoServico: 5,
            prioridade: 2
        },
        {
            numeroProcesso: 2,
            tempoChegada: 0,
            tempoServico: 2,
            prioridade: 3
        },
        {
            numeroProcesso: 3,
            tempoChegada: 1,
            tempoServico: 4,
            prioridade: 1
        },
        {
            numeroProcesso: 4,
            tempoChegada: 3,
            tempoServico: 1,
            prioridade: 4
        },
        {
            numeroProcesso: 5,
            tempoChegada: 5,
            tempoServico: 2,
            prioridade: 5
        }
    
       ];
       processos.sort((a, b) => a.tempoChegada - b.tempoChegada);
    //calculoPRIOc(processosArray);
    //calculoSJF(processosArray);
    //calculofcfs(processosArray);
    //calculoSRTF(processos);
    //calculoPRIOp(processosArray);
    calculoRR(processos);

    // Criar tabelas
    const algoritmos = ['FCFS', 'SJF', 'RR', 'SRTF', 'PRIOP', 'PRIOC'];
    for (let algoritmo of algoritmos) {
        const tabela = criarTabela(algoritmo);
        tabelaContainer.appendChild(tabela);
    }
});

function criarTabela(algoritmo) {
    const tabela = document.createElement('table');
    tabela.classList.add('table', 'table-striped', 'mb-5');
    tabela.innerHTML = `
        <caption>${algoritmo}</caption>
        <thead>
            <tr>
                <th scope="col">Número do Processo</th>
                <th scope="col">Tempo de Término</th>
                <th scope="col">Tempo Ativo</th>
                <th scope="col">Tempo de Espera</th>
            </tr>
        </thead>
        <tbody>
            <!-- Os dados da tabela serão preenchidos dinamicamente aqui -->
        </tbody>
    `;
    return tabela;
}

function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    setTimeout(() => {
        errorContainer.textContent = '';
        errorContainer.style.display = 'none';
    }, 3000);
}
