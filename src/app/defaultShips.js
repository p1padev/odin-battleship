import ShipFactory from '../factories/ship/ShipFactory';

const defaultShips = () => [
  ShipFactory(5),
  ShipFactory(4),
  ShipFactory(3),
  ShipFactory(2),
];

export default defaultShips;
