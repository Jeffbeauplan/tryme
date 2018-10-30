import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseListObservable} from "angularfire2/database-deprecated";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  trivias: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) { }

  getTrivias() {
    this.trivias = this.db.list('/trivia/all').valueChanges() as FirebaseListObservable<any>;
    return this.trivias
  }

}
