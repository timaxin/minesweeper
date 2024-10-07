import { Cell, Field } from '../types';

export const findCell = (x: number, y: number, field: Field): Cell | null => {
  if (x < 0 || x >= field[0].length) return null;
  if (y < 0 || y >= field.length) return null;

  return field[y][x];
};

export const FieldSizeInit = { width: 10, height: 10 };

// The coordinate offsets of all cells around the cell [y, x].
export const mapPosNearbyCells = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

export const makeField = (width: number, height: number) => {
  const field = Array(height).fill([]).map((_, rowI) => {
    const row: Cell[] = Array(width).fill({}).map((_, cellI) => {
      const randNum = Math.floor(Math.random() * 1000);

      return ({
        x: cellI,
        y: rowI,
        withBomb: randNum < 400 && randNum > 200,
        open: false,
        bombsNearby: 0,
        flag: false,
      });
    });

    return row;
  });

  field.forEach((row) => {
    row.forEach((cell) => {
      const { x, y } = cell;
      let countBombs = 0;

      mapPosNearbyCells.forEach(([yOffset, xOffset]) => {
        const cell = findCell(x + xOffset, y + yOffset, field);
        if (cell) countBombs += cell.withBomb ? 1 : 0;
      });

      cell.bombsNearby = countBombs;
    });
  });

  return field;
};

export const openNearbyEmptyCell = (startCell: Cell, field: Field) => {
  const { x, y } = startCell;

  mapPosNearbyCells.forEach(([yOffset, xOffset]) => {
    const nearbyCell = findCell(x + xOffset, y + yOffset, field);

    if (!nearbyCell || nearbyCell.open || nearbyCell.withBomb) return;
    if (nearbyCell.bombsNearby > 0) {
      nearbyCell.open = true;
      return;
    }

    nearbyCell.open = true;
    openNearbyEmptyCell(nearbyCell, field);
  });
};
