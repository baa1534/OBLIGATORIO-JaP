const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
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


let VarPrueba = document.getElementsByTagName("nav");
alert(VarPrueba);

//let ParrPrueba = document.createElement('p');
//ParrPrueba.textContent = "PRUEBA";
//VarPrueba[0].appendChild(ParrPrueba);

let EspacioUsuario = document.getElementById("EspacioUsuario");

let ParrafoUsuario = document.getElementById("ParrafoUsuario");

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