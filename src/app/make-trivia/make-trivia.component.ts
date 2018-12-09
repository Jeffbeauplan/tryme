import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../service/challenge.service";
import {Challenge, Question} from "../models/challenge.model";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-make-trivia',
  templateUrl: './make-trivia.component.html',
  styleUrls: ['./make-trivia.component.css']
})
export class MakeTriviaComponent implements OnInit {
  testChallenge: Challenge;
  currentUser: any;
  key: string

  constructor(private challengeService: ChallengeService, private  userService: UserService, public snackBar: MatSnackBar, private route: ActivatedRoute) { }


  ngOnInit() {
    this.testChallenge = new Challenge()
    this.currentUser = this.userService.getCurrentUser();

    if(this.route.snapshot.paramMap.get('id')) {
      this.key = this.route.snapshot.paramMap.get('id');
      this.challengeService.getChallengeByKey(this.key).snapshotChanges().subscribe( challenge => {
        var challengeJSON = challenge.payload.toJSON();
        challengeJSON["$key"] = challenge.key;
        this.testChallenge = challengeJSON as Challenge;

        console.log(this.testChallenge)
        this.testChallenge.questions = [];

        challenge.payload.child('questions').forEach(question => {
          var questionJSON = question.toJSON();
          var newQuestion = new Question();
          newQuestion.question = questionJSON["question"];
          newQuestion.correctAnswer = questionJSON["correctAnswer"];
          this.testChallenge.questions.push(newQuestion);
        })
      })
    }
    else {
      this.testChallenge.questions = []
      this.testChallenge.questions.push(new Question());
    }
  }

  saveChallenge() {
    if(this.isValidChallenge()) {
      this.testChallenge.numberOfQuestions = this.testChallenge.questions.length;
      if (this.route.snapshot.paramMap.get('id')) {
        this.challengeService.updateChallenge(this.testChallenge);
      }
      else {
        this.testChallenge.author = this.userService.getCurrentUser().displayName;
        this.testChallenge.topScore = 0;
        this.testChallenge.timesPlayed = 0;
        this.challengeService.insertChallenge(this.testChallenge);
      }
      this.openSnackBar()
      this.clearPage()
    }
    else {
      this.snackBar.open('Invalid Challenge: Missing Data! Please check title, category, and all questions', '', {duration: 4000})
    }
  }

  isValidChallenge() : boolean {
    var foundEmpty = false;
    if(this.testChallenge.title && this.testChallenge.category) {
      this.testChallenge.questions.forEach( question => {
        if(question.question === "" || question.correctAnswer === "" ) {
          foundEmpty = true;
        }
      });
      return !foundEmpty;
    }
    else return false;
  }

  clearPage() {
    this.testChallenge = new Challenge();
    this.testChallenge.questions = [];
    this.testChallenge.questions.push(new Question());
  }

  addQuestion() {
    this.testChallenge.questions.push(new Question());
  }

  removeQuestion() {
    this.testChallenge.questions.splice(-1)
  }

  openSnackBar() {
    this.snackBar.open("Successfully created challenge ", '', {
      duration: 2000,
    });
  }

}
