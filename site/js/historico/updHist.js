function updHist() {
    let histFim = document.histForm.dataFim;
    let histIni = document.histForm.dataIni;
    
    let upd = false;

    if (histIni.value != "") {
        histFim.min = histIni.value;
        upd = true;
    }
    if (histFim.value != "") {
        histIni.max = histFim.value;
        upd = true;
    }

    if (upd) {
        let send = new FormData;
    
        let prt = new aguarde();
        prt.show();

        send.append('dataMin', histIni.value == ''? 'null':histIni.value);
        send.append('dataMax', histFim.value == ''? 'null':histFim.value);

        fetch('./php/getHistorico.php', {
            method: "POST",
            body: send
        })
        .then(resp => resp.json())
        .then((result) => {
            if (result['result'] == 'erro') {
                alert(result['erro']);
            } else {
                dados = result['dados'];
                tabela = document.getElementById('tabelaHistorico');
                tabela.innerHTML = `<tr>
                                        <th> Data </th>
                                        <th> Hora </th>
                                        <th> Duração </th>
                                        <th> Serviço </th>
                                        <th> Status </th>
                                    </tr>`;
    
                for(i in dados) {
                    let stat = 'sem informação';

                    if (dados[i]['concluido'] == 1) {
                        stat = 'concluido';
                    } else if (dados[i]['faltou'] == 1) {
                        stat = 'faltou';
                    }

                    tabela.innerHTML += `<tr>
                                            <td> ${dados[i]['data']} </td>
                                            <td> ${dados[i]['horario']} </td>
                                            <td> ${dados[i]['duracao']} </td>
                                            <td> ${dados[i]['servico']} </td>
                                            <td> ${stat} </td>
                                        </tr>`;
                }
                prt.hide();
            }
        });
    }
}