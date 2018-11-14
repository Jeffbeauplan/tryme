import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import { MatCardModule, MatButtonModule , MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from "@angular/forms";
import {PlayTriviaComponent} from './play-trivia/play-trivia.component';
import {MakeTriviaComponent} from './make-trivia/make-trivia.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule, Routes} from "@angular/router";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {FirebaseService} from "./service/firebase.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AuthService} from "./service/auth.service";
import { AgmCoreModule } from '@agm/core';
import { MyChallengesComponent } from './my-challenges/my-challenges.component';
import { LoginComponent } from './login/login.component';
//Routes

const appRoutes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'play', component: PlayTriviaComponent},
  {path: 'make-trivia', component: MakeTriviaComponent},
  {path: 'my-challenges', component: MyChallengesComponent},
  {path: 'login', component: LoginComponent}
]
console.log(environment)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayTriviaComponent,
    MakeTriviaComponent,
    NavbarComponent,
    FooterComponent,
    MyChallengesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBajSwGK5rd41KvHb99Wl0L-IDYkwzGNZo'
    })
  ],
  providers: [FirebaseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
