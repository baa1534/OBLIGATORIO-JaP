//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {



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

function MostrarListaProductos(datos) {

let divinteres = document.getElementById("ContenedorLista");
divinteres.innerHTML = "";


let tabla = document.createElement("table");
let cuerpotabla = document.createElement("tbody");
cuerpotabla.id = "cuerpotabla";
cuerpotabla.style.textAlign = "center"

tabla.appendChild(cuerpotabla);
divinteres.appendChild(tabla);

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
  
});