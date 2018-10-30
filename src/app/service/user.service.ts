import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;
  selectedUser: User = new User();

  constructor(private firebase: AngularFireDatabase) { }

  getData(){
    this.userList = this.firebase.list('users')
    return this.userList
  }

  insertUser(user: User){
    this.userList.push({
      firstName: user.firstName,
      lastName: user.lastName,
      location: {
        city: user.location.city,
        zipcode: user.location.zipcode,
        country: user.location.country
      },
      userName: user.userName,
      isAdmin: user.isAdmin
    })
  }

  updateUser(user: User){
    this.userList.update(user.$key,{
      firstName: user.firstName,
      lastName: user.lastName,
      location: {
        city: user.location.city,
        zipcode: user.location.zipcode,
        country: user.location.country
      },
      userName: user.userName,
      isAdmin: user.isAdmin
    })
  }

  deleteUser($key: string) {
    this.userList.remove($key);
  }
}
