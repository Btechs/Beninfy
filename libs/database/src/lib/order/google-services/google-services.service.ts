import { Client } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ForbiddenError } from 'apollo-server-fastify';
import { Point } from '../../interfaces/point';
import { SharedConfigurationService } from '../../shared-configuration.service';

@Injectable()
export class GoogleServicesService {
    client = new Client({});
    constructor(
        private configurationService: SharedConfigurationService
    ) {}

    async getSumDistanceAndDuration(points: Point[]): Promise<{distance: number, duration: number}> {
        let distance = 0;
        let duration = 0;
        const config = await this.configurationService.getConfiguration();
        for(let i = 0; i < points.length - 1; i++) {
            const matrixResponse = await this.client.distancematrix({
                params: {
                    origins: [points[i]],
                    destinations: [points[i + 1]],
                    key: config!.backendMapsAPIKey!
                }
            });
            if (matrixResponse.statusText !== "OK") {
                throw new ForbiddenError('NO_ROUTE_FOUND');
            }
            distance += matrixResponse.data.rows[0].elements.filter(element => element.status == 'OK').reduce((a, b) => { return a + b.distance.value }, 0);
            duration += matrixResponse.data.rows[0].elements.filter(element => element.status == 'OK').reduce((a, b) => { return a + b.duration.value }, 0);
        }
        return { distance, duration };
    }
}