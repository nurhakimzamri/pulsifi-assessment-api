import { BaseResponse } from './interfaces/base-response.interface';

export class BaseController {
  public succeed(responseBody: BaseResponse = {}): BaseResponse {
    const {
      status = 200,
      message = 'Successful',
      data = null,
      total = null,
    } = responseBody;
    const response: BaseResponse = {
      status,
      message,
      data: data ?? null,
    };
    if (total) response.total = total;
    return response;
  }
}
