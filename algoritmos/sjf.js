import { calculaMediaEspera, calculaMediaExecucao, verificaUltimoProcessoTempo } from "../utils.js";

export const calculoSJF = (processes) => {
    // Array que armazenará o registro da execução de cada processo por tempo
    let filaExecucaoPorTempo = [];

    // Cria uma cópia do array processes para evitar alterações na variável original
    const processesCopy = [...processes];

    // Ordena os processos com base no tempo de chegada
    processesCopy.sort((a, b) => a.tempoChegada - b.tempoChegada);
    processesCopy.forEach(p => p.tempoRestante = p.tempoServico);

    // Inicializa variáveis de controle
    let tempoAtual = 0;
    let completos = 0;

    let temposEsperaIndividuais = [];
    let temposExecucaoIndividuais = [];

    // Variáveis para armazenar o tempo total de espera e execução para cada processo
    let tempoTotalEspera = Array(processesCopy.length).fill(0);
    let tempoTotalExecucao = Array(processesCopy.length).fill(0);

    // Variável para armazenar a soma dos tempos de espera e execução individuais
    let somaTemposEsperaIndividuais = 0;
    let somaTemposExecucaoIndividuais = 0;

    // Loop principal para simulação da execução dos processos
    while (completos < processesCopy.length) {

        // Inicializa o processo mais curto como nulo e o tempo mais curto como infinito
        let processoMaisCurto = null;
        let tempoMaisCurto = 100;

        // Itera sobre os processos para encontrar o próximo processo mais curto disponível
        for (let i = 0; i < processesCopy.length; i++) {
            if (processesCopy[i].tempoChegada <= tempoAtual &&
                processesCopy[i].tempoRestante < tempoMaisCurto &&
                processesCopy[i].tempoRestante > 0) {
                // Atualiza o processo mais curto e o tempo mais curto
                processoMaisCurto = processesCopy[i];
                tempoMaisCurto = processesCopy[i].tempoRestante;
            }
        }


        if (processoMaisCurto === null) {
            // Se não houver processo disponível para execução, avança o tempo
            tempoAtual++;
            continue;
        }

        // Calcula o tempo de espera e o tempo de execução para o processo atual
        tempoTotalEspera[processoMaisCurto.numeroProcesso - 1] += tempoAtual - processoMaisCurto.tempoChegada;
        tempoTotalExecucao[processoMaisCurto.numeroProcesso - 1] += tempoAtual - processoMaisCurto.tempoChegada - processoMaisCurto.tempoRestante;

        // Executa o processo mais curto
        processoMaisCurto.tempoRestante--;
        tempoAtual++;

        if (processoMaisCurto.tempoRestante === 0) {
            // Verifica se o processo foi concluído
            completos++;
            processoMaisCurto.tempoConclusao = tempoAtual;
        }

        // Registra o processo executado na fila de execução por tempo
        filaExecucaoPorTempo.push({ tempo: tempoAtual, processo: processoMaisCurto.numeroProcesso });
    }

    // Calcula o valor médio de espera e o valor médio de execução para cada processo
    for (let i = 0; i < processesCopy.length; i++) {
        const esperaMedia = tempoTotalEspera[i] / processesCopy.length;
        const execucaoMedia = tempoTotalExecucao[i] / processesCopy.length;
        temposEsperaIndividuais.push({processo: i + 1, tempo: esperaMedia});
        temposExecucaoIndividuais.push(execucaoMedia);
        somaTemposEsperaIndividuais += esperaMedia;
        somaTemposExecucaoIndividuais += execucaoMedia;
    }

    // Calcula a média dos tempos de espera e execução individuais para todos os processos
    const mediaTemposEsperaIndividuais = somaTemposEsperaIndividuais / processesCopy.length;
    const mediaTemposExecucaoIndividuais = somaTemposExecucaoIndividuais / processesCopy.length;

    let mediaExecucao = calculaMediaExecucao(processes, filaExecucaoPorTempo);
    let mediaEspera = calculaMediaEspera(processes, filaExecucaoPorTempo);
    console.log(filaExecucaoPorTempo);
    return {mediaExecucao: mediaExecucao, mediaEspera: mediaEspera[0], temposEspera: mediaEspera[1], processos: processes, ultimosProcessos: mediaEspera[2], filaPorTempo: filaExecucaoPorTempo};
}
