interface CarsInterface {
  color: string;
  id: number;
  name: string;
}

interface CarsResponse {
  data: CarsInterface[];
  totalCount: number;
}

interface DataService {
  color?: string;
  id?: number;
  name?: string;
  wins?: number;
  time?: number;
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

type ElementAttributes = {
  [key: string]: string;
};

export {
  CarsInterface,
  EngineInterface,
  WinnersInterface,
  QueryParamsWinners,
  WinnersResponse,
  DataService,
  CarsResponse,
  ElementAttributes,
};
