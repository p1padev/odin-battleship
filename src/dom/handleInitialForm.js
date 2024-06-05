const handleInitialForm = (e) => {
  const player1Form = document.getElementById('player-1');
  const player2Form = document.getElementById('player-2');

  if (player1Form.checkValidity() && player2Form.checkValidity()) {
    const player1Data = new FormData(player1Form);
    const player2Data = new FormData(player2Form);

    const player1 = {
      playerName: player1Data.get('player-name'),
      isComputer: player1Data.has('is-computer'),
    };
    const player2 = {
      playerName: player2Data.get('player-name'),
      isComputer: player2Data.has('is-computer'),
    };

    return { player1, player2 };
  }
  e.preventDefault();
  player1Form.reportValidity();
  player2Form.reportValidity();
  return null;
};

export default handleInitialForm;
