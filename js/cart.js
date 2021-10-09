//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let Total = 0;
let PyC = {precios:[], cantidades:[], moneda:[]};

function PrecioTotal(){

    Total = 0;

    for (var i = 0; i < PyC.precios.length; i++) {
                        
        Total += PyC.precios[i]*PyC.cantidades[i];
     }

}

function CantProd(producto, moneda, PU, cant, indice){ // QUIERO QUE ME VAYA CAMBIANDO EL NOMBRE DEL BOTON SEGUN CAMBIO LA SELECCION

    //alert(producto+" "+cant);
document.getElementById("cant"+producto).innerHTML = "Qty: "+cant;
document.getElementById("subt"+producto).innerHTML = "Subtotal ("+cant+" items):"+moneda+" $"  + PU*cant;

//alert("trabajo en el indice "+indice); PRUEBAS A VER SI ME QUEDABA RELACIONADO EL PRODUCTO CON EL INDICE

PyC.cantidades[indice] = cant;

PrecioTotal();

if(PyC.moneda.indexOf("USD") != -1){
    document.getElementById("TotalFinal").innerHTML = `<strong> Total: USD `+Total/40 + `</strong>`;
    document.getElementById("TotalFinal").innerHTML += `<br> <br> Tipo de cambio a $UY 40 <br> Total: UYU `+Total;
    } else {
        document.getElementById("TotalFinal").innerHTML = `<strong> Total: UYU `+Total + `</strong>`;
        document.getElementById("TotalFinal").innerHTML += `<br> <br> Tipo de cambio a $UY 40 <br>Total: USD `+Total/40;
    }


}


document.addEventListener("DOMContentLoaded", function (e) {


    
    document.getElementById("ListaProductosCarrito").innerHTML = "";

    let CartOwner = localStorage.getItem("NombreUsuario");



    if (CartOwner) { //SI EL USUARIO NO SE LOGGEA, ESTA VARIABLE "CartOwner" NO SE CREA

        

        getJSONData(CART_INFO_URL).then(function (result) {
            if (result.status === "ok") {

                let Indices = 0;

                result.data.articles.forEach(producto => {

                    let ListaDeProductos = "";
                    let Aclaraciones = "";

                    if (producto.currency == "USD"){
                        PyC.precios.push(40*producto.unitCost);
                        
                        }else{
                            PyC.precios.push(producto.unitCost);
                            }
                    PyC.cantidades.push(producto.count);
                    PyC.moneda.push(producto.currency);  

                    ListaDeProductos = `
    
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src=` + producto.src + ` class="card-img" alt=" Imagen ` + producto.name + `">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">

                                <h5 class="card-title">` + producto.name + /*` en la posicion `+ Indices +*/`</h5>
                                <p class="card-text">` + producto.currency + " "+ producto.unitCost + `</p>
                                
                                <p class="card-text">  
                                    
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="cant`+producto.name+`">
                                            Qty: `+producto.count+`
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" onclick="CantProd('`+producto.name+`', '`+producto.currency+`', '`+producto.unitCost+`', 1, '`+ Indices +`')" href="#">1</a>
                                            <a class="dropdown-item" onclick="CantProd('`+producto.name+`', '`+producto.currency+`', '`+producto.unitCost+`', 2, '`+ Indices +`')" href="#">2</a>
                                            <a class="dropdown-item" onclick="CantProd('`+producto.name+`', '`+producto.currency+`', '`+producto.unitCost+`', 3, '`+ Indices +`')" href="#">3</a>
                                            <a class="dropdown-item" onclick="CantProd('`+producto.name+`', '`+producto.currency+`', '`+producto.unitCost+`', 4, '`+ Indices +`')" href="#">4</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" >5+</a>
                                        </div>
                                    </div>
                                    
                                </p>
                                <p class="card-text" style="text-align:right" id="subt`+producto.name+`"> Subtotal (`+producto.count+` items): ` + producto.currency + " " + producto.unitCost*producto.count + `</p>
                                
                        </div>
                    </div>
                </div>`


                    Indices += 1;

                    document.getElementById("ListaProductosCarrito").innerHTML += ListaDeProductos;
                    
                                                       
                   
                    /* if (producto.currency == "USD"){
                    Total += 40*producto.unitCost*producto.count;
                    } else {
                        Total += producto.unitCost*producto.count;
                    };*/

                });

                
                               
                PrecioTotal();               
                               

                let TotalFinal = document.createElement("p");
                document.getElementById("ListaProductosCarrito").appendChild(TotalFinal);
                TotalFinal.style.textAlign = "right";
                TotalFinal.id = "TotalFinal";

                
                //QUERIA QUE PASARA EL TOTAL EN LA MONEDA DE RELEVANCIA, QUE DECIDI QUE FUESE DOLARES EN CASO DE QUE AL MENOS ALGUNO DE LOS PRODUCTOS DEL CARRO ESTUVIESEN EN ESA MONEDA
                //OTRA OPCION PODRIA HABER SIDO TENER DOS SUB TOTALES GENERALES EN LOS QUE  SE AGRUPARAN LOS MONTOS POR MONEDA, PERO ME PARECIO QUE NO ERA LO QUE SE PEDIA
                if(PyC.moneda.indexOf("USD") != -1){
                TotalFinal.innerHTML += `<strong> Total: USD `+Total/40 +`</strong>`;
                TotalFinal.innerHTML += `<br> <br> Tipo de cambio a $UY 40 <br> Total: UYU `+Total;
                } else {
                TotalFinal.innerHTML += `<strong> Total: UYU `+Total +`</strong>`;
                TotalFinal.innerHTML += `<br> <br> Tipo de cambio a $UY 40 <br>Total: USD `+Total/40;
                }

            } else { alert("problemas al cargar JSON INFO") };

            
            
        });



        

    } else {

        alert("Usted no está loggeado, para ver su carrito inicie sesión");
        window.location = "index.html"; //TE TIRA DIRECTO PARA QUE PUEDAS INICIAR SESION

        localStorage.setItem("VengoDelCart", JSON.stringify("T")); // CUANDO INICIES SESION EN VEZ DE IR AL INICIO YA VA A TU CARRO
    };

        
    
});