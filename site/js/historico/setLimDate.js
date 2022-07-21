function setLimDate() {
    histFim = document.getElementById("dataCampFim");
    histIni = document.getElementById("dataCampIni");
    data = new Date();
    
    let ano = data.getFullYear();
    let mes = data.getMonth() + 1;
    let dia = data.getDate();
    
    histFim.max = `${ano}-${(mes > 10) ? mes : '0' + mes.toString()}-${(dia > 10) ? dia : '0' + dia.toString()}`;
    histIni.max = `${ano}-${(mes > 10) ? mes : '0' + mes.toString()}-${(dia > 10) ? dia : '0' + dia.toString()}`;
}