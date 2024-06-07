import { PlayerDataModel } from "../models/player-data.model";

export const DefaultGameState: number[] = [0,0,0,0,0,0,0,0,0];

export const MockPlayerData: PlayerDataModel = {
  name: 'Henry Bale',
  id: 1223,
  wins: 5
}

export const WinningSolutions: number[][] = [
  // Horizontal Solutions
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical Solutions
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal Solutions
  [0, 4, 8],
  [2, 4, 6]
];
