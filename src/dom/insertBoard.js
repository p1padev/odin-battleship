import { clearChildren } from '../helper';

const insertBoard = ({ DOMReference, board }) => {
  clearChildren(DOMReference);
  DOMReference.appendChild(board);
};

export default insertBoard;
