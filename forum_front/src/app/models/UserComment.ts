import {User} from "./user";
import {Topic} from "./topic";

export interface UserComment {
  id: number,
  user: User,
  text: String,
  date: String
}
