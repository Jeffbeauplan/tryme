import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.afAuth.authState.subscribe((user) => {this.currentUser = user})

    console.log(this.currentUser)
  }

}
