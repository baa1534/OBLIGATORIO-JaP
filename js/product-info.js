//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



function VueltaAtras() {

  localStorage.removeItem("ProdSeleccionado");
  window.location = "products.html";

}


// ------------------------------------------- TRAIGO DATOS DE FECHA QUE VOY A USAR-----------------------------------------
let FechaHoy = new Date();
let ANIO = FechaHoy.getFullYear();
let MES = FechaHoy.getMonth() + 1;

if (MES < 10) { MES = "0" + MES};

let DIA = FechaHoy.getDate();

// --------------------------------------------------------------------------------------------------------

// ------------------------------------------- ME FIJO SI HAY ALGUIEN LOGUEADO ------------------------------------

let UsuarioComenta = localStorage.getItem("NombreUsuario");

let Usuario = "";

if (UsuarioComenta){ //SI EL USUARIO NO SE LOGGEA, ESTA VARIABLE "NombreUsuario" NO SE CREA

  Usuario = JSON.parse(UsuarioComenta); //MODIFICO MI VARIABLE PARA PASAR SU CONTENIDO DE JSON A JS

    
} else {
    
      Usuario = "Anónimo";
}

//------------------------------------------------------ LIMPIA LOS DATOS DEL COMENTARIO --------------------------------------------------

function Descartar() {

  document. getElementById("InputComentario").value = "";
  document.getElementById("InputPuntaje").value = 1;

}

function Publicar(){ //COMENTAR FALSAMENTE, LUEGO SE VA
    //alert("anda!");


    ProductoCOMENTS = `
 
            <tr>
                   <tr style="border-top-style: solid"> 
                   <td style="text-align:left">` + ANIO + "-" + MES + "-" + DIA + `  </td>
                   <td style="text-align:center"> <strong> Puntaje: ` + document.getElementById("InputPuntaje").value +  ` </strong>  </td>
                   <td colspan="6"></td>
                   </tr>

                   
                   <tr> 
                   <td style="text-align:left"> <strong>` + Usuario + `</strong> dice: </td>
                   <td colspan="7" style="border-left: thin; border-right: thin"></td>
                   </tr>

                 
                   <tr style="border-bottom-style: solid"> 
                   <td rowspan="2" colspan="8" style="text-align:left; font-style: italic"> "` + document.getElementById("InputComentario").value + `" </td>
                   </tr>
                  
                   
            </tr>
                `
           
              
           document.getElementById("cuerpotablaCOMENTS").innerHTML += ProductoCOMENTS;
           document. getElementById("InputComentario").value = "";
           document.getElementById("InputPuntaje").value = 1;

}


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
                    <td colspan="8" style="text-align:right"> <input type="button" onclick="VueltaAtras()" value="Volver a lista de `+ result.data.category +`"> </td>
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



 // ------------------------------------------------------- GENERO SECCION COMENTARIOS --------------------------------------------------------------------
   
   let SeccionComentarios="";

   SeccionComentarios = `
   
               <tr> 
               <td style="text-align:left" id="InputFecha"> </td>
               <td style="text-align:center"> <strong> Puntaje:</strong>  
                 <select name="InputPuntaje" id="InputPuntaje">
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
                 </select>
               </td>
               <td colspan="6"></td>
               </tr>
   
               
               <tr> 
               <td style="text-align:left" id="InputUsuario"></td>
               <td colspan="7" style="border-left: thin; border-right: thin"></td>
               </tr>
   
             
               <tr> 
                 <td colspan="8" style="text-align:left">
                   <textarea id="InputComentario" name="InputComentario"  rows="3" cols=100%  placeholder="Deje su comentario aquí..."></textarea> 
                 </td>
               </tr>
   
   
               <tr> 
                 <td colspan="8" style="text-align:center">
                   <input type="button" onclick="Publicar()" value="Publicar">        <input type="button" onclick="Descartar()" value="Descartar">
                 </td>
               </tr>
      `

   document.getElementById("cuerpotablaNEWCOMENT").innerHTML = SeccionComentarios;



// -------------------------------------------- TRAIGO LA FECHA PARA LA SECCION DE NUEVO COMENTARIO ---------------------------------


document.getElementById("InputFecha").innerHTML = ANIO + "-" + MES + "-" + DIA;
// ----------------------------------------------------------------------------------------------------



// -------------------------------------------- VEO DE AUTORRELLENAR EL NOMBBRE DE USUARIO ---------------------------------------------


document.getElementById("InputUsuario").innerHTML = `<strong>` + Usuario + `</strong> dice:` ;

//----------------------------------------------------------------------------------------------------------------------------------------







});