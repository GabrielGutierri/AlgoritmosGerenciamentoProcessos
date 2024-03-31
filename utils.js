export function verificaUltimoProcessoTempo(processo, filaExecucaoPorTempo){
    let ultimoProcessoTempo = -1;
    for(let i= 0; i < filaExecucaoPorTempo.length; i++){
        if(processo.numeroProcesso === filaExecucaoPorTempo[i].processo){
            ultimoProcessoTempo = i + 1;
        }
    }
    return ultimoProcessoTempo;
}

export const calculaMediaExecucao = (processes, filaExecucaoPorTempo) =>{
    //cada valor da fila representa 1s.
    //tempo de execução médio = tempo da ultima execucao - tempo de chegada
    let somaExecucao = 0;
    for(let p = 0; p < processes.length; p++){
        let processo = processes[p];
        let ultimoProcessoTempo = verificaUltimoProcessoTempo(processo, filaExecucaoPorTempo);
        somaExecucao += ultimoProcessoTempo - processo.tempoChegada;
    }
    let mediaExecucao = somaExecucao / processes.length;
    return mediaExecucao;
}

export const calculaMediaEspera = (processes, filaExecucaoPorTempo) => {
    let somaEspera = 0;
    let temposEspera = [];
    let ultimosTempos = [];
    for(let p = 0; p < processes.length; p++){
        let processo = processes[p];
        let ultimoProcessoTempo = verificaUltimoProcessoTempo(processo, filaExecucaoPorTempo);
        ultimosTempos.push({processo: processo.numeroProcesso, ultimoTempo: ultimoProcessoTempo})
        let tempoEsperaProcesso = {numeroProcesso: processo.numeroProcesso, tempo: 0};
        for(let i= 0; i < ultimoProcessoTempo; i++){
            if(processo.numeroProcesso !== filaExecucaoPorTempo[i].processo){
                somaEspera += 1;
                tempoEsperaProcesso.tempo += 1;
            }
        }
        tempoEsperaProcesso.tempo = tempoEsperaProcesso.tempo - processo.tempoChegada;
        somaEspera -= processo.tempoChegada;
        temposEspera.push(tempoEsperaProcesso);   
    }
    let mediaEspera = somaEspera / processes.length;
    console.log(temposEspera);
    return [mediaEspera, temposEspera, ultimosTempos];
}