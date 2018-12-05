import { Component, OnInit } from '@angular/core';
import {Challenge, Question} from "../models/challenge.model";
import {SearchObject} from "../models/search.model";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ReportService} from "../service/report.service";
import {FirebaseService} from "../service/firebase.service";
import {Router} from "@angular/router";
import {ChallengeService} from "../service/challenge.service";
import {UserService} from "../service/user.service";
import {Report} from "../models/report.model";
import {ReportDialogComponent} from "../report-dialog/report-dialog.component";
import {ViewReportedChallengeDialogComponent} from "../view-reported-challenge-dialog/view-reported-challenge-dialog.component";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  reportList: Report[];
  searchString : string;
  currentUser: any;
  reason: string;
  search: SearchObject = new SearchObject();
  showSearch: boolean = true;
  admin: boolean = false;


  constructor(public dialog: MatDialog, private firebaseService: FirebaseService, private challengeService: ChallengeService, private router: Router,
              private userService: UserService, private reportService: ReportService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getReports()
    this.currentUser = this.userService.getCurrentUser()
    this.isAdmin()
  }

  getReports() {
    this.reportService.getData().snapshotChanges().subscribe(report => {
      this.reportList = [];
      report.forEach(element => {
        var questionList = [];

        element.payload.child('questions').forEach(question => {
          var questionJSON = question.toJSON();
          questionJSON["$key"] = question.key;
          questionJSON["num"] = parseInt(question.key)+1;
          questionList.push(questionJSON as Question)
        })

        var reportJSON = element.payload.toJSON();
        reportJSON["$key"] = element.key;
        reportJSON["questions"] = questionList;
        this.reportList.unshift(reportJSON as Report);
        console.log(reportJSON)

      })
    });
  }

  deleteChallenge(report: Report) {
    this.challengeService.deleteChallenge(report.challengeKey);
    this.reportService.deleteReport(report.$key);
    this.snackBar.open("Successfully Deleted Challenge and Marked Issue Resolved", "",{duration: 5000})
  }

  markResolved(reportId: string) {
    this.reportService.deleteReport(reportId);
    this.openSnackBar('Marked Resolved')
  }

  goToChallenge(challengeId: string) {
    console.log(challengeId)
    this.router.navigate(['/play', challengeId])
  }

  searchChallenge(title: string, author: string, category: string) {
    this.reportService.getData().snapshotChanges().subscribe(report => {
      var tempList = this.reportList;
      this.reportList = [];
      report.forEach(element => {
        var reportJSON = element.payload.toJSON();
        reportJSON["$key"] = element.key;
        if (~reportJSON["title"].toString().toLowerCase().indexOf(title.toLocaleLowerCase())
          && ~reportJSON["author"].toString().toLowerCase().indexOf(author.toLocaleLowerCase())
          && ~reportJSON["category"].toString().indexOf(category)) this.reportList.push(reportJSON as Report);
      })

      if(this.reportList.length < 1) {
        this.reportList = tempList;
        this.openSnackBar("No challenges found");
      }
    });

  }

  openDialog(report: Report): void {
    const dialogRef = this.dialog.open(ViewReportedChallengeDialogComponent, {
      width: '350px',
      data: report
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

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

  isAdmin() {
    this.userService.getData().snapshotChanges().subscribe( users => {
      users.forEach( user => {
        if (user.key == this.currentUser.uid.toString()) this.admin = true;
      })
    })
  }

}
