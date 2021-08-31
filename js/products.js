//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

// LAS DEFINO AHORA, SIN CONTENIDO, PARA QUE NO ME DE ERROR SI EL USUARIO NO FILTRA NADA
let PrecioMin = undefined;
let PrecioMax = undefined;
let Moneda = undefined;

// VEAMOS SI TENEMOS ALGUN PROBLEMA CON EL JSON ANTES DE PONERNOS A HACER NADA CON LOS DATOS

    getJSONData(PRODUCTS_URL).then(function(datosTraidos){
        if (datosTraidos.status === "ok")
        {
            datosUtiles = datosTraidos.data;
            MostrarListaProductos(datosUtiles);
        } else {
          alert (datosTraidos.data) ;
        }
    });

// SI getJSONData FUNCIONA, TRABAJO CON LOS DATOS LEVANTADOS

function MostrarListaProductos(DatosOrig) {

let divinteres = document.getElementById("ContenedorLista");
divinteres.innerHTML = "";


let tabla = document.createElement("table");
let cuerpotabla = document.createElement("tbody");
cuerpotabla.id = "cuerpotabla";
cuerpotabla.style.textAlign = "center"

tabla.appendChild(cuerpotabla);
divinteres.appendChild(tabla);


// --------------------------------------FILTRAR YA SEGUN RANGO DE PRECIOS, SE EJECUTA APRETANDO EL BOTON DE FILTRO ----------------------------------------------------

let datos = DatosOrig.filter(producto => {

return (PrecioMin == undefined || (PrecioMin != undefined && producto.cost >= PrecioMin)) && (PrecioMax == undefined || (PrecioMax != undefined && producto.cost <= PrecioMax));

})
// -------------------------------------------------------------------------------------------------------------------------------------------




// -------------------------------------- PARA ORDENAR, SE EJECUTA APRETANDO EL BOTON DE FILTRO ----------------------------------------------

//SI ELEGIMOS ORDENAR LOS PRODUCTOS POR RELEVANCIA, SIENDO LA RELEVANCIA MEDIDA POR CANTIDAD VENDIDOS
//YA ME REDEFINO EL ARRAY DATOS QUE TENIA ANTES FILTRADO POR RANGO DE PRECIOS
if (document.getElementById("InputOrdenarPor").value == "Relevancia"){
    datos = datos.sort(function (a, b) {
        if (a.soldCount < b.soldCount) {
          return 1;
        }
        if (a.soldCount > b.soldCount) {
          return -1;
        }
        
        return 0;
      });
}


//SI ELEGIMOS ORDENAR POR PRECIO, DE MENOR A MAYOR
//YA ME REDEFINO EL ARRAY DATOS QUE TENIA ANTES FILTRADO POR RANGO DE PRECIOS
if (document.getElementById("InputOrdenarPor").value == "MenorMayorPrecio"){
    datos = datos.sort(function (a, b) {
        if (a.cost > b.cost) {
          return 1;
        }
        if (a.cost < b.cost) {
          return -1;
        }
        
        return 0;
      });
}



//SI ELEGIMOS ORDENAR POR PRECIO, DE MAYOR A MENOR
//YA ME REDEFINO EL ARRAY DATOS QUE TENIA ANTES FILTRADO POR RANGO DE PRECIOS
if (document.getElementById("InputOrdenarPor").value == "MayorMenorPrecio"){
    datos = datos.sort(function (a, b) {
        if (a.cost < b.cost) {
          return 1;
        }
        if (a.cost > b.cost) {
          return -1;
        }
        
        return 0;
      });
}

//------------------------------------------------------------------------------------------------------------------------------------------ 

datos.forEach(producto => {
    
        let prodrow = "";

    prodrow = `
            <tr> 

            <td rowspan="2"> <img src=` + producto.imgSrc + ` width=200px </td>
            <td>` + producto.name + `</td>
            <td>` + producto.currency + producto.cost + `</td>
            <td> Vendidos:` + producto.soldCount + `</td>

            </tr>

            <tr> 

            <td colspan="3">` + producto.description + `</td>
            
            </tr>
         `
        document.getElementById("cuerpotabla").innerHTML += prodrow;
         
    
            });



        }
  

// ACCIONO SEGUN EL USUARIO HAYA SELECCIONADO O NO ALGO EN LOS FILTROS

// LEVANTO LOS VALORES DEL FILTRO INGRESADOS POR EL CLIENTE
document.getElementById("InputFiltrarBtn").addEventListener("click", function() {

PrecioMin = document.getElementById("InputPrecioMin").value;
PrecioMax = document.getElementById("InputPrecioMax").value;
Moneda = document.getElementById("InputMoneda").value;

let AuxMax = 0;
let AuxMin = 0;

//alert("El filtro anda");

if((PrecioMax != undefined) && (PrecioMax != "") && (parseInt(PrecioMax) > 0)){ //QUE ERROR PODRIA HABER SI MI CONDICION ES UNICAMENTE QUE EL PARSEINT DEL PRECIO MINIMO SEA MAYOR A CERO?
    PrecioMax = parseInt(PrecioMax);
    AuxMax = 1;

} else {
    //alert("elegi otro maximo");
    PrecioMax = undefined;
    document.getElementById("InputPrecioMax").value = ""; // QUE NO ME SIGA MOSTRANDO EL VALOR QUE ESTA MAL
    
}



if((PrecioMin != undefined) && (PrecioMin != "") && (parseInt(PrecioMin) > 0)){ 
    PrecioMin = parseInt(PrecioMin);
    AuxMin = 1;
    
} else {
    //alert("elegi otro minimo");
    PrecioMin = undefined;
    document.getElementById("InputPrecioMin").value = ""; // QUE NO ME SIGA MOSTRANDO EL VALOR QUE ESTA MAL
    
}

// SI PASA QUE EL CLIENTE INGRESA LOS VALORES DE MAXIMO Y MINIMO EN LOS INPUTS AL REVES, LOS DOY VUELTA
if (((AuxMax === 1) && (AuxMin ===1)) && (PrecioMin >= PrecioMax)){
    PrecioMax = parseInt(document.getElementById("InputPrecioMin").value);
    PrecioMin = parseInt(document.getElementById("InputPrecioMax").value);
    //alert (PrecioMin);
    //alert (PrecioMax);
    document.getElementById("InputPrecioMin").value = PrecioMin;
    document.getElementById("InputPrecioMax").value = PrecioMax;
}

MostrarListaProductos(datosUtiles); //TIENE QUE VOLVER A CORRER CON LOS VALORES DEL FILTRO

})

// LIMPIO LOS VALORES DEL FILTRO
document.getElementById("InputResetBtn").addEventListener("click", function() {

    PrecioMin = undefined;
    PrecioMax = undefined;
    Moneda = undefined;

    document.getElementById("InputPrecioMin").value = "";
    document.getElementById("InputPrecioMax").value = "";
    document.getElementById("InputMoneda").value = "ElijeMoneda";

    //alert("El reset anda");
    
    MostrarListaProductos(datosUtiles); //TIENE QUE VOLVER A CORRER CON LOS VALORES DEL FILTRO
    
    })

});