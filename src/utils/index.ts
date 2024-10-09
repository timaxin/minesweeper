import { Cell, Field } from '../types';

export const findCell = (x: number, y: number, field: Field): Cell | null => {
  if (x < 0 || x >= field[0].length) return null;
  if (y < 0 || y >= field.length) return null;

  return field[y][x];
};

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

function adjustBombsCount({ field, bombsCount, bombsPutCount, width, height }: {
  field: Field,
  bombsCount: number,
  bombsPutCount: number,
  width: number,
  height: number
}) {
  while (bombsPutCount !== bombsCount) {
    const randomWidth = Math.floor(Math.random() * (width - 1));
    const randomHeight = Math.floor(Math.random() * (height - 1));
    let shouldBreak = false;
    for (let y = randomHeight; y < height; y++) {
      for (let x = randomWidth; x < width; x++) {
        if (bombsPutCount < bombsCount && !field[y][x].withBomb) {
          field[y][x].withBomb = true;
          bombsPutCount++;
          shouldBreak = true;
          break;
        } else if (bombsPutCount > bombsCount && field[y][x].withBomb) {
          field[y][x].withBomb = false;
          bombsPutCount--;
          shouldBreak = true;
          break;
        }
      }
      if (shouldBreak) {
        break;
      }
    }
  }
}

export const makeField = (width: number, height: number, bombsCount: number) => {
  let bombsPutCount = 0;
  const percentOfCellsWithBomb = (bombsCount / (width * height)) * 100;

  const field = Array(height).fill([]).map((_, rowI) => {
    const row: Cell[] = Array(width).fill({}).map((_, cellI) => {
      const randNum = Math.floor(Math.random() * 100);

      const withBomb = randNum < percentOfCellsWithBomb;
      if (withBomb) {
        bombsPutCount++;
      }
      return ({
        x: cellI,
        y: rowI,
        withBomb,
        open: false,
        bombsNearby: 0,
        flag: false,
      });
    });

    return row;
  });

  if (bombsPutCount !== bombsCount) {
    adjustBombsCount({ field, bombsCount, bombsPutCount, width, height });
  }

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
