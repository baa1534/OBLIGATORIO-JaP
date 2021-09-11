//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

let ProdSeleccionado = JSON.parse(localStorage.getItem("ProdSeleccionado")).IDProdSeleccionado; // TRAIGO AL PRODUCTO SELECCIONADO

// ---------------------------------------------- TRAIGO LA INFO EXTRA DEL PRODUCTO SELECCIONADO ----------------------------------------------------------------------------

 
 let URLProdSeleccionadoINFO = "https://baa1534.github.io/OBLIGATORIO-JaP/JSON info autos/INFO " +ProdSeleccionado+ ".json";   //ME CREE UNA CARPETA CON LOS JSON EN EL REPOSITORIO DEL OBLIGATORIO
 let ProductoINFO = "";

    getJSONData (URLProdSeleccionadoINFO).then(function(result){
        if(result.status === "ok") {

                ProductoINFO = `

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
            
               
            document.getElementById("cuerpotablaINFO").innerHTML += ProductoINFO;
             
            
                    


        } else { alert("problemas al cargar JSON INFO")};
    })
//--------------------------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------- TRAIGO LOS COMENTARIO Y LA PUNTUACION DEL PRODUCTO SELECCIONADO ----------------------------------------------------------------------------

let URLProdSeleccionadoCOMENTS = "https://baa1534.github.io/OBLIGATORIO-JaP/JSON coments autos/COMENTS " +ProdSeleccionado+ ".json";   //ME CREE UNA CARPETA CON LOS JSON EN EL REPOSITORIO DEL OBLIGATORIO


   getJSONData (URLProdSeleccionadoCOMENTS).then(function(result){
       if(result.status === "ok") {

               
        
        result.data.forEach(comentario => {

            let ProductoCOMENTS = "";

            

            ProductoCOMENTS = `
 
            <tr>
                   <tr style="border-top-style: solid"> 
                   <td style="text-align:left">` + comentario.Pepe.substring(0,10) + `  </td>
                   <td style="text-align:center"> <strong> Puntaje: ` + comentario.score +  ` </strong>  </td>
                   <td colspan="6"></td>
                   </tr>

                   
                   <tr> 
                   <td style="text-align:left"> <strong>` + comentario.user + `</strong> dice: </td>
                   <td colspan="7" style="border-left: thin; border-right: thin"></td>
                   </tr>

                 
                   <tr style="border-bottom-style: solid"> 
                   <td rowspan="2" colspan="8" style="text-align:left; font-style: italic"> "` + comentario.description + `" </td>
                   </tr>
                  
                   
            </tr>
                `
           
              
           document.getElementById("cuerpotablaCOMENTS").innerHTML += ProductoCOMENTS;
            
        });
                   


       } else { alert("problemas al cargar JSON COMENTS")};
   })

});