function getClientes() {
    let prt = new aguarde();
    prt.show();

    fetch("../php/adm/getClientes.php", {
        method: 'POST',
    })
    .then(resp => resp.json())
    .then((result) => {
        if (result['result'] == 'erro') {
            alert(result['erro']);
            window.location.href = "../menuPrincipal.html";
        } else {
            sltCliente = document.getElementById('sltCliente');     

            for (i in result['nomes']) {
                sltCliente.innerHTML += `<option value="${result['nomes'][i]['id']}">${result['nomes'][i]['nome']}</option>`;
            }
        }
        prt.hide();
    });
}