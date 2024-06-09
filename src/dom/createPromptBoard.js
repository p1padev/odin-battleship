import PromptButtons from '../components/PromptButtons';
import basicBoard from '../components/basicBoard';
import { containsShip, getCoordinates, isOutOfBoundaries } from '../helper';
import createPromptBoardCell from './createPromptBoardCell';

const createPromptBoard = (popupArguments, boardController, shipLength) => {
  let isVertical = false;
  let touchedCells = [];
  let selectedCoord;
  const getIsVertical = () => isVertical;
  const getSelectedCoord = () => selectedCoord;
  const toggleIsVertical = () => {
    isVertical = !isVertical;
    return isVertical;
  };
  const container = document.createElement('div');
  container.classList.add('board');
  const board = basicBoard(boardController, createPromptBoardCell);

  const checkIfShouldDisable = () => {
    if (
      isOutOfBoundaries(touchedCells[0], shipLength, getIsVertical) ||
      touchedCells.some(containsShip)
    ) {
      touchedCells.forEach((cell) => {
        cell.disabled = true;
        cell.style.cursor = 'not-allowed';
      });
    }
  };

  const isCell = (element) => element.matches('.board-cell');

  const boardCellHover = (e) => {
    const element = e.target;
    if (isCell(element)) {
      const [x, y] = getCoordinates(element);

      for (let i = 0; i < shipLength; i += 1) {
        let coordinates = [x, y + i];
        if (getIsVertical()) {
          coordinates = [x + i, y];
        }

        const touchedShip = board.querySelector(
          `.board-cell[data-coordinates="[${coordinates}]"]`
        );

        if (touchedShip) {
          touchedShip.classList.add('touched');
          touchedCells.push(touchedShip);
        }
      }
      checkIfShouldDisable();
    }
  };

  const isShipCell = (cell) => cell.classList.contains('.player-ship');
  const resetStyles = (cell) => {
    if (!isShipCell(cell)) {
      cell.disabled = false;
    }
    cell.classList.remove('touched');
    cell.style = '';
  };

  const boardCellMouseOff = (e) => {
    const element = e.target;
    if (isCell(element)) {
      touchedCells = touchedCells.reduce((array, cell) => {
        resetStyles(cell);
        return array;
      }, []);
    }
  };

  const stopListeners = () => {
    board.removeEventListener('mouseover', boardCellHover);
    board.removeEventListener('mouseout', boardCellMouseOff);
    board.querySelectorAll('.board-cell').forEach((cell) => {
      cell.style.cursor = 'not-allowed';
    });
  };

  const boardCellClick = (e) => {
    const element = e.target;
    if (element.matches('.board-cell') && element.disabled === false) {
      selectedCoord = getCoordinates(element);
      container.querySelector('.place-btn').disabled = false;
      container.querySelector('.reset-btn').disabled = false;
      container.querySelector('.vertical-btn').disabled = true;
      stopListeners();
    }
  };

  const startListeners = () => {
    board.addEventListener('mouseover', boardCellHover);
    board.addEventListener('mouseout', boardCellMouseOff);
    board.addEventListener('click', boardCellClick, { once: true });
    board.querySelectorAll('.board-cell').forEach((cell) => {
      resetStyles(cell);
    });
  };

  const reset = () => {
    startListeners();
    isVertical = false;
    touchedCells = [];
    selectedCoord = null;
  };

  const buttons = PromptButtons(popupArguments, {
    getIsVertical,
    toggleIsVertical,
    getSelectedCoord,
    reset,
  });

  startListeners();
  container.append(board, buttons);
  return container;
};

export default createPromptBoard;
