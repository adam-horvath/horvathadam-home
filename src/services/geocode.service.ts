import request, { Methods } from 'util/request';
import { GeocodeModel } from 'models/Geocode.model';

export class GeocodeService {
  async getLocation(lat: number, lng: number) {
    return await request<GeocodeModel>({
      method: Methods.GET,
      baseURL: 'https://horvathadam.info/api',
      resource: '/geocode',
      params: {
        lat,
        lng,
      },
    });
  }
}
