import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChallengeViewComponent} from './challenge-view.component';
import {Challenge, Question} from "../models/challenge.model";
import {Routes} from "@angular/router";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {environment} from "../../environments/environment";
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('ChallengeViewComponent', () => {
  let component: ChallengeViewComponent;
  let fixture: ComponentFixture<ChallengeViewComponent>;
  let question1: Question = {
    question: '',
    correctAnswer: "Answer1",
    hint: '',
    wrongAnswers: [],
    num: 1
  }
  let question2: Question = {
    question: '',
    correctAnswer: "Answer2",
    hint: '',
    wrongAnswers: [],
    num: 2
  }
  let challenge: Challenge = {
    $key:'-LSxWKFXU1s0tOk26QsA',
    title: '',
    author: '',
    category: '',
    topScore: 0,
    topScorer: '',
    timesPlayed: 0,
    questions: [question1, question2],
    numberOfQuestions: 2
  }

  let answerList = ['Answer1', 'rand'];
  const appRoutes: Routes =[
    {path: 'play/:id', component: ChallengeViewComponent},
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeViewComponent ],
      imports:[
        RouterTestingModule,
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
    fixture = TestBed.createComponent(ChallengeViewComponent);
    component = fixture.componentInstance;
    component.challenge = challenge;
    component.answerList = answerList;
    component.questionList = challenge.questions;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should calculate score', () => {
    component.submitChallenge();
    expect(component.score).toEqual(1);
  })

  fit('should increment times play after Submission', () => {
    component.submitChallenge();
    expect(component.challenge.timesPlayed).toEqual(2);
  })

  fit('should update top score if score is higher', () => {
    component.submitChallenge();
    expect(component.challenge.topScore).toEqual(1);
  })
});
