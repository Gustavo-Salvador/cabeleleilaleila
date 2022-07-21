function verifica(dot = '', adm = false) {
    let prt = new aguarde();
    try {
        prt.show();

        fetch(dot + './php/verifica.php', {
            method: 'POST'
        })
        .then(resp => resp.json())
        .then((result) => {
            if (result['result'] == 'erro') {
                alert(result['erro']);
                window.location.href = dot + './php/logout.php';
            } else {
                if (adm && result['acesso'] != 'A') {
                    window.location.href = '../menuPrincipal.html';
                }
            }
            prt.hide();
        });
    }
    catch (e) {
        window.location.href = dot + './php/logout.php';
    }
}