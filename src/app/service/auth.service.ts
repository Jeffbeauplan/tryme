import { Injectable } from '@angular/core';
import  {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  loginWithTwitter(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())

  }

  loginWithFacebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())

  }

  loginWithEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch( function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;


    });
  }

  createAccountWithEmail(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  logout() {
    this.afAuth.auth.signOut()
  }
}
