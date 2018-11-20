import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(private route: ActivatedRoute, private router: Router,  private userService: UserService, public auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  goToPlayTrivia() {
    this.router.navigateByUrl('/play');
  }

  goToMakeTrivia() {
    this.router.navigateByUrl('/make-trivia');

  }

}
