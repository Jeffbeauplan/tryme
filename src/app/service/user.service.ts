import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {User} from "../models/user.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;
  selectedUser: User = new User();
  currentUser: any;

  constructor(private firebase: AngularFireDatabase, private auth: AuthService) {
    this.getData();
    this.getCurrentUser();
  }

  getData(){
    this.userList = this.firebase.list('Users')
    this.getCurrentUser()
    return this.userList
  }

  getCurrentUser() {
    this.auth.afAuth.authState.subscribe((user) => {
      this.currentUser = user;
    })

    return this.currentUser;
  }

  insertUser(user: User){
    this.userList.push({
      firstName: this.currentUser.displayName.toString().split(' ')[0],
      lastName: this.currentUser.displayName.toString().split(' ')[1],
      location: {
        city: user.location.city,
        zipcode: user.location.zipcode,
        country: user.location.country
      },
      userName: this.currentUser.displayName,
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
