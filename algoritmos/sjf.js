import { calculaMediaEspera, calculaMediaExecucao } from "../utils.js";

export const calculoSJF = (processes) => {
    let filaExecucaoPorTempo = []
    processes.sort((a, b) => a.tempoChegada - b.tempoChegada);
    processes.forEach(p => p.tempoRestante = p.tempoServico);
    let tempoAtual = 0;
    let completos = 0;

    while(completos < processes.length){
        let processoMaisCurto = null;
        let tempoMaisCurto = Infinity;

        for(let i=0; i< processes.length; i++){
            if(processes[i].tempoChegada <= tempoAtual 
                && processes[i].tempoRestante < tempoMaisCurto 
                && processes[i].tempoRestante > 0){
                    processoMaisCurto = processes[i];
                    tempoMaisCurto = processes[i].tempoRestante;
                }
        }

        if(processoMaisCurto === null){
            tempoAtual++;
            continue;
        }

        while (processoMaisCurto.tempoRestante > 0 ) {
            processoMaisCurto.tempoRestante--;
            tempoAtual++;  
            filaExecucaoPorTempo.push({tempo: tempoAtual, processo: processoMaisCurto.numeroProcesso});
        }

        if(processoMaisCurto.tempoRestante === 0){
            completos++;
            processoMaisCurto.tempoConclusao = tempoAtual;

        }
    }
    console.log('filaExecucaoPorTempo sjf - > ' , filaExecucaoPorTempo);
    let mediaExecucao = calculaMediaExecucao(processes, filaExecucaoPorTempo);
    let mediaEspera = calculaMediaEspera(processes, filaExecucaoPorTempo);
    return {mediaExecucao: mediaExecucao, mediaEspera: mediaEspera[0], temposEspera: mediaEspera[1], processos: processes, ultimosProcessos: mediaEspera[2]};
} 