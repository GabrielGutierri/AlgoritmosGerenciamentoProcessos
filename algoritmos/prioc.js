export const calculoPRIOc = (processes) => {
    // Array que armazenará o registro da execução de cada processo por tempo
    let filaExecucaoPorTempo = [];
    
    // Ordena os processos com base no tempo de chegada
    processes.sort((a, b) => a.tempoChegada - b.tempoChegada);
    
    // Inicializa o tempo restante para cada processo como o tempo de serviço
    processes.forEach(p => p.tempoRestante = p.tempoServico);
    
    // Inicializa variáveis de controle
    let tempoAtual = 0;
    let processosCompletos = 0;
    let processoAtual = null;
    let processoMaiorPrioridade = null;

    // Loop principal para simulação da execução dos processos
    while (processosCompletos < processes.length) {
        // Verifica a chegada de novos processos e seleciona o de maior prioridade disponível
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].tempoChegada <= tempoAtual && processes[i].tempoRestante > 0) {
                if (processoMaiorPrioridade === null || processes[i].prioridade > processoMaiorPrioridade.prioridade) {
                    // Se não houver processo de maior prioridade ou o novo processo tiver maior prioridade, atualiza o processo de maior prioridade
                    processoMaiorPrioridade = processes[i];
                }
            }
        }

        if (processoAtual !== null) {
            // Executa o processo atual
            processoAtual.tempoRestante--;
            tempoAtual++;

            // Verifica se o processo atual foi concluído
            if (processoAtual.tempoRestante === 0) {
                processosCompletos++;
                processoAtual.tempoConclusao = tempoAtual;

                // Registra o processo concluído na fila de execução
                filaExecucaoPorTempo.push({tempo: tempoAtual, processo: processoAtual});
                processoAtual = null; // Limpa o processo atual quando ele é concluído
            } else {
                // Registra o processo atual na fila de execução
                filaExecucaoPorTempo.push({tempo: tempoAtual, processo: processoAtual});
            }
        } else if (processoMaiorPrioridade !== null) {
            // Se não houver processo atual e houver um processo de maior prioridade disponível, atribui-o como o processo atual
            processoAtual = processoMaiorPrioridade;
            processoMaiorPrioridade = null; // Reseta o processo de maior prioridade
            filaExecucaoPorTempo.push({tempo: tempoAtual, processo: processoAtual});
        } else {
            // Se não houver processo atual e nenhum processo de maior prioridade disponível, avança o tempo
            tempoAtual++;
        }
    }

    // Retorna a fila de execução com os registros de cada processo por tempo
    console.log(filaExecucaoPorTempo);
}
