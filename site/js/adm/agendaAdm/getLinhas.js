function getLinhas() {
    document.getElementById('tabelaAgendaAdm').innerHTML = `<tr>
                                                                <th> Data </th>
                                                                <th> Hora </th>
                                                                <th> cliente </th>
                                                                <th> Duração </th>
                                                                <th> Serviço </th>
                                                                <th> Status </th>
                                                                <th> Confirmar </th>
                                                                <th class = 'invisibru'> </th>
                                                            </tr>`;
    
    let form = document.filtrosForm;

    let a = [];

    try {
        a = JSON.parse(form.servico.value.replace(/'/g, '"'));
    } catch (e) {
        a['servico'] = 'null';
        a['tempo'] = 'null';
    }
    
    let conf = form.confirmado.checked? 'confirmado':'null';

    let send = new FormData;

    let prt = new aguarde();
    prt.show();

    send.append('dataIni', String(form.dataIni.value) == ''? 'null':String(form.dataIni.value));
    send.append('dataFim' , String(form.dataFim.value) == ''? 'null':String(form.dataFim.value));
    send.append('cliente', String(form.cliente.value) == ''? 'null':String(form.cliente.value));
    send.append('servico' , String(a['servico']) == ''? 'null':String(a['servico']));
    send.append('tempo' , String(a['tempo']) == ''? 'null':String(a['tempo']));
    send.append('status' , String(form.status.value) == ''? 'null':String(form.status.value));
    send.append('confirmado', conf);

    fetch("../php/adm/getAgendaAdm.php", {
        method: 'POST',
        body: send
    })
    .then(resp => resp.json())
    .then((result) => {
        if (result['result'] == 'erro') {
            alert(result['erro']);
        } else {
            dados = result['dados'];
            var linhas = [];

            for(i in dados) {
                linhas.push(new linhaAdm(dados[i]['id'], dados[i]['cliente'], dados[i]['nome'], dados[i]['data'], dados[i]['horario'], dados[i]['duracao'], dados[i]['servico'], dados[i]['confirmado'], dados[i]['concluido'], dados[i]['faltou']));
            }
        }
        prt.hide();
    });
}