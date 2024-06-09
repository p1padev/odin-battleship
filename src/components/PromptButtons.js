const PromptButtons = (
  { popup, resolve },
  { getIsVertical, toggleIsVertical, getSelectedCoord, reset }
) => {
  const container = document.createElement('div');
  container.classList.add('buttons-container');

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Place ship';
  submitBtn.classList.add('place-btn');
  submitBtn.disabled = true;
  submitBtn.addEventListener('click', () => {
    const coordinates = getSelectedCoord();
    const isVertical = getIsVertical();
    resolve({ coordinates, isVertical });
    popup.remove();
  });

  const toggleVerticalBtn = document.createElement('button');
  toggleVerticalBtn.classList.add('vertical-btn');
  toggleVerticalBtn.textContent = 'Toggle Vertical';
  toggleVerticalBtn.addEventListener('click', toggleIsVertical);

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.classList.add('reset-btn');
  resetBtn.disabled = true;
  resetBtn.addEventListener('click', () => {
    reset();
    resetBtn.disabled = true;
    submitBtn.disabled = true;
    toggleVerticalBtn.disabled = false;
  });

  container.append(submitBtn, toggleVerticalBtn, resetBtn);
  return container;
};

export default PromptButtons;
