import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  admin: boolean = false;

  constructor(public auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe((user) => {
      this.currentUser = user;
      this.isAdmin();
    })
  }

  isAdmin() {
    this.userService.getData().snapshotChanges().subscribe( users => {
      users.forEach( user => {
        this.admin = (user.key == this.currentUser.uid.toString());
      })
    })
  }

}
