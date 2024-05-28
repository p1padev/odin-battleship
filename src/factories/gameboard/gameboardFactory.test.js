import { beforeEach, describe, expect, it } from '@jest/globals';
import ShipFactory from '../ship/ShipFactory';
import GameboardFactory from './GameboardFactory';

describe('gameboard Factory', () => {
  describe('it creates a board that has an insertShip method', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
      gameboard = GameboardFactory();
      ship = ShipFactory(3);
    });

    it("should throw an error if provided obj doesn't includes coordinates, a ship object and isVertical", () => {
      expect.assertions(3);

      const possibleMissingElements = [
        { coordinates: [1, 2], ship },
        { ship, isVertical: true },
        { coordinates: [1, 2], isVertical: false },
      ];

      possibleMissingElements.forEach((errorCase) => {
        expect(() => gameboard.insertShip(errorCase)).toThrow(
          'Missing required arguments'
        );
      });
    });

    it('should place ships horizontally', () => {
      const mockInsertObj = {
        coordinates: [1, 2],
        ship,
        isVertical: false,
      };

      gameboard.insertShip(mockInsertObj);

      expect(gameboard.getBoard()[1][2]).toStrictEqual(ship);
      expect(gameboard.getBoard()[1][3]).toStrictEqual(ship);
      expect(gameboard.getBoard()[1][4]).toStrictEqual(ship);
    });

    it('should place ships vertically', () => {
      const mockInsertObj = {
        coordinates: [1, 2],
        ship,
        isVertical: true,
      };

      gameboard.insertShip(mockInsertObj);

      expect(gameboard.getBoard()[1][2]).toStrictEqual(ship);
      expect(gameboard.getBoard()[2][2]).toStrictEqual(ship);
      expect(gameboard.getBoard()[3][2]).toStrictEqual(ship);
    });

    it('should throw an error if coordinates are out of the board', () => {
      expect.assertions(2);

      const outOfBoundsObjs = [
        { coordinates: [-1, -1], ship, isVertical: true },
        { coordinates: [10, 10], ship, isVertical: true },
      ];

      outOfBoundsObjs.forEach((mockInsertObj) => {
        expect(() => gameboard.insertShip(mockInsertObj)).toThrow(
          new Error('Invalid coordinates')
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

  describe('it creates a board that has a receiveAttack method', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
      gameboard = GameboardFactory();
      ship = ShipFactory(3);
      gameboard.insertShip({ coordinates: [1, 2], ship, isVertical: false });
    });

    it('should throw an error if no pair of coord. is provided or if pair is out of boundaries', () => {
      expect(() => gameboard.receiveAttack()).toThrow('Invalid coordinates');
      expect(() => gameboard.receiveAttack({ coordinates: [-1, -1] })).toThrow(
        'Invalid coordinates'
      );
    });
    it("should take a pair of coordinates and hit a ship if it's placed there", () => {
      const before = ship.getNumberOfHits();
      gameboard.receiveAttack({ coordinates: [1, 2] });

      expect(ship.getNumberOfHits()).toBe(before + 1);
    });
    it('an attack in one ship at [x,y] coord should reflect for all positions of the same ship', () => {
      gameboard.receiveAttack({ coordinates: [1, 2] });

      expect(gameboard.getBoard()[1][3].getNumberOfHits()).toBe(1);
    });
    it('should take a pair of coordinates and record the missed shot', () => {
      gameboard.receiveAttack({ coordinates: [6, 6] });
      gameboard.receiveAttack({ coordinates: [8, 8] });

      expect(gameboard.getMissedShots()).toContainEqual([6, 6]);
      expect(gameboard.getMissedShots()).toContainEqual([8, 8]);
    });
  });
  describe('that has a areAllShipsSunk method', () => {
    let gameboard;
    let shipOne;
    let shipTwo;
    let shipThree;

    beforeEach(() => {
      gameboard = GameboardFactory();
      shipOne = ShipFactory(1);
      shipTwo = ShipFactory(1);
      shipThree = ShipFactory(1);
      gameboard.insertShip({
        coordinates: [1, 2],
        ship: shipOne,
        isVertical: false,
      });
      gameboard.insertShip({
        coordinates: [4, 5],
        ship: shipTwo,
        isVertical: false,
      });
      gameboard.insertShip({
        coordinates: [7, 7],
        ship: shipThree,
        isVertical: false,
      });
    });

    it('should return true if all of the ships are sunk', () => {
      shipOne.hit();
      shipTwo.hit();
      expect(gameboard.areAllShipsSunk()).toBe(false);
      shipThree.hit();
      expect(gameboard.areAllShipsSunk()).toBe(true);
    });
    it('should return false if all of the ships are NOT sunk', () => {
      expect(gameboard.areAllShipsSunk()).toBe(false);
    });
    it('should return false if no ships', () => {
      expect(GameboardFactory().areAllShipsSunk()).toBe(false);
    });
  });
});
