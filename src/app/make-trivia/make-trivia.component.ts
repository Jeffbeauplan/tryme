import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../service/challenge.service";
import {Challenge, Question} from "../models/challenge.model";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-make-trivia',
  templateUrl: './make-trivia.component.html',
  styleUrls: ['./make-trivia.component.css']
})
export class MakeTriviaComponent implements OnInit {
  testChallenge: Challenge;
  question: Question;
  questionList: Question[] = []
  currentUser: any;
  questionCount: number = 0;
  array = [1];
  arraySize: number;

  constructor(private challengeService: ChallengeService, private  userService: UserService, public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.testChallenge = new Challenge()
    this.currentUser = this.userService.getCurrentUser();

    this.question = {
      question: "",
      correctAnswer: "",
      hint: "",
      //wrongAnswers: ["Sam", "Daniel", "Josh"]
    } as Question;

    this.questionList = []
    for(var i =0; i < 2; i++){
     this.questionList.push(new Question());
    }

    // this.testChallenge = {
    //   $key: '02',
    //   title: 'TestChallenge',
    //   author: this.currentUser.displayName,
    //   category: [],
    //   topScore: Math.floor(Math.random() * 150) + 1 ,
    //   topScorer: 'Jeff',
    //   timesPlayed: Math.floor(Math.random() * 100) + 1 ,
    //   questions: this.questionList,
    //   numberOfQuestions: Math.floor(Math.random() * 20) + 1
    // } as Challenge

    //this.challengeService.insertChallenge(this.testChallenge);
    // console.log("Inserted test challenge\n" + this.testChallenge)
  }

  saveChallenge(){
    this.testChallenge.questions = this.questionList;
    this.testChallenge.author = this.userService.getCurrentUser().displayName;
    this.testChallenge.numberOfQuestions = this.questionList.length-1;
    this.testChallenge.topScore = 0;
    this.testChallenge.timesPlayed = 0;
    //this.testChallenge.questions.shift();
    console.log(this.testChallenge)
    this.openSnackBar()
    this.challengeService.insertChallenge(this.testChallenge);
    this.clearPage()
  }

  clearPage() {
    this.testChallenge = new Challenge();
    this.array = [1];
    this.questionList = [];
    for(var i =0; i < 2; i++){
      this.questionList.push(new Question());
    }
  }

  showCount(){
    console.log(this.questionCount)
  }

  increaseArrayElement() {
    this.arraySize = this.array[this.array.length - 1 ];
    this.arraySize += 1;
    this.array.push(this.arraySize);
    console.log(this.arraySize);
    if(this.arraySize == this.questionList.length) this.questionList.push(new Question());
  }

  decreaseArrayElement() {
    this.arraySize-=1;
    this.array.splice(this.arraySize, 1)
  }

  openSnackBar() {
    this.snackBar.open("Successfully created challenge ", '', {
      duration: 2000,
    });
  }

}
