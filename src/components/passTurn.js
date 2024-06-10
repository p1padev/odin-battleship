import Popup from './Popup';

const passTurn = (playerWasAttacking, playerAwaitingToAttack) =>
  new Promise((resolve) => {
    const popup = Popup();
    popup.classList.add('dark');
    popup.classList.add('popup-pass-turn');
    const wrapper = popup.querySelector('.popup-wrapper');
    const playerAttackingName = playerWasAttacking.getName();
    const playerAwaitingName = playerAwaitingToAttack.getName();

    wrapper.insertAdjacentHTML(
      'beforeend',
      `
      <h2 class="player-name">${playerAttackingName} has played.</h2>
      <p class="cta-text">Click to pass the turn to ${playerAwaitingName}</p>
    `
    );

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Pass turn';
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

export default passTurn;
