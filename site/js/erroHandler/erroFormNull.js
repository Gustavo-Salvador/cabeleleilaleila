function erroFormNull() {
    let lastName = "";
    let form = document.forms[0];
    for (var i = 0; i < form.length; i++) {
        if (form.elements[i].name == lastName) {
            continue;
        }
        if (form.elements[form.elements[i].name].value == '') {
            document.getElementById("erro").innerHTML = `*O campo ${form.elements[i].name} não está definido <br>`;
            return true;
        }
        lastName = form.elements[i].name;
    }
    return false;
}