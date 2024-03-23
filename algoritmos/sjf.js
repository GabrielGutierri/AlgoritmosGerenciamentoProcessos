export const calculoSJF = (processes) => {
    // Array que armazenará o registro da execução de cada processo por tempo
    let filaExecucaoPorTempo = [];

    // Ordena os processos com base no tempo de chegada
    processes.sort((a, b) => a.tempoChegada - b.tempoChegada);

    // Inicializa variáveis de controle
    let tempoAtual = 0;
    let completos = 0;

    // Loop principal para simulação da execução dos processos
    while (completos < processes.length) {
        // Inicializa o processo mais curto como nulo e o tempo mais curto como infinito
        let processoMaisCurto = null;
        let tempoMaisCurto = Infinity;

        // Itera sobre os processos para encontrar o próximo processo mais curto disponível
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].tempoChegada <= tempoAtual &&
                processes[i].tempoServico < tempoMaisCurto &&
                processes[i].tempoServico > 0) {
                // Atualiza o processo mais curto e o tempo mais curto
                processoMaisCurto = processes[i];
                tempoMaisCurto = processes[i].tempoServico;
            }
        }

        if (processoMaisCurto === null) {
            // Se não houver processo disponível para execução, avança o tempo
            tempoAtual++;
            continue;
        }

        // Executa o processo mais curto
        processoMaisCurto.tempoServico--;
        tempoAtual++;

        if (processoMaisCurto.tempoServico === 0) {
            // Verifica se o processo foi concluído
            completos++;
            processoMaisCurto.tempoConclusao = tempoAtual;
        }        

        // Registra o processo executado na fila de execução por tempo
        filaExecucaoPorTempo.push({ tempo: tempoAtual, processo: processoMaisCurto });
        console.log(filaExecucaoPorTempo);
    }
}
