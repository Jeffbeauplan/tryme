import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }

  goToPlayTrivia() {
    this.router.navigateByUrl('/play');
  }

  goToMakeTrivia() {
    this.router.navigateByUrl('/make-trivia');

  }

}
