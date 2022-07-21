class linhaAgenda {
    constructor(data, horario, duracao, servico, confirmado, id) {
        this.id = id;
        this.data = data;
        this.horario = horario;
        this.duracao = duracao;
        this.servico = servico;
        this.confirmado = confirmado;

        let tabela = document.getElementById('tabelaAgenda');

        this.linha = tabela.insertRow();

        this.dataCell = this.linha.insertCell();
        this.dataCell.innerHTML = this.data;
        this.horarioCell = this.linha.insertCell();
        this.horarioCell.innerHTML = this.horario;
        this.duracaoCell = this.linha.insertCell();
        this.duracaoCell.innerHTML = this.duracao + ' minutos';
        this.servicoCell = this.linha.insertCell();
        this.servicoCell.innerHTML = this.servico;
        this.confirmadoCell = this.linha.insertCell();
        this.confirmadoCell.innerHTML = this.confirmado?'sim':'não'; 

        this.iconChange = document.createElement('i');
        this.iconChange.className = 'fa-solid fa-arrow-rotate-right';
        this.iconChange.title = "Alterar data do agendamento";
        this.iconDelete = document.createElement('i');
        this.iconDelete.className = 'fa-solid fa-trash-can';
        this.iconDelete.title = "Cancelar agendamento";

        let diasAte = (new Date(this.data + ' 00:00:00') - new Date()) / 86400000;
        if (diasAte < 2) {
            this.iconChange.style.opacity = 0.4;
            this.iconChange.title = "O agendamento não pode mais ser alterado";
            this.iconDelete.style.opacity = 0.4;
            this.iconDelete.title = "O agendamento não pode mais ser excluido";
        } else {
            this.iconChange.addEventListener("click", () => {
                window.sessionStorage.setItem('servico', this.servico);
                window.sessionStorage.setItem('duracao', this.duracao);
                window.sessionStorage.setItem('updHorario', true);
                window.sessionStorage.setItem('updHorarioLink', './php/voltarAgenda.php');

                let send = new FormData;
    
                send.append('update', true);
                send.append('idHorario' , this.id);

                let prt = new aguarde();
                prt.show();

                fetch("./php/confMudarHorario.php", {
                    method: 'POST',
                    body: send
                })
                .then(resp => resp.json())
                .then((result) => {
                    prt.hide();
                    if (result['result'] == 'erro') {
                        alert(result['erro']);
                    } else {
                        window.location.href = "./horario.html";
                    }
                });
            });
            this.iconDelete.addEventListener("click", () => {
                if (confirm('Tem certeza que deseja excluir o horário?')) {
                    let send = new FormData;
    
                    send.append('idHorario' , this.id);

                    let prt = new aguarde();
                    prt.show();

                    fetch("./php/deleteHorario.php", {
                        method: 'POST',
                        body: send
                    })
                    .then(resp => resp.json())
                    .then((result) => {
                        prt.hide();
                        if (result['result'] == 'erro') {
                            alert(result['erro']);
                        } else {
                            alert('Horário deletado com sucesso')
                            window.location.reload();
                        }
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