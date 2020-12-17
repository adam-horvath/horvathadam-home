export interface WeatherModel {
  main: {
    temp: number;
    humidity: number;
  }
  sys: {
    sunrise: number;
    sunset: number;
  }
  weather: Array<Weather>;
  wind: {
    speed: number;
  }
}

export interface Weather {
  main: WeatherType;
}

export enum WeatherType {
  Clouds = 'Felhős',
  Rain = 'Eső',
  Snow = 'Hó',
  Clear = 'Napsütés',
}

export const WeatherPhrases = {
  Windy: 'szeles',
  Humidity: 'páratartalom',
};