const playerForm = (playerNumber) => {
  const playerContainer = document.createElement('div');
  playerContainer.className = `player-${playerNumber}-container player-container`;

  const playerNameHeader = document.createElement('h2');
  playerNameHeader.className = 'player-name';
  playerNameHeader.textContent = `Player ${playerNumber}:`;
  playerContainer.appendChild(playerNameHeader);

  const form = document.createElement('form');
  form.id = `player-${playerNumber}`;
  form.className = 'form-player';

  const nameDiv = document.createElement('div');
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', `player-${playerNumber}-name`);
  nameLabel.textContent = 'Name:';
  nameDiv.appendChild(nameLabel);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'player-name';
  nameInput.id = `player-${playerNumber}-name`;
  nameInput.placeholder = 'Joe';
  nameInput.required = true;
  nameInput.maxLength = 14;
  nameDiv.appendChild(nameInput);

  const computerDiv = document.createElement('div');
  const computerLabel = document.createElement('label');
  computerLabel.setAttribute('for', `computer-checkbox-${playerNumber}`);
  computerLabel.textContent = 'Computer:';
  computerDiv.appendChild(computerLabel);

  const computerCheckbox = document.createElement('input');
  computerCheckbox.type = 'checkbox';
  computerCheckbox.name = 'is-computer';
  computerCheckbox.id = `computer-checkbox-${playerNumber}`;
  computerDiv.appendChild(computerCheckbox);

  form.appendChild(nameDiv);
  form.appendChild(computerDiv);

  playerContainer.appendChild(form);

  return playerContainer;
};

export default playerForm;
