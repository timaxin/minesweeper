export type Cell = {
  x: number;
  y: number;
  flag: boolean;
  withBomb: boolean;
  open: boolean;
  bombsNearby: number;
};

export type Field = Cell[][];

export enum GameStatuses {
  RUNNING = 'running',
  VICTORY = 'victory',
  GAME_OVER = 'gameOver',
}
