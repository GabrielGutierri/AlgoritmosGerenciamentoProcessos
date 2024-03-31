import { calculaMediaEspera, calculaMediaExecucao } from "../utils.js";

export const calculoRR = (processes) => {
    processes.sort((a, b) => a.tempoChegada - b.tempoChegada);
    let tempoServicoTotal = 0;
    processes.forEach(p => {
        p.tempoRestante = p.tempoServico; 
        p.tempoQuantum = 0;
        p.tempoServicoTotal += p.tempoServico;
    });
    let tempoAtual = 0;
    let processosCompletos = 0;

    let filaPronto = [];
    let filaExecucaoPorTempo = [];
    let quantum =  2;
    let processoAtual = null;
    while(processosCompletos < processes.length){
        //verificar se chegou algum processo no tempo atual.
        processes.forEach(processo => {
            if(processo.tempoChegada == tempoAtual){
                filaPronto.push(processo);
            }
        });

        if(filaPronto.length === 0){
            continue;
        }

        if(processoAtual == null)
            processoAtual = filaPronto[0];
        
        processoAtual.tempoRestante--;
        processoAtual.tempoQuantum++;
        tempoAtual++;
        filaExecucaoPorTempo.push({tempo: tempoAtual, processo: processoAtual.numeroProcesso});
        if(processoAtual.tempoRestante == 0){
            filaPronto.shift();
            processosCompletos++;
            processoAtual = filaPronto[0];
            
        }
        else if(processoAtual.tempoQuantum == 2){
            processoAtual.tempoQuantum = 0;
            filaPronto.push(processoAtual);
            filaPronto.shift();
            processoAtual = filaPronto[0];
        }
    }
    let mediaExecucao = calculaMediaExecucao(processes, filaExecucaoPorTempo);
    let mediaEspera = calculaMediaEspera(processes, filaExecucaoPorTempo);
    return {mediaExecucao: mediaExecucao, mediaEspera: mediaEspera[0], temposEspera: mediaEspera[1], processos: processes, ultimosProcessos: mediaEspera[2]};
}