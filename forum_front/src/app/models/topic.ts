import {UserComment} from "./UserComment";

export interface Topic{
  id: number,
  label: String,
  description: String,
  comments: UserComment[]
}
