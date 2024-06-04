const organizePlayerData = (player) => {
  const DOMReference = player.getBoardRef();
  const isFacingComputer = player.isFacingComputer();
  const boardController = player.getController();
  return { DOMReference, isFacingComputer, boardController };
};

export default organizePlayerData;
