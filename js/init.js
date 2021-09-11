const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json"; // LO CAMBIE EN PRODUCT-INFO.JS
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

//QUERIA QUE TODOS LOS HTML TUVIESEN EL NOMBRE DE USUARIO EN LA BARRA DE ARRIBA, COMO TODOS LOS HTML TIENEN UN NAV, PUEDO LLAMAR POR TAG AL NAV DEL HTML, Y SIEMPRE LO VA A ENTENDER

let DivInteres = document.querySelectorAll("nav > div"); //QUIERO ESTAR DENTRO DEL DIV PARA TENER LAS MISMAS CLASES

let EspacioUsuario = document.createElement("div"); // CREO OTRA DIVISION PARA CONTENER LA INFO QUE VOY A AGREGAR
EspacioUsuario.id = "EspacioUsuario";
EspacioUsuario.style = "display: none"; 
DivInteres[0].appendChild(EspacioUsuario); // ES UN ARRAY, SI NO LE DOY INDEX NO ENTIENDE, POR MAS QUE TENGA SOLO UN ELEMENTO. LO METO ADENTRO DEL DIV CON FORMATOS

let ParrafoUsuario = document.createElement("p"); // EN ESTE PARRAFO VOY A PONER EL NOMBRE
ParrafoUsuario.id = "ParrafoUsuario";
EspacioUsuario.appendChild(ParrafoUsuario); // LO METO EN EL DIV CREADO

let InputSalida = document.createElement("input"); // CREO EL BOTON DE SALIDA
InputSalida.type = "button";
InputSalida.id = "InputSalida";
InputSalida.value = "Salir";
EspacioUsuario.appendChild(InputSalida); // LO METO EN EL DIV CREADO



//alert(VarPrueba.length);

//let ParrPrueba = document.createElement('p');
//ParrPrueba.textContent = "PRUEBA";
//VarPrueba[0].appendChild(ParrPrueba);

//let EspacioUsuario = document.getElementById("EspacioUsuario");

//let ParrafoUsuario = document.getElementById("ParrafoUsuario");

let UsuarioLoggeado = localStorage.getItem("NombreUsuario");

if (UsuarioLoggeado){ //SI EL USUARIO NO SE LOGGEA, ESTA VARIABLE "NombreUsuario" NO SE CREA

UsuarioLoggeado = JSON.parse(UsuarioLoggeado); //MODIFICO MI VARIABLE PARA PASAR SU CONTENIDO DE JSON A JS
ParrafoUsuario.innerText = "Sesion: " + UsuarioLoggeado;
EspacioUsuario.style = "display; background-color: darkturquoise; border-style: solid; border-color: aliceblue; border-color: aliceblue; border-radius: 1rem; text-align: center; padding: 1rem; justify-content: center";


}

if (document.getElementById("InputSalida")){
  document.getElementById("InputSalida").addEventListener("click", function(){

    localStorage.removeItem("NombreUsuario");
    window.location = "index.html";

  })
}

});