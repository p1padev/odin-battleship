const Popup = () => {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const wrapper = document.createElement('div');
  wrapper.classList.add('popup-wrapper');
  popup.appendChild(wrapper);

  return popup;
};

export default Popup;
