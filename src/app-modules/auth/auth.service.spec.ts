import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { AuthenticateDto } from './dtos/auth.dto';
import { UnauthorizedException } from '@nestjs/common';
  
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
  }));
  
describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(async () => {
        authService = new AuthService();
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('login', () => {
        const validDto: AuthenticateDto = { username: 'username', password: 'password' };
        const invalidDto: AuthenticateDto = { username: 'invalid', password: 'invalid' };
        const mockToken = 'mockedAccessToken';

        it('should return access token for valid credentials', async () => {
        jest.spyOn(jwt, 'sign').mockReturnValue(mockToken as any);

        const result = await authService.login(validDto);

        expect(jwt.sign).toHaveBeenCalledWith(
            { username: validDto.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        expect(result).toEqual({ accessToken: mockToken });
        });

        it('should throw UnauthorizedException for invalid credentials', async () => {
        await expect(authService.login(invalidDto)).rejects.toThrow(UnauthorizedException);
        expect(jwt.sign).not.toHaveBeenCalled();
        });
    });
});
