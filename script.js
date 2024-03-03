const numeroProcessosInput = document.getElementById('numero-processos');
const iniciarSimulacaoBtn = document.getElementById('iniciar-simulacao');
const formularioProcessos = document.getElementById('formulario-processos');
const listaProcessos = document.getElementById('lista-processos');
const enviarProcessosBtn = document.getElementById('enviar-processos');
const resultadoSimulacao = document.getElementById('resultado-simulacao');
const errorContainer = document.getElementById('error-container');

iniciarSimulacaoBtn.addEventListener('click', () => {
    const numeroProcessos = parseInt(numeroProcessosInput.value);
    
    // Verifica se o número de processos está dentro do intervalo permitido
    if (numeroProcessos < 5 || numeroProcessos > 10) {
        showError("A quantidade de processos deve ser entre 5 e 10.");
        return;
    }
    
    formularioProcessos.classList.remove('escondido');
    listaProcessos.innerHTML = ''; // Limpa a lista antes de adicionar novos elementos

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
    const listaObjetos = [];

    // Verifica se todos os campos estão preenchidos
    for (let input of listaInputs) {
        if (input.value === '') {
            showError("Todos os campos devem ser preenchidos.");
            return;
        }
    }

    for (let i = 0; i < listaInputs.length; i += 3) { // Itera de 3 em 3, pois há 3 inputs por processo
        const numeroProcesso = i / 3 + 1;
        const tempoChegada = parseInt(listaInputs[i].value);
        const tempoServico = parseInt(listaInputs[i + 1].value);
        const prioridade = parseInt(listaInputs[i + 2].value);

        const objetoProcesso = {
            numeroProcesso: numeroProcesso,
            tempoChegada: tempoChegada,
            tempoEspera: 0, // Inicializa como 0, pode ser ajustado conforme necessário
            prioridade: prioridade
        };

        listaObjetos.push(objetoProcesso);
    }

    // Cálculos mockados para os resultados
    const resultadosMockados = {
        fcfs: { tempoExecucao: '30s', tempoEspera: '10s' },
        sjf: { tempoExecucao: '25s', tempoEspera: '5s' },
        rr: { tempoExecucao: '35s', tempoEspera: '15s' },
        srtf: { tempoExecucao: '20s', tempoEspera: '2s' }
    };

    // Preenchendo os resultados mockados nos elementos HTML
    document.getElementById('fcfs-tempo-execucao').textContent = resultadosMockados.fcfs.tempoExecucao;
    document.getElementById('fcfs-tempo-espera').textContent = resultadosMockados.fcfs.tempoEspera;
    document.getElementById('sjf-tempo-execucao').textContent = resultadosMockados.sjf.tempoExecucao;
    document.getElementById('sjf-tempo-espera').textContent = resultadosMockados.sjf.tempoEspera;
    document.getElementById('rr-tempo-execucao').textContent = resultadosMockados.rr.tempoExecucao;
    document.getElementById('rr-tempo-espera').textContent = resultadosMockados.rr.tempoEspera;
    document.getElementById('srtf-tempo-execucao').textContent = resultadosMockados.srtf.tempoExecucao;
    document.getElementById('srtf-tempo-espera').textContent = resultadosMockados.srtf.tempoEspera;

    resultadoSimulacao.classList.remove('escondido'); // Exibe a seção de resultados
    calculoFcFS();
    calculoRR();
});

function showError(message) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
}

function calculoFcFS(){
    /*processosArray vai ser um objeto do tipo:
    [
        {
            numeroProcesso: t0,
            tempoChegada: 5,
            tempoServico: 5,
            prioridade: 1
        }
    ]

    1- ordenar pelo tempo de chegada
    2- é isso, agr vai ser só calcular a média
    */
   //processosArray vai ser parametro
   let processosArray = [
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

   ]
    let arrayOrdenado = processosArray.sort((a, b) => a.tempoChegada - b.tempoChegada);
    let somaTempoExec = 0;
    let somaTempoEspera = 0;
    
    arrayOrdenado.forEach((p, index) => {
        let tempoExecucao = p.tempoServico;
        let tempoEspera = 0;
        
        for(let i = 0; i < index; i++){
            tempoEspera += arrayOrdenado[i].tempoServico;
             
        }
        tempoExecucao = tempoEspera + arrayOrdenado[index].tempoServico;

        somaTempoEspera += tempoEspera - p.tempoChegada;
        somaTempoExec += tempoExecucao - p.tempoChegada;
    });
    let mediaEspera = somaTempoEspera / arrayOrdenado.length;
    let mediaExec = somaTempoExec / arrayOrdenado.length;
}

function calculoRR(){
    // Sort processes by arrival time
    let processes = [
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
    processes.sort((a, b) => a.tempoChegada - b.tempoChegada);

    let tempoServicoTotal = processes.reduce((soma, processo) => soma + processo.tempoServico, 0);

    let filaPronto = [];
    let quantum = 2;
    let processoTerminado = true;
    let processoAtual = {};
    let ordemProcesso = [];
    for(let tempoAtual=0; tempoAtual <= tempoServicoTotal; tempoAtual++){
        //verificar se chegou algum processo no tempo atual.
        processes.forEach(processo => {
            if(processo.tempoChegada == tempoAtual){
                filaPronto.push({numeroProcesso: processo.numeroProcesso, tempoChegada: processo.tempoChegada, tempoServico: processo.tempoServico});
            }
        });
        //ver o processo atual e verificar se ele está executando;
        if(processoTerminado == true){
            processoAtual = filaPronto[0];
            processoTerminado = false;
        }

        if(processoTerminado == false){
            quantum--;
        }

        if(quantum == 0){
            tempoFimExecucao = tempoAtual;
            processoTerminado = true;
            ordemProcesso.push(filaPronto[0].numeroProcesso);
            if(filaPronto[0].tempoServico - 2 > 0){
                filaPronto.push({numeroProcesso: filaPronto[0].numeroProcesso, 
                                tempoChegada: filaPronto[0].tempoChegada, 
                                tempoServico: filaPronto[0].tempoServico - 2})
            }
            filaPronto.shift();
            quantum = 2;
        }
    }

    if(filaPronto.length == 1){ //se sobrar um valor da fila de pronto, ele só pode ser 1, já q estou considerando o quantum igual a 2
        ordemProcesso.push(filaPronto[0].numeroProcesso);
        filaPronto.shift();
    }
    //tenho a ordem em que os processos foram executados. Agora, posso fazer os cálculos de tempo médio de execução e espera
    //Tempo médio execução.
    
}
