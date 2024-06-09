import pipeline from '../../helper';

const GameboardFactory = () => {
  const board = Array.from({ length: 10 }, () => Array(10).fill(null));
  const successfulShotsCoords = [];
  const missedShotsCoords = [];
  const placedShipsCoords = [];

  const getSuccessfulShots = () => successfulShotsCoords;
  const getMissedShots = () => missedShotsCoords;
  const getPlacedShips = () => placedShipsCoords;
  const getBoard = () => board;
  const areAllShipsSunk = () =>
    placedShipsCoords.length > 0 &&
    placedShipsCoords.every(([coordX, coordY]) =>
      board[coordX][coordY].isSunk()
    );
  const isValidCoordinate = (coord) => coord >= 0 && coord <= 9;

  const checkBoundaries = ({
    coordinates: [coordX, coordY] = [],
    ...rest
  } = {}) => {
    if (isValidCoordinate(coordX) && isValidCoordinate(coordY)) {
      return { coordX, coordY, ...rest };
    }
    throw new Error('Invalid coordinates');
  };

  const makeAttack = ({ coordX, coordY }) => {
    const ship = board[coordX][coordY];
    if (ship !== null) {
      ship.hit();
      successfulShotsCoords.push([coordX, coordY]);
      return true;
    }

    missedShotsCoords.push([coordX, coordY]);
    return false;
  };

  const validateInput = (input) => {
    const requiredKeys = ['coordinates', 'ship', 'isVertical'];
    const existingKeys = Object.keys(input);

    requiredKeys.forEach((key) => {
      if (!existingKeys.includes(key)) {
        throw new Error('Missing required arguments');
      }
    });

    return input;
  };

  const organizeIndices = ({ coordX, coordY, isVertical, ship, ...rest }) => {
    const indicesForInsertion = [];

    for (let i = 0; i < ship.length; i += 1) {
      if (isVertical) {
        indicesForInsertion.push([coordX + i, coordY]);
      } else {
        indicesForInsertion.push([coordX, coordY + i]);
      }
    }

    return { indicesForInsertion, ship, ...rest };
  };

  const checkOverlapping = ({ indicesForInsertion, ...rest }) => {
    const isOverlapping = indicesForInsertion.some(
      ([boardXCoord, boardYCoord]) => board[boardXCoord][boardYCoord] !== null
    );

    if (isOverlapping) {
      throw new Error("This will overlap a ship that's already in the board");
    }

    return { indicesForInsertion, ...rest };
  };

  const placeShip = ({ indicesForInsertion, ship }) => {
    indicesForInsertion.forEach(([coordX, coordY]) => {
      board[coordX][coordY] = ship;
      placedShipsCoords.push([coordX, coordY]);
    });
  };

  const insertShip = pipeline(
    validateInput,
    checkBoundaries,
    organizeIndices,
    checkOverlapping,
    placeShip
  );

  const receiveAttack = pipeline(checkBoundaries, makeAttack);

  return {
    areAllShipsSunk,
    getBoard,
    getMissedShots,
    getPlacedShips,
    getSuccessfulShots,
    insertShip,
    receiveAttack,
  };
};

export default GameboardFactory;
