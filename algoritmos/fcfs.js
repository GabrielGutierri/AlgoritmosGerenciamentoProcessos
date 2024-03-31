export const calculofcfs = (processosArray) => {
    let arrayOrdenado = processosArray.sort((a, b) => a.tempoChegada - b.tempoChegada);
    let somaTempoExec = 0;
    let somaTempoEspera = 0;
    let temposEspera = [];
    arrayOrdenado.forEach((p, index) => {
        let tempoExecucao = p.tempoServico;
        let tempoEspera = 0;
        
        for(let i = 0; i < index; i++){
            tempoEspera += arrayOrdenado[i].tempoServico;
             
        }
        tempoExecucao = tempoEspera + arrayOrdenado[index].tempoServico;
        temposEspera.push({processo: p.numeroProcesso, tempo: tempoEspera});
    
        somaTempoEspera += tempoEspera - p.tempoChegada;
        somaTempoExec += tempoExecucao - p.tempoChegada;
    });
    let mediaEspera = somaTempoEspera / arrayOrdenado.length;
    let mediaExec = somaTempoExec / arrayOrdenado.length;
    return {mediaExecucao: mediaExec, mediaEspera: mediaEspera, temposEspera: temposEspera};
}