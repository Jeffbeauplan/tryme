import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTriviaComponent } from './play-trivia.component';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../environments/environment";
import {MatDialogModule, MatSnackBarModule} from "@angular/material";

describe('PlayTriviaComponent', () => {
  let component: PlayTriviaComponent;
  let fixture: ComponentFixture<PlayTriviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayTriviaComponent ],
      imports:[
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
