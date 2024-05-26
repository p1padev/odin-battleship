import { beforeEach, describe, expect, it } from '@jest/globals';
import ShipFactory from './ShipFactory';

describe('a Ship factory', () => {
  let mockShip;
  let mockShip2;

  beforeEach(() => {
    mockShip = ShipFactory(3);
    mockShip2 = ShipFactory(2);
  });

  describe('with a length property that', () => {
    it('should equal to the argument passed during initialization', () => {
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

  it('should have a numberOfHits property that changes when hit method is called', () => {
    expect(mockShip.getNumberOfHits()).toBe(0);
    mockShip.hit();
    expect(mockShip.getNumberOfHits()).toBe(1);
  });

  it("should have a isSunk boolean property that equals to true after ship getting hitted more times than it's length", () => {
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
