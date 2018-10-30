import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from "@angular/forms";
import {PlayTriviaComponent} from './play-trivia/play-trivia.component';
import {MakeTriviaComponent} from './make-trivia/make-trivia.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {FirebaseService} from "./service/firebase.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AuthService} from "./service/auth.service";
//Routes

const appRoutes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'play', component: PlayTriviaComponent},
  {path: 'make-trivia', component: MakeTriviaComponent}
]
console.log(environment)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayTriviaComponent,
    MakeTriviaComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [FirebaseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
