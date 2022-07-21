function erroVerifSenha() {
    let sen1 = document.forms[0]["senha"].value;
    let sen2 = document.forms[0]["senha2"].value;
    
    if (sen1 != sen2) {
        document.getElementById("erro").innerHTML = `*As senhas não são iguais <br>`;
        return true;
    }
    
    return false;
}