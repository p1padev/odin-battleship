import playerForm from './playerForm';

const InitialForm = () => {
  const startButton = document.createElement('button');
  startButton.id = 'game-start-btn';
  startButton.textContent = 'Start';

  const playerOneForm = playerForm(1);
  const playerTwoForm = playerForm(2);

  return [startButton, playerOneForm, playerTwoForm];
};

export default InitialForm;
