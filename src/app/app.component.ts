import { Component } from '@angular/core';
import {AuthService} from "./service/auth.service";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TriviaApp';
  opened: boolean;
  admin: boolean = false;
  currentUser: any;

  constructor(public auth: AuthService, public userService: UserService){}

  ngOnInit() {
    this.auth.afAuth.authState.subscribe((user) => {
      this.currentUser = user;
      this.isAdmin();
    })
  }

  isAdmin() {
    this.userService.getData().snapshotChanges().subscribe( users => {
      users.forEach( user => {
        if (user.key == this.currentUser.uid.toString()) this.admin = true;
      })
    })
  }
}
