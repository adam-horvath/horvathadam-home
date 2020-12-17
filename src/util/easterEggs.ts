import moment, { Moment } from 'moment';

import { WeatherModel, WeatherType } from 'models/Weather.model';
import { getEnumKeyByEnumValue } from './enums';
import { formatDate } from './date';

export const getEasterEggs = (hovered: boolean, weather: WeatherModel) => {
  if (!hovered) return {};
  const weatherType = getEnumKeyByEnumValue(WeatherType, weather.weather[0].main);
  const sunrise = moment(new Date(weather.sys.sunrise));
  const sunset = moment(new Date(weather.sys.sunset));
  if ([WeatherType.Snow, WeatherType.Rain, WeatherType.Clouds].includes(weatherType)) {
    return {
      snow: weatherType === WeatherType.Snow,
      rain: weatherType === WeatherType.Rain,
      clouds: weatherType === WeatherType.Clouds,
    };
  }
  return {
    sunset: isSunSet(sunset),
    night: !isSunSet(sunset) && !isDaylight(sunrise, sunset),
    sunshine: isDaylight(sunrise, sunset),
  };
};

const isSunSet = (sunset: Moment) =>
  sunset.subtract(30, 'minute').isBefore(moment()) && sunset.add(30, 'minute').isAfter(moment());

const isDaylight = (sunrise: Moment, sunset: Moment) =>
  sunrise.isBefore(moment()) && sunset.subtract(30, 'minute').isAfter(moment());

export const getEasterEggsByDate = () => {
  switch (formatDate(new Date()).substring(5, 10)) {
    case '10-31':
      return { spider: true };
    case '04-01':
      return { fool: true };
    default:
      return {};
  }
};
