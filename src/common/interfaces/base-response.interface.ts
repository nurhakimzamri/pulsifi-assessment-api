import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Interface representing a base response.
 * @property {number} status - The HTTP status code of the base response. Example: 200
 * @property {string} message - A message describing the base response. Example: "ok"
 * @property {unknown | null} [data] - Optional data associated with the response.
 * @property {number} [total] - Optional total count of items (e.g., used for pagination).
 */
export interface IBaseResponse {
  status?: number;
  message?: string;
  data?: unknown | null;
  total?: number;
}

/**
 * Class representing a successful response.
 * @property {number} status - The HTTP status code of the base response. Example: 200
 * @property {string} message - A message describing the base response. Example: "ok"
 * @property {unknown | null} [data] - Optional data associated with the response.
 * @property {number} [total] - Optional total count of items (e.g., used for pagination).
 */
export class BaseResponse implements IBaseResponse {
  @ApiProperty({ description: 'status of the response' })
  status?: number;

  @ApiProperty({ description: 'message of the response' })
  message?: string;

  @ApiPropertyOptional({ description: 'data of the response' })
  data?: unknown | null;

  @ApiPropertyOptional({ description: 'total data of the response' })
  total?: number;
}
