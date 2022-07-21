class linhaAdm {
    constructor(id, idCliente, nomeCliente, data, horario, duracao, servico, confirmado, concluido, faltou) {
        let prt = new aguarde();
        
        this.id = id;
        this.idCliente = idCliente;
        this.nomeCliente = nomeCliente;
        this.data = data;
        this.horario = horario;
        this.duracao = duracao;
        this.servico = servico;
        this.confirmado = confirmado;
        this.concluido = concluido;
        this.faltou = faltou;

        let tabela = document.getElementById('tabelaAgendaAdm');

        this.linha = tabela.insertRow();

        this.dataCell = this.linha.insertCell();
        this.dataCell.innerHTML = this.data;
        this.horarioCell = this.linha.insertCell();
        this.horarioCell.innerHTML = this.horario;
        this.nomeClienteCell = this.linha.insertCell();
        this.nomeClienteCell.innerHTML = this.nomeCliente;
        this.duracaoCell = this.linha.insertCell();
        this.duracaoCell.innerHTML = this.duracao + ' minutos';
        this.servicoCell = this.linha.insertCell();
        this.servicoCell.innerHTML = this.servico;

        this.statusCell = this.linha.insertCell();
        let hoje = new Date();
        let dataAgendamento = new Date(this.data + ' ' + this.horario);

        if (dataAgendamento > hoje) {
            this.statusCell.innerHTML = 'A fazer';
        } else {
            this.selectStatus = document.createElement('select');
            this.selectStatus.innerHTML = `<option value="" disabled selected>Definir status</option>
            <option value="faltou">faltou</option>
            <option value="concluido">concluido</option>`;

            if (this.concluido == 1) {
                this.selectStatus.value = "concluido";
            } else if (this.faltou == 1) {
                this.selectStatus.value = "faltou";
            }

            this.selectStatus.addEventListener("change", () => {
                let send = new FormData;
    
                prt.show();

                send.append('info', 'status');
                send.append('val', this.selectStatus.value);
                send.append('id', this.id);

                fetch('../php/adm/mudarInfo.php', {
                    method: "POST",
                    body: send
                })
                .then(resp => resp.json())
                .then((result) => {
                    if (result['result'] == 'erro') {
                        alert(result['erro']);
                    } else {
                        alert('Status alterado com sucesso')
                    }
                    prt.hide();
                });
            });

            this.statusCell.appendChild(this.selectStatus);
        }

        this.confirmadoCell = this.linha.insertCell();
        if (this.confirmado == 0) {
            this.iconConf = document.createElement('i');
            this.iconConf.className = 'fa-solid fa-check';
            this.iconConf.title = "Confirmar";

            this.iconConf.addEventListener("click", () => {
                let send = new FormData;
    
                prt.show();
                
                send.append('info', 'confirmado');
                send.append('val', 1);
                send.append('id', this.id);

                fetch('../php/adm/mudarInfo.php', {
                    method: "POST",
                    body: send
                })
                .then(resp => resp.json())
                .then((result) => {
                    if (result['result'] == 'erro') {
                        alert(result['erro']);
                    } else {
                        alert('Horário confirmado com sucesso')
                        this.iconConf.remove();
                        this.confirmadoCell.innerHTML = 'sim';
                    }
                    prt.hide();
                });
            });

            this.confirmadoCell.appendChild(this.iconConf);
        } else {
            this.confirmadoCell.innerHTML = 'sim';
        }

        this.iconChange = document.createElement('i');
        this.iconChange.className = 'fa-solid fa-arrow-rotate-right';
        this.iconChange.title = "Alterar data do agendamento";
        this.iconDelete = document.createElement('i');
        this.iconDelete.className = 'fa-solid fa-trash-can';
        this.iconDelete.title = "Cancelar agendamento";

        if (dataAgendamento < hoje) {
            this.iconChange.style.opacity = 0.4;
            this.iconChange.title = "O agendamento não pode mais ser alterado";
            this.iconDelete.style.opacity = 0.4;
            this.iconDelete.title = "O agendamento não pode mais ser excluido";
        } else {
            this.iconChange.addEventListener("click", () => {
                window.sessionStorage.setItem('servico', this.servico);
                window.sessionStorage.setItem('duracao', this.duracao);
                window.sessionStorage.setItem('updHorario', true);
                window.sessionStorage.setItem('updHorarioLink', './php/adm/voltarAgendaAdm.php');

                let send = new FormData;
    
                prt.show();

                send.append('update', true);
                send.append('idHorario' , this.id);
                send.append('idCliente' , this.idCliente);

                fetch("../php/adm/admConfMudarHorario.php", {
                    method: 'POST',
                    body: send
                })
                .then(resp => resp.json())
                .then((result) => {
                    if (result['result'] == 'erro') {
                        alert(result['erro']);
                    } else {
                        window.location.href = "../horario.html";
                    }
                    prt.hide();
                });
            });
            this.iconDelete.addEventListener("click", () => {
                if (confirm('Tem certeza que deseja excluir o horário?')) {
                    let send = new FormData;
    
                    send.append('admIdHorario' , this.id);

                    prt.show();

                    fetch("../php/deleteHorario.php", {
                        method: 'POST',
                        body: send
                    })
                    .then(resp => resp.json())
                    .then((result) => {
                        if (result['result'] == 'erro') {
                            alert(result['erro']);
                        } else {
                            alert('Horário deletado com sucesso')
                            this.linha.remove();
                        }
                        prt.hide();
                    });
                }
            });
        }

        this.iconCell = this.linha.insertCell();
        this.iconCell.className = 'invisibru';
        this.iconCell.appendChild(this.iconChange);
        this.iconCell.appendChild(this.iconDelete);
    }
}