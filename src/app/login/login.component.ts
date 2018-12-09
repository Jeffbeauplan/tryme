import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  signUp = false;

  constructor(public auth: AuthService, private snackbar: MatSnackBar) { }

  ngOnInit() {

  }

  signUpWithEmail() {
    if(this.password.toString().length < 1){
      this.snackbar.open('You must enter a password','', {duration: 3000})
    }
    else {
      var self = this;
      this.auth.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then( (user) => {
        self.snackbar.open('Account created for ' + this.email,'', {duration: 3000})
        self.signUp = false;
      }).catch(function(error){
        console.log(error.message)
        self.openSnackbar(error.message)
      })
    }
  }

  loginWithEmail(){
    if(this.password.toString().length < 1){
      this.snackbar.open('You must enter a password','', {duration: 3000})
    }
    else {
      var self = this;
      this.auth.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
        console.log(error.message)
        self.openSnackbar(error.message)
      })
    }
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, '', {duration:4000})
  }
}
