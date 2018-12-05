import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../service/challenge.service";
import {FirebaseService} from "../service/firebase.service";
import {Challenge} from "../models/challenge.model";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-my-challenges',
  templateUrl: './my-challenges.component.html',
  styleUrls: ['./my-challenges.component.css']
})
export class MyChallengesComponent implements OnInit {
  challengeList: Challenge[];
  searchString : string;
  currentUser: any;

  constructor(private firebaseService: FirebaseService, private challengeService: ChallengeService, private userServive: UserService) { }

  ngOnInit() {
    this.getChallenges()
  }

  getChallenges() {
    this.challengeService.getData().snapshotChanges().subscribe(challenge => {
      this.challengeList = [];
      this.currentUser = this.userServive.getCurrentUser();
      challenge.forEach(element => {
        var challengeJSON = element.payload.toJSON();
        challengeJSON["$key"] = element.key;
        if (challengeJSON["author"] == this.currentUser.displayName) this.challengeList.push(challengeJSON as Challenge);
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
        if (challengeJSON["title"] == input && challengeJSON["author"] == this.currentUser.displayName) this.challengeList.push(challengeJSON as Challenge);
      })
      console.log(this.challengeList)
    });

  }


}
