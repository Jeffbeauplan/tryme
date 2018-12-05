import {Component, Inject, OnInit} from '@angular/core';
import {Challenge} from "../models/challenge.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ReportDialogComponent} from "../report-dialog/report-dialog.component";

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  challenge: Challenge

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Challenge) { }

  ngOnInit() {
    this.challenge = this.data;
  }

  onCancelClick(){
    this.dialogRef.close();
  }
}
