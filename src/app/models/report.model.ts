import {User} from "./user.model";

export class Report {
  $key: string
  user: User
  reason: string
  date: Date
}
