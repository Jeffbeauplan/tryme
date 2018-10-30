import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Report} from "../models/report.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reportList: AngularFireList<any>;
  selectedReport: Report = new Report();

  constructor(private firebase: AngularFireDatabase) { }

  getData(){
    this.reportList = this.firebase.list('reports')
    return this.reportList
  }

  insertReport(report: Report){
    this.reportList.push({
      user: report.user,
      reason: report.reason,
      date: report.date
    })
  }

  updateReport(report: Report){
    this.reportList.update(report.$key,{
      user: report.user,
      reason: report.reason,
      date: report.date
    })
  }

  deleteReport($key: string) {
    this.reportList.remove($key);
  }
}
