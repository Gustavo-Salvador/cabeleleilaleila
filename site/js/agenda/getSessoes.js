function getSessoes() {
    let prt = new aguarde();
    prt.show();
    
    fetch('./php/getHorarios.php', {})
    .then(resp => resp.json())
    .then((result) => {
        if (result['result'] == 'erro') {
            alert(result['erro']);
        } else {
            dados = result['dados'];
            var linhas = [];

            for(i in dados) {
                let conf = dados[i]['confirmado'] == 1? true:false;
                
                let hoje = new Date();
                let dataAgendamento = new Date(dados[i]['data'] + ' ' + dados[i]['horario']);
                
                if (dataAgendamento >= hoje) {
                    linhas.push(new linhaAgenda(dados[i]['data'], dados[i]['horario'], dados[i]['duracao'], dados[i]['servico'], conf, dados[i]['id']));
                }
            }
            prt.hide()
        }
    });
}