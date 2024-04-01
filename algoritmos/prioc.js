import { calculaMediaEspera, calculaMediaExecucao, verificaUltimoProcessoTempo } from "../utils.js";

export const calculoPRIOc = (processes) => {
    let filaExecucaoPorTempo = [];
    processes.sort((a, b) => a.tempoChegada - b.tempoChegada);
    processes.forEach(p => p.tempoRestante = p.tempoServico);
    let tempoAtual = 0;
    let processosCompletos = 0;

    while (processosCompletos < processes.length) {
        let processoMaiorPrioridade = null;
        let maiorPrioridade = 0;
        // Check for arriving processes
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].tempoChegada <= tempoAtual 
                && processes[i].tempoRestante > 0 
                && processes[i].prioridade > maiorPrioridade) {
                processoMaiorPrioridade = processes[i];
                maiorPrioridade = processes[i].prioridade;
            }
        }

        if (processoMaiorPrioridade === null) {
            tempoAtual++;
            continue;
        }
        
        while (processoMaiorPrioridade.tempoRestante > 0 ) {
            processoMaiorPrioridade.tempoRestante--;
            tempoAtual++;  
            filaExecucaoPorTempo.push({tempo: tempoAtual, processo: processoMaiorPrioridade.numeroProcesso});
        }

        if (processoMaiorPrioridade.tempoRestante === 0) {
            processosCompletos++;
            processoMaiorPrioridade.tempoConclusao = tempoAtual;
        }

    }
    let mediaExecucao = calculaMediaExecucao(processes, filaExecucaoPorTempo);
    let mediaEspera = calculaMediaEspera(processes, filaExecucaoPorTempo);
    return {mediaExecucao: mediaExecucao, mediaEspera: mediaEspera[0], temposEspera: mediaEspera[1], processos: processes, ultimosProcessos: mediaEspera[2], filaPorTempo: filaExecucaoPorTempo};
}