function getClientes() {
    let send = new FormData;
    
    let prt = new aguarde();
    prt.show();

    send.append('nome', String(document.clienteForm.nome.value) == ''? 'null':String(document.clienteForm.nome.value));
    
    fetch('../php/adm/getClientesInfo.php', {
            method: "POST",
            body: send
        })
        .then(resp => resp.json())
        .then((result) => {
            if (result['result'] == 'erro') {
                alert(result['erro']);
            } else {
                let tabela = document.getElementById('tabelaCliente');

                tabela.innerHTML = `<tr>
                                        <th> Nome </th>
                                        <th> E-mail </th>
                                        <th> Sexo </th>
                                        <th> Data de nascimento </th>
                                        <th> Telefone </th>
                                    </tr>`

                let dados = result['dados'];

                for(i in dados) {
                    let sexo = '';

                    if (dados[i]['sexo'] == 'M') {
                        sexo = 'Masculino';
                    } else if (dados[i]['sexo'] == 'F') {
                        sexo = 'Feminino';
                    } else {
                        sexo = 'Outro';
                    }

                    tabela.innerHTML += `<tr>
                                            <td> ${dados[i]['nome']} </td>
                                            <td> ${dados[i]['email']} </td>
                                            <td> ${sexo} </td>
                                            <td> ${dados[i]['nascimento']} </td>
                                            <td> ${dados[i]['telefone']} </td>
                                        </tr>`;
                }
            }
            prt.hide();
        });
}