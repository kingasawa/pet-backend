import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class MapService {
  private axiosInstance: AxiosInstance;

  constructor() {}

  async searchPlace(q: string, userLocation: string, token: string) {
    console.log('tokentokentokentokentoken', token);
    const axiosInstance: any = axios.create({
      headers: { Authorization: `Bearer ${token}` },
    });
    const response: any =
      await axiosInstance
        .post(`https://maps-api.apple.com/v1/search?q=${q}&userLocation=${userLocation}&lang=vi-vn`);
    console.log('response.data', response.data);
    return response.data;
  }
}
