/*funcion user, devolvera los parametros de dysplayName, email, passwoor para el api*/
function User(displayName, email, password) {

    return {password: password, email: email, displayName: displayName}
  
  }

/*Clase usuario*/
class CreateUser {
    constructor(displayName,email,password){
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        

    }
}
/*Clase de Job*/
class Job {
    constructor(company, type, position,  location, category, description, email,howApply){

        this.company = company;
        this.type = type;
        this.position = position;
        this.location = location;
        this.category = category;
        this.description = description;
        this.email = email;
        this.howApply = howApply;
    }
}

/*Clase de categoria*/
class Category{
    constructor(id,category){
        this.id = id;
        this.category = category;
    }
}



/* Clase Type: Part time, Full time, freelance*/

class Type{
    constructor(part_time, full_time, freelance){
        this.part_time = part_time;
        this.full_time = full_time;
        this.freelance = freelance;
    }
}

