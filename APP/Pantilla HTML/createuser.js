/*Metofo fetchData se encargar de obtener la collection(tabla en firebase) y el objeto(informacion que subira)
la funcion emplea el metodo POST para mandar lo recolectado a la API la cual enviara a FIREBASE los datos obtenidos*/
async function fetchDataUser(object) {
    try {
      const call = await fetch(
        `https://prueba-api-programacion-3.herokuapp.com/api/user/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        }
      );
      const info = await call.json();
      return info;
    } catch (error) {
      return [];
    }
  }

//variable uploadjob se le asigno el boton btnpost
var btn_create_user = document.getElementById("form_create_user");

//Metodo para ejecutar la function datapost cuando se haga click en el boton "btnpost"
btn_create_user.addEventListener("submit", DataCreateUser);

var firstname = document.getElementById("exampleFirstName");
var lastname = document.getElementById("lastname");
var email = document.getElementById("exampleInputEmail");
var password = document.getElementById("examplePasswordInput");
var confirmation = document.getElementById("exampleRepeatPasswordInput");

async function DataCreateUser(e){
    e.preventDefault()
   
    validateForm();
        
    var DataCreateUserObjeto = new CreateUser(
        firstname.value +" " +lastname.value,
        email.value,
        password.value
        
    );

    const data = await fetchDataUser(DataCreateUserObjeto);
    console.log(data);
}

function validateForm(){
    //console.log(firstnameame);
   if( firstname.value.length == 0){
        alert("Ingrese su Nombre")
        return false;
    } 
    if (password.value.length <6){
        alert("La clave es menor de 6 caracteres")
        return false;
    }
    if(password.value !== confirmation.value){
            alert("Las contraseñas no coinciden")
            return false;
    }
}

