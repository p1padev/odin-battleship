import pipeline from '../../helper';

const GameboardFactory = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));

  const checkBoundariesFn = ({
    coordinates: [coordXAxis, coordYAxis],
    ...args
  }) => {
    if (
      coordXAxis >= 0 &&
      coordXAxis <= 9 &&
      coordYAxis >= 0 &&
      coordYAxis <= 9
    ) {
      return { coordXAxis, coordYAxis, ...args };
    }
    throw new Error('Out of boundaries');
  };

  const organizeIndicesFn = ({
    coordXAxis,
    coordYAxis,
    isVertical,
    ship,
    ...args
  }) => {
    const indicesForInsertion = [];

    for (let i = 0; i < ship.length; i += 1) {
      if (isVertical) {
        indicesForInsertion.push([coordXAxis + i, coordYAxis]);
      } else {
        indicesForInsertion.push([coordXAxis, coordYAxis + i]);
      }
    }

    return { indicesForInsertion, ship, ...args };
  };

  const checkOverlappingFn = ({ indicesForInsertion, ...args }) => {
    const isOverlapping = indicesForInsertion.some(
      ([boardXCoord, boardYCoord]) => board[boardXCoord][boardYCoord] !== null
    );

    if (isOverlapping) {
      throw new Error("This will overlap a ship that's already in the board");
    }

    return { indicesForInsertion, ...args };
  };

  const insertShipFn = ({ indicesForInsertion, ship }) => {
    indicesForInsertion.forEach(([boardXAxis, boardYAxis]) => {
      board[boardXAxis][boardYAxis] = ship;
    });
  };

  const insertShip = pipeline(
    checkBoundariesFn,
    organizeIndicesFn,
    checkOverlappingFn,
    insertShipFn
  );

  return {
    board,
    insertShip,
  };
};

export default GameboardFactory;
