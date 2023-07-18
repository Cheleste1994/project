interface CarsInterface {
  color: string;
  id: number;
  name: string;
}

interface EngineInterface {
  velocity: number;
  distance: number;
}

interface WinnersInterface {
  id: number;
  wins: number;
  time: number;
}

export { CarsInterface, EngineInterface, WinnersInterface };
