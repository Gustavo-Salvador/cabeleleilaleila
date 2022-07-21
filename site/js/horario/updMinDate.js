function updMinDate() {
    if (window.sessionStorage.getItem('updHorario') == 'true') {
        let slt = document.getElementById('sltServico');

        slt.innerHTML = `<option value="{'servico':'${window.sessionStorage.getItem('servico')}', 'tempo':${window.sessionStorage.getItem('duracao')}}">${window.sessionStorage.getItem('servico')} ${window.sessionStorage.getItem('duracao')} minutos</option>`;

        let bck = document.getElementById('linkVolta');
        bck.href = window.sessionStorage.getItem('updHorarioLink');
        bck.onclick = "window.sessionStorage.setItem('updHorario', null);";

        window.sessionStorage.setItem('servico', null);
        window.sessionStorage.setItem('duracao', null);
    }

    el = document.getElementById("dataCamp");
    data = new Date(+ new Date() + 172800000);
    
    let ano = data.getFullYear();
    let mes = data.getMonth() + 1;
    let dia = data.getDate();
    
    el.min = `${ano}-${(mes > 10) ? mes : '0' + mes.toString()}-${(dia > 10) ? dia : '0' + dia.toString()}`;
}