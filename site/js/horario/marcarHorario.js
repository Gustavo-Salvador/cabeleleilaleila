function marcarHorario(agroup = null) {
    try {
        event.preventDefault();
    } catch (e) {
        console.log(e.mensage);
    }
    
    if (document.horForm.horario.value == '') {
        return false;
    }
    
    let a = JSON.parse(document.horForm.servico.value.replace(/'/g, '"'));

    if (window.sessionStorage.getItem('updHorario') == 'true') {
        agroup = false;
    }

    let send = new FormData;
    
    let prt = new aguarde();
    prt.show();

    send.append('data', String(document.horForm.data.value));
    send.append('servico' , String(a['servico']));
    send.append('tempo' , String(a['tempo']));
    send.append('horario' , String(document.horForm.horario.value));
    send.append('agroup' , String(agroup));
    
    fetch('./php/criaHorario.php', {
            method: "POST",
            body: send
        })
        .then(resp => resp.json())
        .then((result) => {
            if (result['result'] == 'erro') {
                alert(result['erro']);
            } else if (result['result'] == 'sugestao') {
                let conf = confirm(`Você já tem um horario marcado essa semana no dia ${result['data']}, deseja mudar a data do agendamento atual para o desta sessão?`);
                marcarHorario(conf);
            } else {
                document.getElementById('horForm').reset();                
                if (result['ok'] != null) {
                    window.sessionStorage.setItem('updHorario', null);
                    alert('horário alterado com sucesso');
                    window.location.href = window.sessionStorage.getItem('updHorarioLink');
                } else {
                    alert('horário marcado com sucesso');
                }
            }
            prt.hide();
        });
}