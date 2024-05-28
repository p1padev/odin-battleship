import boardComponent from '../components/boardComponent';

const insertPlayerBoard = (DOMElement, playerBoard) => {
  DOMElement.appendChild(boardComponent(playerBoard));
};

export default insertPlayerBoard;
