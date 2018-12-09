import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTriviaComponent } from './make-trivia.component';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../environments/environment";
import {MatSnackBarModule} from "@angular/material";

describe('MakeTriviaComponent', () => {
  let component: MakeTriviaComponent;
  let fixture: ComponentFixture<MakeTriviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeTriviaComponent ],
      imports:[
        RouterTestingModule,
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
    fixture = TestBed.createComponent(MakeTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
