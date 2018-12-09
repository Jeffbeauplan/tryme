import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChallengesComponent } from './my-challenges.component';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../environments/environment";
import {MatDialogModule, MatSnackBarModule} from "@angular/material";

describe('MyChallengesComponent', () => {
  let component: MyChallengesComponent;
  let fixture: ComponentFixture<MyChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChallengesComponent ],
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
    fixture = TestBed.createComponent(MyChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
