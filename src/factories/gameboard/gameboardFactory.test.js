import { describe, expect, it } from '@jest/globals';
import ShipFactory from '../ship/ShipFactory';
import GameboardFactory from './GameboardFactory';

describe('a Gameboard factory', () => {
  it('is defined', () => expect(GameboardFactory).toBeDefined());

  describe('that has a method to place ships (getting a ship as an argument) in the board', () => {
    it('should place ships at specific coordinates horizontally', () => {
      const gameboard = GameboardFactory();
      const ship = ShipFactory(3);

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
    it('should place ships at specific coordinates vertically', () => {
      const gameboard = GameboardFactory();
      const ship = ShipFactory(3);

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

    it('should throw error if coordinates are out of the board', () => {
      const gameboard = GameboardFactory();
      const ship = ShipFactory(3);
      const mockInsertObjOne = {
        coordinates: [-1, -1],
        ship,
        isVertical: true,
      };
      const mockInsertObjTwo = {
        coordinates: [10, 10],
        ship,
        isVertical: true,
      };

      expect(() => gameboard.insertShip(mockInsertObjOne)).toThrow(
        new Error('Out of boundaries')
      );
      expect(() => gameboard.insertShip(mockInsertObjTwo)).toThrow(
        new Error('Out of boundaries')
      );
    });
    it('should throw error if coordinates overlap a ship already placed', () => {
      const gameboard = GameboardFactory();
      const ship = ShipFactory(3);
      const mockInsertObj = {
        coordinates: [1, 2],
        ship,
        isVertical: true,
      };
      const mockInsertObjTwo = {
        coordinates: [3, 4],
        ship,
        isVertical: false,
      };

      gameboard.insertShip(mockInsertObj);
      gameboard.insertShip(mockInsertObjTwo);

      const overlapShip = ShipFactory(2);
      const overlapInsertObj = {
        coordinates: [1, 2],
        ship: overlapShip,
        isVertical: true,
      };
      const overlapInsertObjTwo = {
        coordinates: [3, 4],
        ship: overlapShip,
        isVertical: false,
      };

      expect(() => gameboard.insertShip(overlapInsertObj)).toThrow(
        "This will overlap a ship that's already in the board"
      );
      expect(() => gameboard.insertShip(overlapInsertObjTwo)).toThrow(
        "This will overlap a ship that's already in the board"
      );
    });
  });
});

/*

Create a Gameboard class/factory.
Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
Gameboards should keep track of missed attacks so they can display them properly.
Gameboards should be able to report whether or not all of their ships have been sunk.
*/
