import pipeline from '../../helper';

const GameboardFactory = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));
  const missedShotsCoords = [];
  const placedShipsCoords = [];

  const getMissedShots = () => missedShotsCoords;

  const areAllShipsSunk = () =>
    placedShipsCoords.length > 0 &&
    placedShipsCoords.every(([shipXCoord, shipYCoord]) =>
      board[shipXCoord][shipYCoord].isSunk()
    );

  const isValidCoordinate = (coord) => coord >= 0 && coord <= 9;

  const checkBoundariesFn = ({
    coordinates: [coordXAxis, coordYAxis],
    ...args
  }) => {
    if (isValidCoordinate(coordXAxis) && isValidCoordinate(coordYAxis)) {
      return { coordXAxis, coordYAxis, ...args };
    }
    throw new Error('Invalid coordinates');
  };

  const receiveAttack = (coordinates = []) => {
    checkBoundariesFn({ coordinates });

    const [xAxisCoord, yAxisCoord] = coordinates;
    const ship = board[xAxisCoord][yAxisCoord];
    if (ship !== null) {
      ship.hit();
      return ship;
    }

    missedShotsCoords.push(coordinates);
    return missedShotsCoords;
  };

  const checkProvidedObjFn = (initialObj) => {
    const requiredKeys = ['coordinates', 'ship', 'isVertical'];
    const existingKeys = Object.keys(initialObj);

    requiredKeys.forEach((key) => {
      if (!existingKeys.includes(key)) {
        throw new Error('Missing required arguments');
      }
    });

    return initialObj;
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
    indicesForInsertion.forEach(([shipXAxis, shipYAxis]) => {
      board[shipXAxis][shipYAxis] = ship;
      placedShipsCoords.push([shipXAxis, shipYAxis]);
    });
  };

  const insertShip = pipeline(
    checkProvidedObjFn,
    checkBoundariesFn,
    organizeIndicesFn,
    checkOverlappingFn,
    insertShipFn
  );

  return {
    areAllShipsSunk,
    board,
    getMissedShots,
    insertShip,
    receiveAttack,
  };
};

export default GameboardFactory;
