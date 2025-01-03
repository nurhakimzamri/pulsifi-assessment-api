import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { GetRoundtripFlightsDto } from './dtos/flight.dto';
import { IRoundtripFlightResponse } from './interfaces/flight.interface';

@Injectable()
export class FlightService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Retrieves a list of roundtrip flights based on the provided search criteria.
   *
   * @param getRoundtripFlightsDto - The DTO containing flight search parameters
   *
   * @returns A promise resolving to an array of roundtrip flight responses (`IRoundtripFlightResponse[]`).
   *
   * @throws {InternalServerErrorException} If there are errors returned from the RapidAPI service.
   */
  async getRoundtripFlights(
    getRoundtripFlightsDto: GetRoundtripFlightsDto,
  ): Promise<IRoundtripFlightResponse[]> {
    const { fromEntityId, toEntityId, departDate, returnDate } =
      getRoundtripFlightsDto;

    const queryParams = new URLSearchParams({
      fromEntityId: fromEntityId,
      sort: 'cheapest_first',
    });

    if (toEntityId) queryParams.append('toEntityId', toEntityId);
    if (departDate) queryParams.append('departDate', departDate);
    if (returnDate) queryParams.append('returnDate', returnDate);

    const searchRoundTripFlightsRapidUrl = `${process.env.RAPID_API_URL}/flights/search-roundtrip?${queryParams.toString()}`;

    const getFlightsResponse = await lastValueFrom(
      this.httpService
        .get<any>(searchRoundTripFlightsRapidUrl, {
          headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
          },
        })
        .pipe(map((response) => response.data)),
    );

    if (getFlightsResponse.errors)
      throw new InternalServerErrorException(getFlightsResponse.errors);

    const flights =
      getFlightsResponse?.data?.everywhereDestination?.results ||
      getFlightsResponse?.data?.countryDestination?.results ||
      [];

    return flights;
  }
}
