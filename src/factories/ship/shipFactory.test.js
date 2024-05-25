import { describe, expect, it } from '@jest/globals';
import ShipFactory from './ShipFactory';

describe('a Ship factory', () => {
  it('should be defined', () => {
    expect(ShipFactory(3)).toBeDefined();
  });
  describe('with a length property that', () => {
    it('should equal to the argument passed during initialization', () => {
      const mockShip = ShipFactory(3);
      const mockShip2 = ShipFactory(2);
      // eslint-disable-next-line jest/prefer-to-have-length
      expect(mockShip.length).toBe(3);
      // eslint-disable-next-line jest/prefer-to-have-length
      expect(mockShip2.length).toBe(2);
    });

    it('should throw an error if argument is different from a number', () => {
      expect(() => ShipFactory('string')).toThrow(
        new Error('Error: Argument provided was not a number')
      );
      expect(() => ShipFactory({})).toThrow(
        new Error('Error: Argument provided was not a number')
      );
    });
  });

  it("should have a isSunk boolean property that equals to true after ship getting hitted more times than it's length", () => {
    const mockShip = ShipFactory(3);
    mockShip.hit();
    mockShip.hit();
    expect(mockShip.isSunk()).toBeFalsy();
    mockShip.hit();
    expect(mockShip.isSunk()).toBe(true);
    mockShip.hit();
    mockShip.hit();
    expect(mockShip.isSunk()).toBe(true);
  });
});
