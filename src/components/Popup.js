const Popup = (name, length) => {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const wrapper = document.createElement('div');
  wrapper.classList.add('popup-wrapper');
  wrapper.insertAdjacentHTML(
    'afterbegin',
    `<h2 class="popup-player-name">${name}</h2>
    <p>Inserting ship of length: <span class="strong">${length}</span></p>
    `
  );
  popup.appendChild(wrapper);

  return popup;
};

export default Popup;
