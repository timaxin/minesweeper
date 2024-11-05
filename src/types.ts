/* eslint-disable no-unused-vars */
import { ZodIssue } from 'zod';

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

export enum GameStatus {
  RUNNING = 'running',
  VICTORY = 'victory',
  GAME_OVER = 'gameOver',
}

export type SettingsState = {
  invertControls: boolean,
  fieldSize: FieldSize,
  bombsCount: number,
}

export type SettingsAction = {
  type: 'setFieldSize' | 'setInvertControls' | 'setBombsCount',
  value: FieldSize | boolean | number | string,
}

export type SettingsConfigKeys = 'width' | 'height' | 'bombsCount';

export type SettingsZodIssue = Omit<ZodIssue, 'path'> & {
  path: [SettingsConfigKeys, ...any[]];
};

export type SettingsErrors = Partial<Record<SettingsConfigKeys, string | null>>;
