import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/base.controller';
import { BaseResponse } from 'src/common/interfaces/base-response.interface';
import { AuthenticateDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('login')
  @ApiOperation({
    summary: 'login',
  })
  async authenticate(
    @Body() authenticateDto: AuthenticateDto,
  ): Promise<BaseResponse> {
    const authResponse = await this.authService.login(authenticateDto);
    return this.succeed({ data: authResponse });
  }
}
