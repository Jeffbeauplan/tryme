import {User} from "./user.model";
import DateTimeFormat = Intl.DateTimeFormat;
import {Challenge, Question} from "./challenge.model";

export class Report {
  constructor (user: string = '', reason: string = '', key: string = '', challenge: Challenge) {
    this.user = user;
    this.reason = reason;
    this.date = Date();
    this.challengeKey = key;
    this.challengeTitle = challenge.title;
    this.author = challenge.author;
    this.category = challenge.category;
    this.questions = challenge.questions;
  }

  $key: string
  user: string;
  reason: string
  date: string
  challengeKey: string
  challengeTitle: string
  author: string
  category: string
  questions: Question[]
}
