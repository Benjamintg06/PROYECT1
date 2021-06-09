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

var uploadjob = document.getElementById("btnpost");
uploadjob.addEventListener("click", datapost);

async function datapost(){

    var company = document.getElementById("from_name-1").value;
    var type = document.getElementById("calltime").value;
    var position = document.getElementById("from_name-2").value;
    var location = document.getElementById("from_name").value;
    var category = document.getElementById("category").value;
    var description = document.getElementById("comments").value;
    var email = document.getElementById("from_name-3").value;
    var howApply = document.getElementById("comments-1").value;
    
    var datapost = new Job(
        company,
        type,
        position,
        location,
        category,
        description,
        email,
        howApply
      );
   
const data = await fetchData("jobs",JSON.stringify(datapost));
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