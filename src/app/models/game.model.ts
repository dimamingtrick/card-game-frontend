import { CardModel } from "./card.model";
 
export interface GameModel {
  _id: String;
  isCompleted: Boolean;
  status: String;
  createdAt: Date;
  cards: Array<CardModel | String>;
  selectedCards: Array<CardModel>;
}
