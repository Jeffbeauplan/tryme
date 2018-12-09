import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../environments/environment";
import {MatDialogModule} from "@angular/material";

describe('DeleteConfirmationDialogComponent', () => {
  let component: DeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationDialogComponent ],
      imports:[
        RouterTestingModule,
        MatDialogModule,
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
    fixture = TestBed.createComponent(DeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
