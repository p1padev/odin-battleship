import Popup from './Popup';

const victoryPopup = (whoWon, whoLost) =>
  new Promise((resolve) => {
    const popup = Popup();
    const wrapper = popup.querySelector('.popup-wrapper');
    const whoWonName = whoWon.getName();
    const whoLostName = whoLost.getName();

    wrapper.insertAdjacentHTML(
      'beforeend',
      `<h2 class="player-name">${whoWonName} has won ${whoLostName}.</h2>
    `
    );

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Restart game';
    closeButton.addEventListener(
      'click',
      () => {
        popup.remove();
        resolve();
      },
      { once: true }
    );

    wrapper.appendChild(closeButton);

    document.body.appendChild(popup);
    setTimeout(() => {
      popup.classList.add('open');
    }, 50);
  });

export default victoryPopup;
