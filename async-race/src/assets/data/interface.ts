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

interface QueryParamsWinners {
  page?: number;
  limit?: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
}

interface WinnersResponse {
  data: WinnersInterface[];
  totalCount: number;
}

export { CarsInterface, EngineInterface, WinnersInterface, QueryParamsWinners, WinnersResponse };
