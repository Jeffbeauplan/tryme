import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {Challenge} from "../models/challenge.model";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  trivias: FirebaseListObservable<any>;
  challengeList: Challenge[];

  constructor(private db: AngularFireDatabase) { }

  getTrivias() {
    this.trivias = this.db.list('/challenges').valueChanges() as FirebaseListObservable<any>;
    return this.trivias
  }

}
