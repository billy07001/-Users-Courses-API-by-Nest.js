import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  re = new RegExp('billy');
  Users = [
    {
        "id" : 1 ,
        "name" : "Billy Lai",
        "email" : "abc@billy.com"
    },
    {
        "id" : 2 ,
        "name" : "Pio Lai",
        "email" : "cde@billy.com"
    }
  ]
  getUsers() {
    return this.Users;
  }

  getUserbyname(name: string) {
    return this.Users.filter(user => user.name === name);
  }

  getUserbyemail(email: string) {
    if (this.re.test(email)){
        return this.Users.filter(user => user.email === email);
    }
    else {
        return [{
            "id" : -1,
            "name" : "Email pattern not match",
            "email" : "Email pattern not match"
        }];
    }
  }

  async findOneByToken(token){
    if (token === 'wool')
      return this.getUsers();
    else
      return null;
  }

  getUserbyid(id: String) {
    return this.Users.filter(user => user.id === Number(id));
  }

  addUser(name: string , email: string){

      if (this.re.test(email)){
        this.Users[this.Users.length] = {
            "id" : this.Users[this.Users.length-1].id+1,
            "name" : name,
            "email" : email
        };
        return this.Users[this.Users.length-1];
    }
      else {
          return -1;
      }
  }

  editUser(id: String , name:string , email:string){
    var result = this.Users.filter(user => user.id === Number(id));
    if (result.length > 0){
        if (this.re.test(email)){
            this.Users[Number(id)-1] = {
                "id" : Number(id),
                "name" : name,
                "email" : email 
            }
            return this.Users[Number(id)-1];
        }
        else{
            return -1;
        }
    }
    else {
        return -2;
    }
  }

  deleteUser(id: String){
    var result = this.Users.filter(user => user.id === Number(id));
    if (result.length > 0){
        this.Users.splice(this.Users.indexOf(result[0]),1);
        return 0;
    }
    else {
        return -1;
    }
  }
}
