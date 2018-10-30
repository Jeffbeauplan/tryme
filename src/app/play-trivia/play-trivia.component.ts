import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../service/firebase.service";
import {ChallengeService} from "../service/challenge.service";
import {Challenge, Question} from "../models/challenge.model";

@Component({
  selector: 'app-play-trivia',
  templateUrl: './play-trivia.component.html',
  styleUrls: ['./play-trivia.component.css']
})
export class PlayTriviaComponent implements OnInit {
  trivias: any;
  testChallenge: Challenge;

  constructor(private firebaseService: FirebaseService, private challengeService: ChallengeService) { }

  ngOnInit() {
    this.firebaseService.getTrivias().subscribe((trivias) => {this.trivias = trivias});
    console.log(this.trivias)

    this.testChallenge = {
      $key: '02',
      title: 'TestChallenge',
      author: 'Jeff',
      category: [],
      topScore: [],
      topScorer: 'Jeff',
      timesPlayed: 5,
      questions: [] as Question[],
    } as Challenge

    this.challengeService.insertChallenge(this.testChallenge);
    console.log("Inserted test challenge\n" + this.testChallenge)
  }


}
