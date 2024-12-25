import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base.controller';
import { BaseResponse } from 'src/common/interfaces/base-response.interface';
import { GetRoundtripFlightsDto } from './dtos/flight.dto';
import { FlightService } from './flight.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('flights')
@ApiTags('Flights')
@ApiBearerAuth()
export class FlightController extends BaseController {
  constructor(private readonly flightService: FlightService) {
    super();
  }

  @Get('search-flight')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get roundtrip flights',
  })
  async getRoundtripFlights(
    @Query() getRoundtripFlightsDto: GetRoundtripFlightsDto,
  ): Promise<BaseResponse> {
    const flights = await this.flightService.getRoundtripFlights(
      getRoundtripFlightsDto,
    );
    return this.succeed({ data: flights, total: flights.length });
  }
}
