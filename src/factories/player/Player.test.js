import { describe, expect, it } from '@jest/globals';
import GameboardFactory from '../gameboard/GameboardFactory';
import ShipFactory from '../ship/ShipFactory';
import PlayerFactory from './Player';

describe('a Player factory', () => {
  it('can create a "real" player', () => {
    const joe = PlayerFactory({ playerName: 'Joe' });
    expect(joe.getName()).toBe('Joe');
  });
  it('can create a "computer" player', () => {
    const pc = PlayerFactory({ isComputer: true });
    expect(pc.getName()).toBe('Computer');
  });
  it('each player should contain its own gameboard', () => {
    const emptyExpectedBoard = GameboardFactory();
    const insertExpectedBoard = GameboardFactory();
    const playerWithInsertion = PlayerFactory();
    const fakeInsert = {
      coordinates: [1, 2],
      ship: ShipFactory(2),
      isVertical: false,
    };

    insertExpectedBoard.insertShip(fakeInsert);
    playerWithInsertion.getBoard().insertShip(fakeInsert);

    expect(PlayerFactory().getBoard().board).toStrictEqual(
      emptyExpectedBoard.board
    );
    expect(playerWithInsertion.getBoard().board).toStrictEqual(
      insertExpectedBoard.board
    );
  });
});
