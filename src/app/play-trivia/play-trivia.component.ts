import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../service/firebase.service";
import {ChallengeService} from "../service/challenge.service";
import {Challenge, Question} from "../models/challenge.model";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {Report} from "../models/report.model";
import {ReportService} from "../service/report.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ReportDialogComponent} from "../report-dialog/report-dialog.component";
import {SearchObject} from "../models/search.model";

@Component({
  selector: 'app-play-trivia',
  templateUrl: './play-trivia.component.html',
  styleUrls: ['./play-trivia.component.css']
})

export class PlayTriviaComponent implements OnInit {
  challengeList: Challenge[];
  searchString : string;
  currentUser: any;
  reason: string;
  search: SearchObject = new SearchObject();

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService, private challengeService: ChallengeService, private router: Router,
              private userService: UserService, private reportService: ReportService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
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

      //console.log(this.challengeList)
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
      //console.log(this.challengeList)
    });

  }

  goToChallenge(challengeId: string) {
    this.router.navigate(['/play', challengeId])
  }

  openDialog(challenge: Challenge): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '250px',
      data: challenge
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.reason = result;
      this.reportChallenge(challenge, result)
    });
  }

  reportChallenge(challenge: Challenge, reason: string) {
    var reportItem = new Report(challenge.author, reason, challenge.$key);
    this.reportService.insertReport(reportItem);
    this.openSnackBar(challenge.title)
  }

  openSnackBar(message: string) {
    this.snackBar.open("Successfully reported " + message, '', {
      duration: 2000,
    });
  }
}
