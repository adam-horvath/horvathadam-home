import request, { Methods } from 'util/request';
import { WeatherModel } from 'models/Weather.model';

export class WeatherService {
  async getWeather(location: string, lat: number, lng: number) {
    return await request<WeatherModel>({
      method: Methods.GET,
      baseURL: 'https://api.openweathermap.org',
      resource: '/data/2.5/weather',
      params: {
        q: location,
        lat,
        lng,
        units: 'metric',
        appid: '7f39747fea2414625cac6b56d16a4698'
      },
    });
  }
}
