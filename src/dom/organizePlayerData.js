const organizePlayerData = (player) => {
  const playerName = player.getName();
  const DOMReference = player.getBoardRef();
  const isFacingComputer = player.isFacingComputer();
  const isComputer = player.isComputer();
  const boardController = player.getController();
  return {
    playerName,
    DOMReference,
    isFacingComputer,
    isComputer,
    boardController,
  };
};

export default organizePlayerData;
