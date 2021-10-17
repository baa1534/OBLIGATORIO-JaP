//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let Total = 0;

let TotalCE = 0;

let ParaFinal = ["", ""];

let PyC = { precios: [], cantidades: [], moneda: [] };

function PrecioTotal() {

    Total = 0;

    for (var i = 0; i < PyC.precios.length; i++) {

        Total += PyC.precios[i] * PyC.cantidades[i];
    }

    ParaFinal[0] = Total;

    console.log(ParaFinal[0] + 40*ParaFinal[1]);
    document.getElementById("FinalFinal").innerHTML = `<strong> Total: USD `+ (ParaFinal[0] + 40*ParaFinal[1])/40 +`</strong> <br> <br> Tipo de cambio a $UY 40 <br> Total: UYU ` + (ParaFinal[0] + 40*ParaFinal[1]);

};



//------------------------------------------------------------------------------------------------------------------------------------------

function CantProd(producto, moneda, PU, cant, indice) { // QUIERO QUE ME VAYA CAMBIANDO EL NOMBRE DEL BOTON SEGUN CAMBIO LA SELECCION

    //alert(producto+" "+cant);
    document.getElementById("cant" + producto).innerHTML = "Qty: " + cant;
    document.getElementById("subt" + producto).innerHTML = "Subtotal (" + cant + " items):" + moneda + " $" + PU * cant;

    //alert("trabajo en el indice "+indice); PRUEBAS A VER SI ME QUEDABA RELACIONADO EL PRODUCTO CON EL INDICE

    PyC.cantidades[indice] = cant;

    PrecioTotal();

    if (PyC.moneda.indexOf("USD") != -1) {
        document.getElementById("TotalFinal").innerHTML = `<strong> Subtotal productos: USD ` + Total / 40 + `</strong>`;
        document.getElementById("TotalFinal").innerHTML += `<br> <br> Tipo de cambio a $UY 40 <br> Subtotal productos: UYU ` + Total;
        //let aux = Total / 40 + ParaFinal[1];
        //document.getElementById("FinalFinal").innerHTML = `<strong> Total con envío: USD ` + aux + `</strong>`;
    } else {
        document.getElementById("TotalFinal").innerHTML = `<strong> Subtotal productos: UYU ` + Total + `</strong>`;
        document.getElementById("TotalFinal").innerHTML += `<br> <br> Tipo de cambio a $UY 40 <br> Subtotal productos: USD ` + Total / 40;
        //let aux = Total + 40 * ParaFinal[1];
       // document.getElementById("FinalFinal").innerHTML = `<strong> Total con envío: UYU ` + aux + `</strong>`;
    }


}




// --------------------------------- MOSTRAR DIRECCION DE ENVIO ---------------------------------------

let DirsUsuario = JSON.parse(localStorage.getItem("DireccionesUsuario")); //NO SE SI EN LA VIDA REAL SE GUARDA EN EL LOCAL STORAGE

let DirContent = "";
let CostoEnvio = ""; // DEPENDERA EVENTUALMENTE DE LA DIRECCION DE ENVIO Y DEL ORIGEN DE LOS PRODUCTOS

function MostrarDireccion(direccion) {

    if (direccion[6].toUpperCase() == "URUGUAY") {
        CostoEnvio = 0;
    } else {
        CostoEnvio = 100; // COSTO GENERICO EN DOLARES
    };

    ParaFinal[1] = CostoEnvio;

    console.log(ParaFinal[0] + 40*ParaFinal[1]);
    document.getElementById("FinalFinal").innerHTML = `<strong> Total: USD `+ (ParaFinal[0] + 40*ParaFinal[1])/40 +`</strong> <br> <br> Tipo de cambio a $UY 40 <br> Total: UYU ` + (ParaFinal[0] + 40*ParaFinal[1]);

    DirContent =

        direccion[0] +
        ` <br>`
        + direccion[1] +
        ` <br>`
        + direccion[3] + ` ` + direccion[2] +
        ` <br>`
        + direccion[4] + `, CP ` + direccion[5] +
        ` <br>`
        + direccion[6] +
        ` <br>
    Teléfono: `+ direccion[7] +
        ` <br>
    <p style="text-align:right">
    <strong> Subtotal envío: USD `+ CostoEnvio + `</strong>
    <br>
    <br> Tipo de cambio a $UY 40 <br> Subtotal envío: UYU `+ CostoEnvio / 40 +

        `</p>
    `

    document.getElementById("NombreDireccion").innerHTML = DirContent;



}




// ------------------------------------ CARGAR DIRECCION DE ENVIO DESDE FORMULARIO --------------------------

function PasarFormulario() {

    let Pais = document.getElementById("pais");
    let Ciudad = document.getElementById("ciudad");
    let Calle = document.getElementById("calle");
    let NumPuerta = document.getElementById("numpuerta");
    let Obs = document.getElementById("observaciones");
    let CodPost = document.getElementById("codigopostal");
    let Tel = document.getElementById("tel");


    if (Pais.value === "" || Ciudad.value === "" || Calle.value === "" || NumPuerta.value === "" || CodPost.value === "" || Tel.value === "") {
        alert("Se deben completar todos los campos de la direccion de envío!");

    } else {

        let arraydireccion = [" ", Obs.value, NumPuerta.value, Calle.value, Ciudad.value, CodPost.value, Pais.value, Tel.value];

        MostrarDireccion(arraydireccion);

    }
};


// ------------------------------------ SI NO HAY DATOS CARGADOS DEL USUARIO MOSTRAR FORMULARIO DE DIRECCION ----------------------


function MostrarFormularioDIR() {

    DirContent = `

    <form>
        <div class="form-group">
            <label for="pais">País</label>
            <input type="text" class="form-control" id="pais" aria-describedby="país">
        </div>
        <div class="form-group">
            <label for="ciudad">Ciudad</label>
            <input type="text" class="form-control" id="ciudad" aria-describedby="ciudad">
        </div>
        <div class="form-group">
            <label for="calle">Calle</label>
            <input type="text" class="form-control" id="calle" aria-describedby="calle">
        </div>
        <div class="form-group">
            <label for="numpuerta">N° de puerta</label>
            <input type="text" class="form-control" id="numpuerta" aria-describedby="número de puerta">
        </div>
        <div class="form-group">
            <label for="observaciones">Observaciones</label>
            <input type="text" class="form-control" id="observaciones" aria-describedby="observaciones" placeholder="Ej: apto, N° casilla">
        </div>
        <div class="form-group">
            <label for="codigopostal">CP</label>
            <input type="text" class="form-control" id="codigopostal" aria-describedby="código postal">
        </div>
        <div class="form-group">
            <label for="tel">Teléfono de contacto</label>
            <input type="text" class="form-control" id="tel" aria-describedby="teléfono de contacto" placeholder="Ingresar con código país">
        </div>
        <button type="button" class="btn btn-primary" onclick="PasarFormulario()">Listo!</button>
    </form>
`
    document.getElementById("NombreDireccion").innerHTML = DirContent;

};

// --------------------------------- CAMBIAR DIRECCION BTN--------------------------------------------------------

function TraerArray(opcion) {

    getJSONData("https://baa1534.github.io/OBLIGATORIO-JaP/JSON direcciones/DIR " + opcion + ".json").then(function (result) {
        if (result.status === "ok") {

            let arraydireccion = [result.data.nombre, result.data.observaciones, result.data.numpuerta, result.data.calle, result.data.ciudad, result.data.codigopostal, result.data.pais, result.data.tel];

            MostrarDireccion(arraydireccion);


        } else {
            alert("problemas al cargar direcciones de usuario")

            MostrarFormularioDIR();

        };
    });

};


let OpcionesDir = "";
let Btn = "";

if (DirsUsuario) {

    DirsUsuario.forEach(direcciones => {

        OpcionesDir += `

            <a class="dropdown-item" onclick="TraerArray('`+ direcciones + `')">` + direcciones + `</a>
                        
            `
    });

};

Btn = `

            <button id="CambioDir" type="button" class="btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Change
            </button>
            <div class="dropdown-menu" aria-labelledby="CambioDir">`

    + OpcionesDir +

    `<div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" onclick="MostrarFormularioDIR()">Ingresar nueva dirección</a>
                    </div>

            </div>
        

    `

document.getElementById("CambiarDIRbtn").innerHTML = Btn;



//--------------------------------------- MOSTRAR DATOS DE TARJETA ---------------------------------


function ShowCard() {

    let Titular = document.getElementById("titularTC");
    let Numero = document.getElementById("numeroTC");
    let Vencimiento = document.getElementById("vencimientoTC");
    let CCV = document.getElementById("CCVTC");


    if (Titular.value === "" || Numero.value === "" || Vencimiento.value === "" || CCV.value === "") {
        alert("Se deben completar todos los campos para ingreso de la tarjeta de crédito!");

    } else {

        document.getElementById("MetodoPago").value = "TC";
        document.getElementById("opcionesMp").innerHTML = `

        <strong> Titular </strong> <br>`
            + Titular.value + `<br>
        <strong> Número de tarjeta </strong> <br>`
            + Numero.value + `<br>
        <strong> Vencimiento </strong> <br>`
            + Vencimiento.value


    }
};

//------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function (e) {



    document.getElementById("ListaProductosCarrito").innerHTML = "";

    let CartOwner = localStorage.getItem("NombreUsuario");



    if (CartOwner) { //SI EL USUARIO NO SE LOGGEA, ESTA VARIABLE "CartOwner" NO SE CREA



        getJSONData(CART_INFO_URL).then(function (result) {
            if (result.status === "ok") {

                let Indices = 0;

                result.data.articles.forEach(producto => {

                    let ListaDeProductos = "";

                    if (producto.currency == "USD") {
                        PyC.precios.push(40 * producto.unitCost);

                    } else {
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
                                <p class="card-text">` + producto.currency + " " + producto.unitCost + `</p>
                                
                                <p class="card-text">  
                                    
                                    <div class="btn-group" id="canttype`+ producto.name + `">
                                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="cant`+ producto.name + `">
                                            Qty: `+ producto.count + `
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" onclick="CantProd('`+ producto.name + `', '` + producto.currency + `', '` + producto.unitCost + `', 1, '` + Indices + `')" href="#">1</a>
                                            <a class="dropdown-item" onclick="CantProd('`+ producto.name + `', '` + producto.currency + `', '` + producto.unitCost + `', 2, '` + Indices + `')" href="#">2</a>
                                            <a class="dropdown-item" onclick="CantProd('`+ producto.name + `', '` + producto.currency + `', '` + producto.unitCost + `', 3, '` + Indices + `')" href="#">3</a>
                                            <a class="dropdown-item" onclick="CantProd('`+ producto.name + `', '` + producto.currency + `', '` + producto.unitCost + `', 4, '` + Indices + `')" href="#">4</a>
                                            <a class="dropdown-item" onclick="CantProd('`+ producto.name + `', '` + producto.currency + `', '` + producto.unitCost + `', 5, '` + Indices + `')" href="#">5</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Max. permitido por compra</a>
                                        </div>
                                    </div>
                                    
                                </p>
                                <p class="card-text" style="text-align:right" id="subt`+ producto.name + `"> Subtotal (` + producto.count + ` items): ` + producto.currency + " " + producto.unitCost * producto.count + `</p>
                                
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
                if (PyC.moneda.indexOf("USD") != -1) {
                    TotalFinal.innerHTML += `<strong> Subtotal productos: USD ` + Total / 40 + `</strong>`;
                    TotalFinal.innerHTML += `<br> <br> Tipo de cambio a $UY 40 <br> Subtotal productos: UYU ` + Total;
                    //let aux = Total / 40 + ParaFinal[1];
                    //document.getElementById("FinalFinal").innerHTML = `<strong> Total con envío: USD ` + aux + `</strong>`;
                } else {
                    TotalFinal.innerHTML += `<strong> Subtotal productos: UYU ` + Total + `</strong>`;
                    TotalFinal.innerHTML += `<br> <br> Tipo de cambio a $UY 40 <br> Subtotal productos: USD ` + Total / 40;
                    //let aux = Total + 40 * ParaFinal[1];
                    //document.getElementById("FinalFinal").innerHTML = `<strong> Total con envío: UYU ` + aux + `</strong>`;
                }

            } else { alert("problemas al cargar JSON INFO") };



        });



        // -----------------------------------------------------------------     RELLENAMOS DIRECCIONES  ----------------------------------------------------------------

        document.getElementById("NombreDireccion").innerHTML = "";



        if (DirsUsuario) { // POR SI EL USUARIO NO HUBIESE GUARDADO DIRECCIONES  //ME CREE UNA CARPETA CON LOS JSON EN EL REPOSITORIO DEL OBLIGATORIO

            getJSONData("https://baa1534.github.io/OBLIGATORIO-JaP/JSON direcciones/DIR " + DirsUsuario[0] + ".json").then(function (result) {
                if (result.status === "ok") {

                    let arraydireccion = [result.data.nombre, result.data.observaciones, result.data.numpuerta, result.data.calle, result.data.ciudad, result.data.codigopostal, result.data.pais, result.data.tel];

                    MostrarDireccion(arraydireccion);


                } else {
                    alert("problemas al cargar direcciones de usuario")

                    MostrarFormularioDIR();

                };
            });


        } else {

            MostrarFormularioDIR()

        };



        document.getElementById("NombreDireccion");

        // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        // -----------------------------------------------------------------------------------  METODOS DE PAGO --------------------------------------------------------------------------


        // SE PODRIA HACER LO MISMO QUE CON LA DIRECCION Y CHEQUEAR SI TIENE METODOS DE PAGO CARGADOS
        // SITUACION POR DEFAULT


        document.getElementById("opcionesMp").innerHTML = `

        <div class="form-check">
            <input class="form-check-input" type="radio" name="opcionesCE" id="efectivo" value="efectivo">
            <label class="form-check-label" for="efectivo">
            Efectivo
            </label>
        </div>

        <br>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="opcionesCE" id="debito" value="debito" checked>
            <label class="form-check-label" for="debito">
            Débito
            </label>
        </div>        
                       

                    `;


        //EVENTO SI CAMBIO EL METODO DE PAGO

        document.getElementById("MetodoPago").addEventListener("change", function () {

            if (document.getElementById("MetodoPago").value == "CE") {

                document.getElementById("opcionesMp").innerHTML = `

        <div class="form-check">
            <input class="form-check-input" type="radio" name="opcionesCE" id="efectivo" value="efectivo">
            <label class="form-check-label" for="efectivo">
            Efectivo
            </label>
        </div>

        <br>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="opcionesCE" id="debito" value="debito" checked>
            <label class="form-check-label" for="debito">
            Débito
            </label>
        </div>        

                    `;

            }

            if (document.getElementById("MetodoPago").value == "TC") {

                document.getElementById("opcionesMp").innerHTML = `

        <form>
        <div class="form-group">
            <label for="titularTC">Titular</label>
            <input type="text" class="form-control" id="titularTC" aria-describedby="titular" placeholder="Tal cual aparece en el plástico">
        </div>
        <div class="form-group">
            <label for="numeroTC">Número</label>
            <input type="text" class="form-control" id="numeroTC" aria-describedby="número" placeholder="Sin espacios">
        </div>
        <div class="form-group">
            <label for="vencimientoTC">Fecha de vencimiento</label>
            <input type="text" class="form-control" id="vencimientoTC" aria-describedby="vencimiento" placeholder="mm/aa">
        </div>
        <div class="form-group">
            <label for="CCVTC">CCV</label>
            <input type="text" class="form-control" id="CCVTC" aria-describedby="CCV">
        </div>
        <button type="button" class="btn btn-primary" onclick="ShowCard()">Listo!</button>
    </form>        

                    `;

            }



        });

        

    } else {

        alert("Usted no está loggeado, para ver su carrito inicie sesión");
        window.location = "index.html"; //TE TIRA DIRECTO PARA QUE PUEDAS INICIAR SESION

        localStorage.setItem("VengoDelCart", JSON.stringify("T")); // CUANDO INICIES SESION EN VEZ DE IR AL INICIO YA VA A TU CARRO
    };



});