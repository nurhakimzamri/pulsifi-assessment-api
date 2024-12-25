import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class GetRoundtripFlightsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fromEntityId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toEntityId?: string;

  @ApiPropertyOptional({
    description: 'Departure date in YYYY-MM-DD format',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'departDate must be in the format YYYY-MM-DD',
  })
  departDate?: string;

  @ApiPropertyOptional({
    description: 'Return date in YYYY-MM-DD format',
    example: '2025-01-07',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'returnDate must be in the format YYYY-MM-DD',
  })
  returnDate?: string;
}
