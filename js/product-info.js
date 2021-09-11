//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

 let ProdSeleccionado = JSON.parse(localStorage.getItem("ProdSeleccionado")).IDProdSeleccionado;
 let URLProdSeleccionado = "https://baa1534.github.io/OBLIGATORIO-JaP/JSON info autos/INFO " +ProdSeleccionado+ ".json";   //ME CREE UNA CARPETA CON LOS JSON EN EL REPOSITORIO DEL OBLIGATORIO
 let Producto = "";

    getJSONData (URLProdSeleccionado).then(function(result){
        if(result.status === "ok") {

                Producto = `

                    <tr> 
                    <td colspan="8"> <img src=` + result.data.images[0] + ` width=200px height=140px style="text-align:center"> </td>
                    </tr>

                    

                    <tr> 
                    <td colspan="2"> <img src=` + result.data.images[1] + ` width=200px height=140px style="text-align:center"> </td>
                    <td colspan="2"> <img src=` + result.data.images[2] + ` width=200px height=140px style="text-align:center"> </td>
                    <td colspan="2"> <img src=` + result.data.images[3] + ` width=200px height=140px style="text-align:center"> </td>
                    <td colspan="2"> <img src=` + result.data.images[4] + ` width=200px height=140px style="text-align:center"> </td>
                    </tr>

                    

                    <tr> 
                    <td colspan="8" style="text-align:center">` + result.data.description + `</td>
                    </tr>

                    <tr>
                    <td colspan="2"> Categoria: ` + result.data.category + `</td>
                    <td colspan="2">` + result.data.name + `</td>
                    <td colspan="2">` + result.data.currency + result.data.cost + `</td>
                    <td colspan="2"> Vendidos: ` + result.data.soldCount + `</td>
                    </tr>
        
                    <tr> 
                    <td colspan="8" style="text-align:right"> Productos relacionados:` + result.data.relatedProducts + `</td>
                    </tr>

                    <tr> 
                    <td colspan="8" style="text-align:right"> <a href="products.html"> Volver a lista de `+ result.data.category +` </a> </td>
                    </tr>
        
                 `
            
               
            document.getElementById("cuerpotabla").innerHTML += Producto;
             
            
                    


        } else { alert("problemas al cargar JSON")};
    })


});