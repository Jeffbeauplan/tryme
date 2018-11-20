import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../service/challenge.service";
import {Challenge, Question} from "../models/challenge.model";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-make-trivia',
  templateUrl: './make-trivia.component.html',
  styleUrls: ['./make-trivia.component.css']
})
export class MakeTriviaComponent implements OnInit {
  testChallenge: Challenge;
  question: Question;
  questionList: Question[]
  currentUser: any;

  constructor(private challengeService: ChallengeService, private  userService: UserService) { }


  ngOnInit() {
    this.testChallenge = new Challenge()
    this.currentUser = this.userService.getCurrentUser();
    this.question = {
      question: "What is my name?",
      correctAnswer: "Jeff Beauplan",
      wrongAnswers: ["Sam", "Daniel", "Josh"]
    } as Question;

    this.questionList = []
    for(var i =0; i < 10; i++){
      this.questionList.push(this.question);
    }

    this.testChallenge = {
      $key: '02',
      title: 'TestChallenge',
      author: this.currentUser.displayName,
      category: [],
      topScore: Math.floor(Math.random() * 150) + 1 ,
      topScorer: 'Jeff',
      timesPlayed: Math.floor(Math.random() * 100) + 1 ,
      questions: this.questionList,
      numberOfQuestions: Math.floor(Math.random() * 20) + 1
    } as Challenge

    this.challengeService.insertChallenge(this.testChallenge);
    console.log("Inserted test challenge\n" + this.testChallenge)
  }

  saveChallenge(){
    console.log(this.testChallenge.title)

    // this.challengeService.insertChallenge(this.testChallenge);
  }

}
