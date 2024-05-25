import pipeline from '../../helper';
import ShipFactory from '../ship/ShipFactory';

const GameboardFactory = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));

  const createShipFn = ({ length, ...args }) => {
    const ship = ShipFactory(length);

    return { ship, ...args };
  };

  const insertShipFn = ({
    coordinates: [xAxis, yAxis],
    ship,
    isVertical = false,
  }) => {
    if (isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        board[xAxis + i][yAxis] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        board[xAxis][yAxis + i] = ship;
      }
    }
  };

  const insertShipPipeline = pipeline(createShipFn, insertShipFn);

  return {
    board,
    createShipFn,
    insertShipFn,
    insertShipPipeline,
  };
};

export default GameboardFactory;
