import { TestBed, inject } from '@angular/core/testing';

import { LeaderboardService } from './leaderboard.service';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../environments/environment";

describe('LeaderboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaderboardService],
      imports:[
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  fit('should be created', inject([LeaderboardService], (service: LeaderboardService) => {
    expect(service).toBeTruthy();
  }));
});
