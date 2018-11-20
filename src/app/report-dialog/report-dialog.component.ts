import {Component, Inject, OnInit} from '@angular/core';
import {PlayTriviaComponent} from "../play-trivia/play-trivia.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Report} from "../models/report.model";
import {Challenge} from "../models/challenge.model";
import {ReportService} from "../service/report.service";

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {
  reason: string
  challenge: Challenge

  constructor(public dialogRef: MatDialogRef<PlayTriviaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Challenge, private reportService: ReportService) { }

  ngOnInit() {
    this.challenge = this.data;
  }

  valueSelected(value: string) {
    this.reason = value;
  }
  onCancelClick(){
    this.dialogRef.close();
  }

}
