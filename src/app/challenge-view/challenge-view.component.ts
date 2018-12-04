import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChallengeService} from "../service/challenge.service";
import {Challenge, Question} from "../models/challenge.model";

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.css']
})
export class ChallengeViewComponent implements OnInit {
  challenge : Challenge
  questionList : Question[]
  key: string
  count : number = 0;

  constructor(private route: ActivatedRoute, private challengeService: ChallengeService) { }

  ngOnInit() {
    console.log("id: " + this.route.snapshot.paramMap.get('id'));
    this.key = this.route.snapshot.paramMap.get('id');

    this.challengeService.getChallengeByKey(this.key).snapshotChanges().subscribe( challenge => {
      this.questionList = []

      challenge.payload.child('questions').forEach(question => {
        var questionJSON = question.toJSON();
        questionJSON["$key"] = question.key;
        questionJSON["num"] = parseInt(question.key)+1;
        this.questionList.push(questionJSON as Question)
      })

      this.challenge = challenge.payload.toJSON() as Challenge

      console.log(this.challenge)
      console.log(this.questionList)
      console.log(this.questionList)
    });
    }


}
