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
  challengeList: Challenge[];
  searchString : string;

  constructor(private firebaseService: FirebaseService, private challengeService: ChallengeService) { }

  ngOnInit() {
    this.getChallenges()

  }

  getChallenges() {
    this.challengeService.getData().snapshotChanges().subscribe(challenge => {
      this.challengeList = [];
      challenge.forEach(element => {
        var challengeJSON = element.payload.toJSON();
        challengeJSON["$key"] = element.key;
        this.challengeList.push(challengeJSON as Challenge);
      })

      console.log(this.challengeList)
    });
  }

  searchChallenge(input: string) {
    console.log(input )
    this.challengeService.getData().snapshotChanges().subscribe(challenge => {
      this.challengeList = [];
      challenge.forEach(element => {
        var challengeJSON = element.payload.toJSON();
        challengeJSON["$key"] = element.key;
        if (challengeJSON["title"] == input) this.challengeList.push(challengeJSON as Challenge);
      })
      console.log(this.challengeList)
    });

  }


}
