import { CardModel } from '../../models/card.model';

export interface CardState {
  card: CardModel | null;
  isGettingCard: boolean;
  isGetCardSuccess: boolean;
  isGetCardFailure: any;
}
