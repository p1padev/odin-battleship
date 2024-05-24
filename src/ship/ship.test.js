import { beforeEach, describe, expect, it } from '@jest/globals';
import shipFactory from './ship';

describe('a Ship factory', () => {
  let mockShip;
  beforeEach(() => {
    mockShip = shipFactory(3);
  });
  it('should be defined', () => {
    expect.assertions(1);
    expect(mockShip).toBeDefined();
  });
  it('should have a length property equal to the argument passed during initialization', () => {
    expect.assertions(1);
    expect(mockShip).toHaveLength(3);
  });
  it('should have a numberOfHits property that changes when hit method is called', () => {
    expect.assertions(2);
    expect(mockShip.getNumberOfHits()).toBe(0);
    mockShip.hit();
    expect(mockShip.getNumberOfHits()).toBe(1);
  });
  it("should have a isSunk boolean property that equals to true after ship getting hitted more times than it's length", () => {
    expect.assertions(2);
    mockShip.hit();
    mockShip.hit();
    expect(mockShip.isSunk()).toBeFalsy();
    mockShip.hit();
    expect(mockShip.isSunk()).toBe(true);
  });
});

/*

Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
Ships should have a hit() function that increases the number of ‘hits’ in your ship.
isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

*/
