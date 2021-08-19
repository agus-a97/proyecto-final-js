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

//--Funciones

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

    $("#dolar").css(
            'display','none'
    )

    $("#boton-dolar").click(function(){
        $("#dolar").slideToggle("slow");
    })
})

function guardarProductos() {

    
    let nombre= $("#nombre").val();

    
    let precio= $("#precio").val();

  
    let id= $("#id").val();

    let prodNuevo= new Producto(nombre,precio,id);

    if(esValido(prodNuevo)&&prodExiste(prodNuevo)){
        guardar(prodNuevo);
        
        document.getElementById("formP").reset();
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

        // localStorage.clear();
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

//----JQuery - Utilizamos Jquery ya que es mas visual como se va a mostrar en el DOM las tarjetas y los elementos que queramos imprimir
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
    
    if (prodLista!=null&&prodLista.length != 0) {
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
                        <p class="precioUSVenta">U$S: ${d}</p>
                        <button class="btn btn-primary" id="btn-${elemento.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Seleccionar</button>
                        <button class="btn btn-danger" id="${elemento.id}">Eliminar</button>
                    </div>
                `);

            }

            /*
                con este evento al modal creado le damos los valores que queremos mostrar en el mismo
                al hacer click en seleccionar aparece el modal 
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
        
    }
    //Si se ingresa por primera vez o se eliminan todos las tarjetas imprimira este texto
    else{
        $("#items").append(`
        <p class="vacio">
            No hay productos Agregados.<br>
            Para crear una tarjeta Ingrese el Nombre, Precio e ID (admite ID's unicos)
        </p>`)
    }

}



function cambiarTema(){
    document.body.classList.toggle("darkMode",);
}


//--Logica
mostrarProductos();