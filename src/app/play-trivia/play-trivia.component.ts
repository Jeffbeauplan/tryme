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
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";

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
  showSearch: boolean = true;
  admin: boolean = false;


  constructor(public dialog: MatDialog, private firebaseService: FirebaseService, private challengeService: ChallengeService, private router: Router,
              private userService: UserService, private reportService: ReportService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.isAdmin();
    this.getChallenges()
  }

  getChallenges() {
    this.challengeService.getData().snapshotChanges().subscribe(challenge => {
      this.challengeList = [];
      challenge.forEach(element => {
        var challengeJSON = element.payload.toJSON();
        challengeJSON["$key"] = element.key;
        this.challengeList.unshift(challengeJSON as Challenge);
      })
    });
  }

  searchChallenge(title: string, author: string, category: string) {
    this.challengeService.getData().snapshotChanges().subscribe(challenge => {
      var tempList = this.challengeList;
      this.challengeList = [];
      challenge.forEach(element => {
        var challengeJSON = element.payload.toJSON();
        challengeJSON["$key"] = element.key;
        if (~challengeJSON["title"].toString().toLowerCase().indexOf(title.toLocaleLowerCase())
          && ~challengeJSON["author"].toString().toLowerCase().indexOf(author.toLocaleLowerCase())
          && ~challengeJSON["category"].toString().indexOf(category)) this.challengeList.push(challengeJSON as Challenge);
      })

      if(this.challengeList.length < 1) {
        this.challengeList = tempList;
        this.openSnackBar("No challenges found");
      }
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
      if(result) this.reportChallenge(challenge, result)
    });
  }

  reportChallenge(challenge: Challenge, reason: string) {
    var reportItem = new Report(challenge.author, reason, challenge.$key, challenge);
    this.reportService.insertReport(reportItem);
    this.openSnackBar("Successfully reported " + challenge.title)
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  deleteChallenge(challengeId: string) {
    this.challengeService.deleteChallenge(challengeId)
  }

  openDeleteConfirmation(challenge: Challenge) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      data: challenge
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) this.deleteChallenge(challenge.$key);
    });
  }

  isAdmin() {
    this.userService.getData().snapshotChanges().subscribe( users => {
      users.forEach( user => {
        if (user.key == this.currentUser.uid.toString()) this.admin = true;
      })
    })
  }
}
