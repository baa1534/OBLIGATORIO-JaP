//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let UsuarioLoggeado = localStorage.getItem("NombreUsuario");
let DatosProfile = JSON.parse(localStorage.getItem("UserProfile"));

function LlenarDatos(Datos){ // Me modifica los value de los input segun datos que haya guardados o no

    if (Datos[0] != " " || Datos[0] != undefined) {
        document.getElementById("Correo").value = Datos[0];
    };
    if (Datos[1] != " " || Datos[1] != undefined) {
        document.getElementById("1 Nombre").value = Datos[1];
    };
    if (Datos[2] != " " || Datos[2] != undefined) {
        document.getElementById("2 Nombre").value = Datos[2];
    };
    if (Datos[3] != " " || Datos[3] != undefined) {
        document.getElementById("1 Apellido").value = Datos[3];
    };
    if (Datos[4] != " " || Datos[4] != undefined) {
        document.getElementById("2 Apellido").value = Datos[4];
    };
    if (Datos[5] != " " || Datos[5] != undefined) {
        document.getElementById("Edad").value = Datos[5];
    };
    if (Datos[6] != " " || Datos[6] != undefined) {
        document.getElementById("TelContact").value = Datos[6];
    };

};



function EditarPerfil(){ // me modifica los datos del perfil guardados en la memoria local

    
    document.getElementById("GCPerfil").setAttribute("class", "d-block"); //salta error pero funciona

}



function GuardarCambios(){

    localStorage.removeItem("UserProfile");

    let PerfilUsuario = [];

    PerfilUsuario.push(document.getElementById("Correo").value, document.getElementById("1 Nombre").value, document.getElementById("2 Nombre").value, document.getElementById("1 Apellido").value, document.getElementById("2 Apellido").value, document.getElementById("Edad").value, document.getElementById("TelContact").value);

    
    localStorage.setItem("UserProfile", JSON.stringify(PerfilUsuario));

    LlenarDatos(PerfilUsuario);
    //alert("datos guardados exitosamente!");

    document.getElementById("GCPerfil").setAttribute("class", "d-none"); 

}



document.addEventListener("DOMContentLoaded", function (e) {

    

    if (UsuarioLoggeado) { //SI EL USUARIO NO ESTA LOGGEADO NO HAY PERFIL

        document.getElementById("NombreUsuario").innerHTML = JSON.parse(UsuarioLoggeado) + "'s profile";

        //DatosProfile = ["hola hola ", "", "", "", "", "", "", ""];

        if (DatosProfile) { //En caso de que hubiese algo cargado

            LlenarDatos(DatosProfile);
        };


    } else {

        alert("Usted no está loggeado, para ver su perfil inicie sesión");
        window.location = "index.html"; //TE TIRA DIRECTO PARA QUE PUEDAS INICIAR SESION

        localStorage.setItem("VengoDelProfile", JSON.stringify("T")); // CUANDO INICIES SESION EN VEZ DE IR AL INICIO YA VA A TU CARRO
    };

});