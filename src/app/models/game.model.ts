import { CardModel } from "./card.model";
import { GameStatuses } from './GameStatuses.model';
 
export interface GameModel {
  _id: String;
  isCompleted: Boolean;
  status: GameStatuses;
  createdAt: Date;
  cards: Array<CardModel>;
  selectedCards: Array<CardModel>;
}
