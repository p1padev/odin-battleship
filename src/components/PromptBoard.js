import createPromptBoard from '../dom/createPromptBoard';
import Popup from './Popup';

const PromptBoard = (player, ship) =>
  new Promise((resolve) => {
    const boardController = player.getController();
    const playerName = player.getName();
    const shipLength = ship.length;
    const popup = Popup();
    popup.querySelector('.popup-wrapper').insertAdjacentHTML(
      'afterbegin',
      `<h2 class="popup-player-name">${playerName}</h2>
      <p>Inserting ship of length: <span class="strong">${shipLength}</span></p>
      `
    );
    const board = createPromptBoard(
      { popup, resolve },
      boardController,
      shipLength
    );

    popup.querySelector('.popup-wrapper').appendChild(board);
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.classList.add('open');
    }, 50);
  });

export default PromptBoard;
