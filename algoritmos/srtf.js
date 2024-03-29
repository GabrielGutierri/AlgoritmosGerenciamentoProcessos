import { calculaMediaEspera, calculaMediaExecucao } from "../utils.js";

export const calculoSRTF = (processes) => {
    console.log('entrou aq');
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
        processoMaisCurto.tempoRestante--;
        tempoAtual++;

        if(processoMaisCurto.tempoRestante === 0){
            completos++;
            processoMaisCurto.tempoConclusao = tempoAtual;

        }
        filaExecucaoPorTempo.push({tempo: tempoAtual, processo: processoMaisCurto.numeroProcesso});
    }
    let mediaExecucao = calculaMediaExecucao(processes, filaExecucaoPorTempo);
    let mediaEspera = calculaMediaEspera(processes, filaExecucaoPorTempo);
} 