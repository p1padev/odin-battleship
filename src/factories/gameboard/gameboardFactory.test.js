import { describe, expect, it } from '@jest/globals';
import shipFactory from '../ship/shipFactory';

describe('a Gameboard factory', () => {
  it('is defined', () => expect(gameboardFactory()).toBeDefined());

  describe('that has a method to place ships (calling the ship factory) in the board', () => {
    it('should place ships at specific coordinates horizontally', () => {
      const gameboard = gameboardFactory();
      const mockShip = shipFactory(3);

      gameboard.insertShip({
        coordinates: [1, 2],
        length: 3,
        isVertical: false,
      });

      expect(gameboard.board[1][1]).toBeNull();
      expect(gameboard.board[1][2]).toBe(mockShip);
      expect(gameboard.board[1][3]).toBe(mockShip);
      expect(gameboard.board[1][4]).toBe(mockShip);
      expect(gameboard.board[1][5]).toBeNull();
    });
    it.todo('should place ships at specific coordinates vertically', () => {
      const gameboard = gameboardFactory();

      gameboard.insertShip({
        coordinates: [1, 2],
        length: 3,
        isVertical: true,
      });
    });
    it.todo('should throw error if coordinates are out of the board', () => {});
    it.todo(
      'should throw error if coordinates overlap a ship already placed',
      () => {}
    );
  });
  it.todo('works');
});

/*

Create a Gameboard class/factory.
Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
Gameboards should keep track of missed attacks so they can display them properly.
Gameboards should be able to report whether or not all of their ships have been sunk.
*/
