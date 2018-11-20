import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
  styles: [
    `
    agm-map {
      height: 400px;
      width: 100%;
      display: flex;
      justify-content: center;
    }`
  ],
})
export class GoogleMapComponent implements OnInit {
  lat: number = 36.778259;
  lng: number = -119.417931;
  constructor() { }

  ngOnInit() {
    console.log("loaded map component")
  }

}
