import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import {Challenge, Question} from "../models/challenge.model";
@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  challengeList: AngularFireList<any>;
  selectedChallenge: Challenge = new Challenge();

  constructor(private firebase: AngularFireDatabase) {
    this.challengeList = this.getData();
  }

  getData(){
    this.challengeList = this.firebase.list('challenges')
    return this.challengeList
  }

  insertChallenge(challenge: Challenge){
    this.challengeList.push({
      title: challenge.title,
      author: challenge.author,
      category: challenge.category,
      topScore: challenge.topScore,
      topScorer: challenge.topScorer,
      timesPlayed: challenge.timesPlayed,
      questions: challenge.questions,
      numberOfQuestions: challenge.questions.length
    })
  }

  updateChallenge(challenge: Challenge){
    this.challengeList.update(challenge.$key,{
      title: challenge.title,
      author: challenge.author,
      category: challenge.category,
      topScore: challenge.topScore,
      topScorer: challenge.topScorer,
      timesPlayed: challenge.timesPlayed,
      questions: challenge.questions
    })
  }

  deleteChallenge($key: string) {
    this.challengeList.remove($key);
  }
}
