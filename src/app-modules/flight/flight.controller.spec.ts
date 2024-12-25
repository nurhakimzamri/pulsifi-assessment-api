import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetRoundtripFlightsDto } from './dtos/flight.dto';

describe('FlightController', () => {
    let controller: FlightController;

    const dummyGetRoundtripFlight = {
        "id": "location-27543923",
        "type": "LOCATION",
        "content": {
          "location": {
            "id": "27543923",
            "skyCode": "KULM",
            "name": "Kuala Lumpur",
            "type": "City"
          },
          "flightQuotes": {
            "cheapest": {
              "price": "$23",
              "rawPrice": 23,
              "direct": true
            },
            "direct": {
              "price": "$23",
              "rawPrice": 23,
              "direct": true
            }
          },
          "image": {
            "url": "https://content.skyscnr.com/dc3bc489366201fb1350f7537bf039cd/stock-photo-sunrise-view-in-kuala-lumpur-city-centre-102472231.jpg"
          },
          "flightRoutes": {
            "directFlightsAvailable": true
          }
        },
        "entityId": "eyJlIjoiMjc1NDM5MjMiLCJzIjoiS1VMTSIsInQiOiJDaXR5In0=",
        "skyId": "KULM"
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [FlightController],
        providers: [
            {
            provide: FlightService,
            useFactory: jest.fn(() => ({
                getRoundtripFlights: jest.fn().mockResolvedValue([dummyGetRoundtripFlight]),
            }))
            }
        ],
        }).overrideGuard(AuthGuard).useValue({ canActivate: jest.fn().mockResolvedValue(true) })
        .compile();

        controller = module.get<FlightController>(FlightController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('GET getRoundtripFlights', () => {
        const getRoundtripFlightsDto: GetRoundtripFlightsDto = {
            fromEntityId: 'MY'
        }
        it('should retrieve roundtrip flights successfully', async () => {
        const mockResponse = {
            status: 200,
            message: 'Successful',
            data: [dummyGetRoundtripFlight],
            total: [dummyGetRoundtripFlight].length
        };
        expect(await controller.getRoundtripFlights(getRoundtripFlightsDto)).toEqual(mockResponse);
        });
    });
});
