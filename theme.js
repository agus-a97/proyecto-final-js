//
//
class Tema{
    constructor(tipo,date){
        this.tipo=tipo;
        this.date=date;
    }
}

const tema = () => {
    if (localStorage.getItem("modo") == "oscuro") {
        aclarar()
    } else {
        oscurecer()
    }
}

const oscurecer = () => {
    console.log("hola");
    $("body").css("background-color", "black")
    $("h2").css("color", "white")
    $("#info").css("color", "white")
    $("#dolarInfo").css("color", "white")
    
    document.getElementById("tema").textContent = "Modo Claro"

    // let modo = new Tema("oscuro", 2021)
    localStorage.setItem("modo","oscuro")

}

const aclarar = () => {
    console.log("hola claro");
    $("body").css("background-color", "white")
    $("h2").css("color", "black")
    $("#info").css("color", "black")
    $("#dolarInfo").css("color", "black")
    
    document.getElementById("tema").textContent = "Modo Oscuro"

    // let modo = new Tema("claro", 2021)
    localStorage.setItem("modo","claro")
}

$("#tema").click(tema)


if (localStorage.getItem("modo") == "oscuro") {
    oscurecer()
} else {
    aclarar()
}