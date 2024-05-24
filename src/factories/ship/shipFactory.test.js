import { describe, expect, it } from '@jest/globals';
import shipFactory from './shipFactory';

describe('a Ship factory', () => {
  it('should be defined', () => {
    const mockShip = shipFactory(3);
    expect(mockShip).toBeDefined();
  });
  describe('with a length property that', () => {
    it('should have a length property equal to the argument passed during initialization', () => {
      const mockShip = shipFactory(3);
      // eslint-disable-next-line jest/prefer-to-have-length
      expect(mockShip.length).toBe(3);
    });

    it('should throw an error if argument is different from a number', () => {
      expect(() => shipFactory('string')).toThrow(
        new Error('Error: Argument provided was not a number')
      );
      expect(() => shipFactory([])).toThrow(
        new Error('Error: Argument provided was not a number')
      );
      expect(() => shipFactory({})).toThrow(
        new Error('Error: Argument provided was not a number')
      );
    });
  });

  it('should have a numberOfHits property that changes when hit method is called', () => {
    const mockShip = shipFactory(3);
    expect(mockShip.getNumberOfHits()).toBe(0);
    mockShip.hit();
    expect(mockShip.getNumberOfHits()).toBe(1);
  });

  it("should have a isSunk boolean property that equals to true after ship getting hitted more times than it's length", () => {
    const mockShip = shipFactory(3);
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
