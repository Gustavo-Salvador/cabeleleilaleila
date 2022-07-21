function updHor() {
    if (document.horForm.servico.value != "" && document.horForm.data.value != "") {
        if (document.getElementById("horCamp") == null) {
            document.getElementById("horario").innerHTML += '<select name="horario" class="formCamp" id="horCamp"></select>';
            document.getElementById("horCamp").innerHTML += '<option value="" disabled selected>Selecione uma opção</option>';
        }
        let Camp = document.getElementById("horCamp");
        
        let a = JSON.parse(document.horForm.servico.value.replace(/'/g, '"'));
        
        let send = new FormData;
                      
        let prt = new aguarde();
        prt.show();

        send.append('data', String(document.horForm.data.value));
        send.append('temp' , String(a['tempo']));
        
        fetch('./php/verificaHorario.php', {
            method: "POST",
            body: send
        })
        .then(resp => resp.json())
        .then((result) => {
            if (result['result'] == 'erro') {
                alert(result['erro']);
            } else {
                let c = 0;
                while (true) {
                    if (result['horarios'][c] != undefined) {
                        Camp.innerHTML += `<option value="${result['horarios'][c]}">${result['horarios'][c]}</option>`;
                    } else {
                        break;
                    }
                    c++;
                }
                prt.hide();
            }
        });
    }
}