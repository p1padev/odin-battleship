import { beforeEach, describe, expect, it } from '@jest/globals';
import ShipFactory from '../ship/ShipFactory';
import GameboardFactory from './GameboardFactory';

describe('gameboard Factory', () => {
  it('should be defined', () => {
    expect(GameboardFactory).toBeDefined();
  });

  describe('insertShip method', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
      gameboard = GameboardFactory();
      ship = ShipFactory(3);
    });

    it('should place ships horizontally', () => {
      const mockInsertObj = {
        coordinates: [1, 2],
        ship,
        isVertical: false,
      };

      gameboard.insertShip(mockInsertObj);

      expect(gameboard.board[1][1]).toBeNull();
      expect(gameboard.board[1][2]).toStrictEqual(ship);
      expect(gameboard.board[1][3]).toStrictEqual(ship);
      expect(gameboard.board[1][4]).toStrictEqual(ship);
      expect(gameboard.board[1][5]).toBeNull();
    });

    it('should place ships vertically', () => {
      const mockInsertObj = {
        coordinates: [1, 2],
        ship,
        isVertical: true,
      };

      gameboard.insertShip(mockInsertObj);

      expect(gameboard.board[0][2]).toBeNull();
      expect(gameboard.board[1][2]).toStrictEqual(ship);
      expect(gameboard.board[2][2]).toStrictEqual(ship);
      expect(gameboard.board[3][2]).toStrictEqual(ship);
      expect(gameboard.board[4][2]).toBeNull();
    });

    it('should throw an error if coordinates are out of the board', () => {
      expect.assertions(2);

      const outOfBoundsObjs = [
        { coordinates: [-1, -1], ship, isVertical: true },
        { coordinates: [10, 10], ship, isVertical: true },
      ];

      outOfBoundsObjs.forEach((mockInsertObj) => {
        expect(() => gameboard.insertShip(mockInsertObj)).toThrow(
          new Error('Out of boundaries')
        );
      });
    });

    it('should throw an error if coordinates overlap with an existing ship', () => {
      expect.assertions(2);
      const initialObjs = [
        {
          coordinates: [1, 2],
          ship,
          isVertical: true,
        },
        {
          coordinates: [3, 4],
          ship,
          isVertical: false,
        },
      ];

      initialObjs.forEach((initialObj) => {
        gameboard.insertShip(initialObj);
      });

      const overlapShip = ShipFactory(2);
      const overlapObjs = [
        {
          coordinates: [1, 2],
          ship: overlapShip,
          isVertical: true,
        },
        {
          coordinates: [3, 6],
          ship: overlapShip,
          isVertical: false,
        },
      ];

      overlapObjs.forEach((overlapObj) => {
        expect(() => gameboard.insertShip(overlapObj)).toThrow(
          "This will overlap a ship that's already in the board"
        );
      });
    });
  });
});
