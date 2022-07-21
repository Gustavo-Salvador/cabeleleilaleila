function register() {
    event.preventDefault();
    
    if (erroFormNull() != false) {
        return false;
    } else if (erroVerifSenha() != false) {
        return false;
    }
    
    let send = new FormData;
    
    let prt = new aguarde();
    prt.show();

    send.append('nome', String(document.registroForm.nome.value));
    send.append('sexo' , String(document.registroForm["sexo"].value));
    send.append('email' , String(document.registroForm.email.value));
    send.append('tel' , String(document.registroForm.tel.value));
    send.append('nascimento' , String(document.registroForm.nasc.value));
    send.append('senha' , String(document.registroForm.senha.value));
    
    fetch("./php/criarRegistro.php", {
        method: 'POST',
        body: send
    })
    .then(resp => resp.json())
    .then((result) => {
        if (result['result'] == 'erro') {
            alert(result['erro']);
        } else {
            window.location.href = "./menuPrincipal.html";
        }
        ptr.hide();
    });
    
    return false;
}