const basicPlayer = (state) => ({
  getName: () => state.playerName,
  getBoard: () => state.boardController.getBoard(),
  getController: () => state.boardController,
  getBoardRef: () => state.playerBoard,
  isComputer: () => state.isComputer,
  isAttacking: () => state.isAttacking,
  toggleIsAttacking: () => {
    state.isAttacking = !state.isAttacking;
  },
});

export default basicPlayer;
