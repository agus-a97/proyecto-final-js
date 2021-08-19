//
//
//
//ENTIDAD----------------------------------------------------------------
//creamos una clase y un constructor para trabajar el objeto que queremos
class Moneda{
    constructor(nombre,compra,venta){
        this.nombre=nombre;
        this.compra=compra;
        this.venta=venta;
    }
    
}
//CONSTANTE-----------------------------------------------------------------------
const URLDOLAR = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";


//FUNCIONES-----------------------------------------------------------------------

function guardarDolar (){
    $.get(URLDOLAR,function(res,state){
        if(state === "success"){
            //obtenemos el dato que queremos y lo mostramos por consola para verificar
            // console.log(res[1].casa.nombre +"\n"+res[1].casa.compra+"\n"+res[1].casa.venta );

            //creamos un nuevo objeto con los valores deseados
            let dolar = new Moneda(res[1].casa.nombre,res[1].casa.compra,res[1].casa.venta)
            //verificamos por consola que se creo correctamente el objeto
            console.log(dolar);

            //guardamos en un sessionStorage el objeto
            sessionStorage.setItem("dolar",JSON.stringify(dolar))
            //hacemos un reload porque al ingresar por primera vez no se muestra en el DOM
            location.reload()
        }
    })
}

function mostrarDolar () {

    if (sessionStorage.getItem("dolar")==null) {
        guardarDolar()
    }else{

        //traemos lo que tenemos en el storage
        let d = JSON.parse(sessionStorage.getItem("dolar"))
        // verificamos por si acaso que es lo que traemos
        // console.log(d);
    
        
        $("#box").append(`
                    <div class="card col-sm-2 m-3">
                        <h3>${d.nombre}</h3>
                        <p>Compra: ${d.compra}</p>
                        <p>Venta: ${d.venta}</p>
    
                    </div>
                `)
        
    }

}

//LOGICA-------------------------------------------------------------------------

mostrarDolar()