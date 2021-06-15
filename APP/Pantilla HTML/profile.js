async function fetchData(object) {
    try {
      const call = await fetch(
        `https://prueba-api-programacion-3.herokuapp.com/api/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: object,
        }
      );
      const info = await call.json();
      return info;
    } catch (error) {
      return [];
    }
  }
  
  
  //variable uploadjob se le asigno el boton btnpost
  var updateuser = document.getElementById("btnprofile");
  
  
  //Metodo para ejecutar la function datapost cuando se haga click en el boton "btnpost"
  updateuser.addEventListener("click", datapost);
  
  
  /*Funcion DATAPOST: Se encarga de recolectar los datos ingresados en lo input,
  luego de tener los datos, se crea un OBJETO llamado "datapostObjeto" encargado de almacenar 
  los datos de los input, ese objeto sera ingreso en el "data" para verficar en la consola los datos y
  subirlos a FIREBSE */
  async function datapost(e){
      e.preventDefault();     
var username = document.getElementById("username").value;
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
//var confirmation = document.getElementById("PassConfirmation").value;
     

      var datapostObjeto = new CreateUser(
         username,
         email,
         password
        );
     
        
  
  const data = await fetchData(JSON.stringify({...datapostObjeto, id:"THFweJcAn5d0m3XBcdHAXK7Bczk1"}));
  console.log(data);
  }

 
  
  