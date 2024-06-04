const basicPlayer = (state) => ({
  getName: () => state.playerName,
  getBoard: () => state.boardController.getBoard(),
  getController: () => state.boardController,
  getBoardRef: () => state.playerBoard,
  isComputer: () => state.isComputer,
  isAttacking: () => state.isAttacking,
  isFacingComputer: () => state.isFacingComputer,
  toggleIsAttacking: () => {
    state.isAttacking = !state.isAttacking;
  },
  toggleIsFacingComputer: () => {
    state.isFacingComputer = !state.isFacingComputer;
  },
});

export default basicPlayer;
