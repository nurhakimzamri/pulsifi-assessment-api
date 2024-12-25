import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight.service';
import { HttpService } from '@nestjs/axios';
import { Agent } from 'https';
import { of } from 'rxjs';
import { GetRoundtripFlightsDto } from './dtos/flight.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('FlightService', () => {
    let service: FlightService;
    let httpService: HttpService;

    const dummyGetRoundtripFlight = {
        data: {
            countryDestination: {
                results: [
                    {
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
                ]
            } 
        }
    }
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            FlightService,
            {
                provide: HttpService,
                useValue: {
                    get: jest.fn(),
                },
            },
        ],
        }).compile();

        service = module.get<FlightService>(FlightService);
        httpService = module.get<HttpService>(HttpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getRoundtripFlights', () => {
        it('should return roundtrip flights successfully', async () => {
            const getRoundtripFlightsDto: GetRoundtripFlightsDto = {
                fromEntityId: 'MY',
                toEntityId: 'MY',
                departDate: '2024-12-30',
                returnDate: '2024-12-31',
            };
        
            jest.spyOn(httpService, 'get').mockReturnValueOnce(
            of({
                data: dummyGetRoundtripFlight,
              }) as any,
            );
        
            const result = await service.getRoundtripFlights(
                getRoundtripFlightsDto,
            );
        
            expect(result).toEqual(dummyGetRoundtripFlight.data.countryDestination.results);
        });

        it('should return internal server error exception if errors return during API call', async () => {
            const getRoundtripFlightsDto: GetRoundtripFlightsDto = {
                fromEntityId: 'MY',
                toEntityId: 'MY',
                departDate: '2024-12-30',
                returnDate: '2024-12-31',
            };
        
            jest.spyOn(httpService, 'get').mockReturnValueOnce(
            of({
                data: {
                    errors: "any error",
                }
              }) as any,
            );
        
            await expect(service.getRoundtripFlights(getRoundtripFlightsDto)).rejects.toThrow(InternalServerErrorException);
        });
    })
});
