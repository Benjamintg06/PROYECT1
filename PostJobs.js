/*Metofo fetchData se encargar de obtener la collection(tabla en firebase) y el objeto(informacion que subira)
la funcion emplea el metodo POST para mandar lo recolectado a la API la cual enviara a FIREBASE los datos obtenidos*/
async function fetchData(collection, object) {
  try {
    const call = await fetch(
      `https://prueba-api-programacion-3.herokuapp.com/api/collection/${collection}`,
      {
        method: "POST",
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
var uploadjob = document.getElementById("btnpost");


//Metodo para ejecutar la function datapost cuando se haga click en el boton "btnpost"
uploadjob.addEventListener("click", datapost);


/*Funcion DATAPOST: Se encarga de recolectar los datos ingresados en lo input,
luego de tener los datos, se crea un OBJETO llamado "datapostObjeto" encargado de almacenar 
los datos de los input, ese objeto sera ingreso en el "data" para verficar en la consola los datos y
subirlos a FIREBSE */
async function datapost(){

    var company = document.getElementById("from_name-1").value;
    var type = document.getElementById("calltime").value;
    var position = document.getElementById("from_name-2").value;
    var location = document.getElementById("from_name").value;
    var category = document.getElementById("category").value;
    var description = document.getElementById("comments").value;
    var email = document.getElementById("from_name-3").value;
    var howApply = document.getElementById("comments-1").value;
    
    var datapostObjeto = new Job(
        company,
        type,
        position,
        location,
        category,
        description,
        email,
        howApply
      );
   

const data = await fetchData("jobs",JSON.stringify( datapostObjeto));
console.log(data);
}

/*this.company = company;
this.type = type;
this.position = position;
this.location = location;
this.category = category;
this.description = description;
this.email = email;
this.howApply = howApply;
}*/