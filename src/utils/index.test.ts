import { Cell } from '../types';
import { findCell, makeField, openNearbyEmptyCell } from './index';

import { testField as expectedTestField } from '../config/testField';

function* randomGenerator(): Generator {
  let counter = 0;
  while (true) {
    yield (counter++ % 8) / 12;
  }
}
const generator = randomGenerator();
describe('utils', () => {
  describe('findCell', () => {
    const field = Array(5).fill([]).map((_, rowI) => {
      const row: Cell[] = Array(5).fill({}).map((_, cellI) => {
        return ({
          x: cellI,
          y: rowI,
          withBomb: false,
          open: false,
          bombsNearby: 0,
          flag: false,
        });
      });

      return row;
    });

    it('finds a cell if it exists', () => {
      const cellFound = findCell(3, 1, field);
      expect(cellFound).toBe(field[1][3]);
    });

    it('returns null if x is less than 0', () => {
      const cellFound = findCell(-1, 1, field);
      expect(cellFound).toBeNull();
    });

    it('returns null if y is less than 0', () => {
      const cellFound = findCell(1, -1, field);
      expect(cellFound).toBeNull();
    });

    it('returns null if x is more than field size', () => {
      const cellFound = findCell(6, 1, field);
      expect(cellFound).toBeNull();
    });

    it('returns null if y is more than field size', () => {
      const cellFound = findCell(1, 6, field);
      expect(cellFound).toBeNull();
    });
  });

  describe('makeField', () => {
    beforeEach(() => {
      jest.spyOn(Math, 'random').mockImplementation(() => {
        return generator.next().value;
      });
    });

    afterEach(() => {
      jest.spyOn(Math, 'random').mockRestore();
    });

    it('build a field with bombs in place', () => {
      const field = makeField(5, 5);
      expect(field).toEqual(expectedTestField);
    });
  });

  describe('openNearbyEmptyCell', () => {
    const createCell = (x: number, y: number, open = false, withBomb = false, bombsNearby = 0, flag = false): Cell => ({
      x, y, open, withBomb, bombsNearby, flag,
    });
    const testField = makeField(3, 3);
    it('doesn\'t open a cell if it\'s already open', () => {
      const startCell = createCell(1, 1, true);
      openNearbyEmptyCell(startCell, testField);

      expect(startCell.open).toBe(true);
    });

    it('doesn\'t open a cell if it contains a bomb', () => {
      const startCell = createCell(1, 1, false, true);
      openNearbyEmptyCell(startCell, testField);

      expect(startCell.open).toBe(false);
    });

    it.todo('opens only a cell with bombsNearby > 0');

    it.todo('opens an empty cell and all neighbours');

    it.todo('doesn\'t try to open a cell beyond the field');
  });
});
