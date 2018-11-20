import {User} from "./user.model";
import DateTimeFormat = Intl.DateTimeFormat;

export class Report {
  constructor (user: string = '', reason: string = '', key: string = '') {
    this.user = user;
    this.reason = reason;
    this.date = Date();
    this.challengeKey = key;
  }

  $key: string
  user: string;
  reason: string
  date: string
  challengeKey: string
}
