import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ReportService} from "../service/report.service";
import {Report} from "../models/report.model";

@Component({
  selector: 'app-view-reported-challenge-dialog',
  templateUrl: './view-reported-challenge-dialog.component.html',
  styleUrls: ['./view-reported-challenge-dialog.component.css']
})
export class ViewReportedChallengeDialogComponent implements OnInit {

  report: Report
  questionList = []

  constructor(public dialogRef: MatDialogRef<ViewReportedChallengeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Report, private reportService: ReportService) { }

  ngOnInit() {
    this.report = this.data
    this.report.questions.forEach(question => {this.questionList.push(question)})
  }

  onCancelClick(){
    this.dialogRef.close();
  }

}
