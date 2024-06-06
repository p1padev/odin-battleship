import handleInitialForm from '../dom/handleInitialForm';
import playerForm from './playerForm';

const InitialForm = (enterSetupModeFn) => {
  const startButton = document.createElement('button');
  startButton.id = 'game-start-btn';
  startButton.textContent = 'Start';
  startButton.addEventListener('click', (event) => {
    const playersForm = handleInitialForm(event);
    if (playersForm) {
      enterSetupModeFn({ event, playersForm });
    }
  });

  const playerOneForm = playerForm(1);
  const playerTwoForm = playerForm(2);

  return [startButton, playerOneForm, playerTwoForm];
};

export default InitialForm;
