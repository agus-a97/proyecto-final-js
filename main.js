//--Entidad
class Producto{
    constructor(nombre,precio,id){
        this.nombre=nombre;
        this.precio=precio;
        this.id=id;
    }
}
// class Carro{
//     constructor(nombre,precio,id,cantidad){
//         this.nombre=nombre;
//         this.precio=precio;
//         this.id=id;
//         this.cantidad=cantidad;
//     }
// }

//--Constantes
let contador = 1;
//--Array

let productos=[];

//--Selectores
//Creamos los selectores con JQuery

$("#boton").click(guardarProductos)

$("#dark-mode").click(cambiarTema)

$("#vaciarLista").click(vaciarLista)
//--Funciones

// function guardarDolar (){
//     $.get(URLDOLAR,function(res,state){
//         if(state === "success"){
//             //obtenemos el dato que queremos y lo mostramos por consola para verificar
//             // console.log(res[1].casa.nombre +"\n"+res[1].casa.compra+"\n"+res[1].casa.venta );

//             //creamos un nuevo objeto con los valores deseados
//             let dolar = new Moneda(res[1].casa.nombre,res[1].casa.compra,res[1].casa.venta)
//             //verificamos por consola que se creo correctamente el objeto
//             // console.log(dolar);

//             //guardamos en un sessionStorage el objeto
//             sessionStorage.setItem("dolar",JSON.stringify(dolar))
//             location.reload()
//         }
//     })
// }

// function mostrarDolar () {

//     if (sessionStorage.getItem("dolar")==null) {
//         guardarDolar()
//     }else{

//         //traemos lo que tenemos en el storage
//         let d = JSON.parse(sessionStorage.getItem("dolar"))
//         // verificamos por si acaso que es lo que traemos
//         // console.log(d);
    
        
//         $("#box").append(`
//                     <div class="card col-sm-2 m-3">
//                         <h3>${d.nombre}</h3>
//                         <p>Compra: ${d.compra}</p>
//                         <p>Venta: ${d.venta}</p>
    
//                     </div>
//                 `)
        
//     }

// }

$(()=>{

    $("h4").on("mouseover",function () {
        $(this).css("background-color","yellow");
    })

    $("h4").on("mouseleave", function () {
        $(this).css("background-color", "white");
    })

    $("#btninfo").click(function () {
        $("#info").slideToggle("slow");
    })
})
function vaciarLista(){
    $(".card").slideUp(1000);

    setTimeout(() => {
        localStorage.clear();
        mostrarProductos()
        location.reload();
    }, 1100);
}

function guardarProductos() {

    
    let nombre= $("#nombre").val();

    
    let precio= $("#precio").val();

  
    let id= $("#id").val();

    let prodNuevo= new Producto(nombre,precio,id);

    if(esValido(prodNuevo)&&prodExiste(prodNuevo)){
        guardar(prodNuevo);
        
        $("#formP").reset();
    }else{
        mostrarError("ERROR: producto existe o hay campos vacios");
    }

}
//busca en el array de objetos productos si existe un objeto con id igual, si existe devuelve un false
function prodExiste(prodNuevo){
    
    let salida=true;
    let prodLista=JSON.parse(localStorage.getItem("productos"));
    if(prodLista!=null&&prodLista.find(item=>item.id==prodNuevo.id)){
        salida=false;
    }
    return salida;
}

//verifica si se envian campos vacios a la hora de guardar, si estos son "" envia un false como respuesta
function esValido(prodNuevo){
    let salida = true;
    const campos = Object.values(prodNuevo);
    campos.forEach(campo => {
        if (campo === "") {
            salida = false;
        }
    });
    return salida;
}
function guardar(prodNuevo){

    let prodLista=JSON.parse(localStorage.getItem("productos"))
    if(localStorage.getItem("productos")!=null){
        
        prodLista.push(prodNuevo);
        localStorage.setItem("productos",JSON.stringify(prodLista))

    }else{

        localStorage.clear();
        productos.push(prodNuevo);
        localStorage.setItem("productos",JSON.stringify(productos))
    }
}


function mostrarError(mensaje) {
    const div = document.createElement("div");
    div.classList.add("alert", "alert-danger", "m-3");
    div.textContent = mensaje;

    const section = document.getElementById("sect1");
    section.appendChild(div);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

//creamos la funcion mostrar productos con Jquery
function mostrarProductos(){    

    $("body").append(`
        <section class="sect2 contariner m-2" id="prods">
            <h3 class="titulo-3">Tarjetas de los Productos Agregados</h3>
            <div class="row justify-content-evenly m-2" id="items"></div>
        </section>
    `)
    let prodLista=JSON.parse(localStorage.getItem("productos"));
    let dolar = JSON.parse(sessionStorage.getItem("dolar"));
    // console.log(dolar.venta);
    /*
    realizamos un parseoInt a dolar.venta y elemento.precio ya que son strings
    y no queremos que concatene o nos de un NaN si multiplicamos o sumamos
    */
    let dv = parseInt(dolar.venta)
    if (prodLista!=null) {
        //  console.log(prodLista.length)

        prodLista.map(elemento=>{
            // console.log(elemento.precio);
            let pv = parseInt(elemento.precio)
            //hace una depreciacion del peso con el dolar
            let d = pv/dv;
            
            if (d<1) {
                $("#items").append(`
                <div class="card col-2 m-3">
                    <h4 class="titulo-4"> Nombre: ${elemento.nombre}</h4>
                    <p class="precioProd">ARS$: ${elemento.precio}</p>
                    <p class="precioUS">U$S: Imposible Calcular. Precio Devaluado</p>
                    <button class="btn btn-danger" id="${elemento.id}">Eliminar</button>
                </div>
            `);
            }else{
                $("#items").append(`
                    <div class="card col-2 m-3">
                        <h4 class="titulo-4"> Nombre: ${elemento.nombre}</h4>
                        <p class="precioProd">ARS$: ${elemento.precio}</p>
                        <p class="precioUS">U$S: ${d}</p>
                        <button class="btn btn-primary" id="btn-${elemento.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">>Seleccionar</button>
                        <button class="btn btn-danger" id="${elemento.id}">Eliminar</button>
                    </div>
                `);

            }

            /*
                con este evento al modal creado le damos los valores que queremos mostrar en el mismo
                al hacer click en seleccionar salta el modal 
             */
            //asociamos un evento al boton
            $(`#btn-${elemento.id}`).click(function(){
                // console.log(elemento.nombre);
                //creamos un div con lo que queremos que nos muestre
                    $(".modal-body").append(`
                        <div class="aviso">
                           <p>
                                Seleccionaste el elemento<br>
                                 ID: <strong>${elemento.id}</strong><br>
                                 Nombre: <strong>${elemento.nombre}</strong>

                            </p> 
                        </div>
                    `)               
            })
            //este evento asociado al modal remueve lo que adicionamos en la ventana emergente. si no lo borramos se van acumulando aviso tras aviso
            $(".btn-secondary").click(()=>{
                $(".aviso").remove();
            })

            //evento para eliminar una tarjeta
            $(`#${elemento.id}`).click(function (e){
                // console.log(e.target.id);
                       
                let borrar=JSON.parse(localStorage.getItem("productos"))
                let actualizo= borrar.filter(elementos=> elementos.id != e.target.id)
                localStorage.setItem("productos",JSON.stringify(actualizo))
                location.reload()
                   
                
            })
        })
        //preguntamos si el array contiene algo por el evento de eliminar tarjeta si no hay ninguna tarjeta hace un clear para que no quede basura
        if(prodLista.length == 0){

            localStorage.clear();
            location.reload();
        }
    }
    else{
        $("#items").append(`<p class="vacio">No hay productos Agregados</p>`)
    }

}



function cambiarTema(){
    document.body.classList.toggle("darkMode",);
}


//--Logica
mostrarProductos();