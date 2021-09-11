//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

 let ProdSeleccionado = JSON.parse(localStorage.getItem("ProdSeleccionado")).IDProdSeleccionado;
 let URLProdSeleccionado = "https://baa1534.github.io/OBLIGATORIO-JaP/JSON info autos/INFO " +ProdSeleccionado+ ".json";   
 let Producto = "";

    getJSONData (URLProdSeleccionado).then(function(result){
        if(result.status === "ok") {

                Producto = `

                    <tr> 
                    <td rowspan="2" colspan="2"></td>
                    <td rowspan="2" colspan="4"> <img src=` + result.data.images[0] + ` width=200px style="text-align:center"> </td>
                    <td rowspan="2" colspan="2"></td>
                    </tr>

                    <tr> 
                    <td colspan="8"></td>
                    </tr>

                    <tr> 
                    <td rowspan="2" colspan="2"> <img src=` + result.data.images[1] + ` width=200px> </td>
                    <td rowspan="2" colspan="2"> <img src=` + result.data.images[2] + ` width=200px> </td>
                    <td rowspan="2" colspan="2"> <img src=` + result.data.images[3] + ` width=200px> </td>
                    <td rowspan="2" colspan="2"> <img src=` + result.data.images[4] + ` width=200px> </td>
                    </tr>

                    <tr> 
                    <td colspan="8"> " " </td>
                    </tr>

                    <tr> 
                    <td colspan="8">` + result.data.description + `</td>
                    </tr>

                    <tr>
                    <td colspan="2"> Categoria: ` + result.data.category + `</td>
                    <td colspan="2">` + result.data.name + `</td>
                    <td colspan="2">` + result.data.currency + result.data.cost + `</td>
                    <td colspan="2"> Vendidos: ` + result.data.soldCount + `</td>
                    </tr>
        
                    <tr> 
                    <td colspan="6"> </td>
                    <td colspan="2"> Productos relacionados:` + result.data.relatedProducts + `</td>
                    </tr>
        
                 `
            
               
            document.getElementById("cuerpotabla").innerHTML += Producto;
             
            
                    


        } else { alert("problemas al cargar JSON")};
    })


});