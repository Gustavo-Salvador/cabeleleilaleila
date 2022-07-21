function login() {
    event.preventDefault();

    let prt = new aguarde();
    
    if (erroFormNull()) {
        return false;
    } else {
        prt.show();
        let send = new FormData;
    
        send.append('email', String(document.loginForm.email.value));
        send.append('senha' , String(document.loginForm.senha.value));
        
        fetch("./php/fazerLogin.php", {
            method: 'POST',
            body: send
        })
        .then(resp => resp.json())
        .then((result) => {
            prt.hide();
            if (result['result'] == 'erro') {
                alert(result['erro']);
            } else {
                if (result['adm'] == true) {
                    window.location.href = "./telasAdm/menuAdm.html";
                } else {
                    window.location.href = "./menuPrincipal.html";
                }
            }
            document.loginForm.senha.value = "";
        });
    }
}