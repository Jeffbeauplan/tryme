import { Component, OnInit } from '@angular/core';
import {ChallengeService} from "../service/challenge.service";
import {FirebaseService} from "../service/firebase.service";
import {Challenge} from "../models/challenge.model";
import {UserService} from "../service/user.service";
import {Report} from "../models/report.model";
import {ReportDialogComponent} from "../report-dialog/report-dialog.component";
import {Router} from "@angular/router";
import {MatDialog, MatSnackBar} from "@angular/material";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";
import {SearchObject} from "../models/search.model";

@Component({
  selector: 'app-my-challenges',
  templateUrl: './my-challenges.component.html',
  styleUrls: ['./my-challenges.component.css']
})
export class MyChallengesComponent implements OnInit {
  challengeList: Challenge[];
  searchString : string;
  currentUser: any;
  showSearch: boolean = false;
  search: SearchObject = new SearchObject();

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService, private challengeService: ChallengeService, private userServive: UserService, private router: Router, public snackBar: MatSnackBar) { }

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

      //console.log(this.reportList)
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

  goToChallenge(challengeId: string) {
    this.router.navigate(['/play', challengeId])
  }

  updateChallenge(challengeId: string) {
    this.router.navigate(['/make-trivia', challengeId])
  }

  deleteChallenge(challengeId: string) {
    this.challengeService.deleteChallenge(challengeId)
    this.openSnackBar("Successfully deleted Challenge")
  }

  openDialog(challenge: Challenge): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: challenge
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) this.deleteChallenge(challenge.$key);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }


}
