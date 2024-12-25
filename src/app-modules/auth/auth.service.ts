import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dtos/auth.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {}

  /**
   * Authenticates a user based on the provided credentials and returns an access token if successful.
   *
   * @param authenticateDto - The DTO containing the user's credentials, including `username` and `password`.
   *
   * @returns A promise resolving to an object containing the `accessToken` if authentication is successful.
   *
   * @throws {UnauthorizedException} If the provided credentials are invalid.
   */
  async login(
    authenticateDto: AuthenticateDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authenticateDto;
    if (username === 'username' && password === 'password') {
      const payload = { username };
      return {
        accessToken: sign(payload, process.env.JWT_SECRET, {
          expiresIn: '24h',
        }),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
