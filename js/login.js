//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("AutenticationBtn").addEventListener("click", function () {


        let UserName = document.getElementById("InputUserName");
        let PassWord = document.getElementById("InputPassWord");



        if (UserName.value === "" || PassWord.value === "") {
            alert("Se deben completar ambos campos!");

        } else {

            if (UserName.value == "usuario" && PassWord.value == "usuario") {
                alert("Autenticacion exitosa!");

                localStorage.setItem("NombreUsuario", JSON.stringify(UserName.value));
                localStorage.setItem("DireccionesUsuario", JSON.stringify(["Guardada 1","Guardada 2"])); //PRUEBA PARA CARRITO

                if (localStorage.getItem("VengoDelCart")) {
                    window.location = "cart.html";
                    localStorage.removeItem("VengoDelCart");
                } else {
                    window.location = "inicio.html";
                };

            } else {
                alert("Login de prueba! Ingresar con Usuario: usuario y Contraseña: usuario");
            }
        }



    })


});