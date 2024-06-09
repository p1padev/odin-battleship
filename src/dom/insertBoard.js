import { clearChildren } from '../helper';

const insertBoard = ({ DOMReference, board, playerName }) => {
  clearChildren(DOMReference);
  const name = document.createElement('h2');
  name.textContent = playerName;
  DOMReference.appendChild(name);
  DOMReference.appendChild(board);
};

export default insertBoard;
