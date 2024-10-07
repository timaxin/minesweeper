export type Cell = {
  x: number;
  y: number;
  flag: boolean;
  withBomb: boolean;
  open: boolean;
  bombsNearby: number;
};

export type Field = Cell[][];

export type FieldSize = { width: number, height: number };

export enum GameStatuses {
  RUNNING = 'running',
  VICTORY = 'victory',
  GAME_OVER = 'gameOver',
}
