function abrirCad() {
    document.getElementById("sidenavCad").style.width = "375px";
    document.getElementById("pushMapa").style.marginLeft = "375px";
}

function fecharCad() {
    document.getElementById("sidenavCad").style.width = "0";
    document.getElementById("pushMapa").style.marginLeft= "0";
}


// function dropLogin() {
//     var x = document.getElementById("login");
//     if (x.className.indexOf("w3-show") == -1) {
//         x.className += " w3-show";
//     } else {
//         x.className = x.className.replace(" w3-show", "");
//     }
// }
