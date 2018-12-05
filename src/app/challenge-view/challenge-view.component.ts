import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChallengeService} from "../service/challenge.service";
import {Challenge, Question} from "../models/challenge.model";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.css']
})
export class ChallengeViewComponent implements OnInit {
  challenge : Challenge
  questionList : Question[]
  answerList: string[]
  key: string
  count : number = 0;
  score: number = 0;
  submited = false;
  viewAnswers = false;
  currentUser: any;

  constructor(private route: ActivatedRoute, private challengeService: ChallengeService, private userService: UserService) { }

  ngOnInit() {
    // console.log("id: " + this.route.snapshot.paramMap.get('id'));
    this.currentUser = this.userService.getCurrentUser();
    this.key = this.route.snapshot.paramMap.get('id');
    this.currentUser =

    this.challengeService.getChallengeByKey(this.key).snapshotChanges().subscribe( challenge => {
      this.questionList = []

      challenge.payload.child('questions').forEach(question => {
        var questionJSON = question.toJSON();
        questionJSON["$key"] = question.key;
        questionJSON["num"] = parseInt(question.key)+1;
        this.questionList.push(questionJSON as Question)
      })

      var challengeJSON = challenge.payload.toJSON();
      challengeJSON["$key"] = challenge.key;
      this.challenge = challengeJSON as Challenge;
      this.answerList = new Array<string>(this.questionList.length)
    });
  }

  submitChallenge() {
    this.challenge.timesPlayed++;

    for(let i = 0; i < this.questionList.length; i++) {
      if(this.answerList[i] && this.questionList[i].correctAnswer.toLowerCase() == this.answerList[i].toLowerCase()) this.score++;
    }

    if(this.challenge.topScore < this.score) {
      this.challenge.topScore = this.score;
    }

    // console.log(this.challenge)
    this.submited = true;
    this.challengeService.updateChallenge(this.challenge)
  }

}
