import { ExecutionContext, UnauthorizedException, HttpException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { verify } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let reflector: Reflector;

    beforeEach(async () => {
        reflector = new Reflector();
        guard = new AuthGuard(reflector);

        // Set default mock return value for reflector
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    describe('canActivate', () => {
        let context: ExecutionContext;
        let request: any;

        beforeEach(() => {
            request = {
                headers: {
                    authorization: 'Bearer testToken',
                },
            };

            context = {
                switchToHttp: jest.fn().mockReturnValue({
                    getRequest: jest.fn().mockReturnValue(request),
                }),
            } as any as ExecutionContext;
        });

        it('should throw UnauthorizedException if no token is found', async () => {
            request.headers.authorization = undefined;

            await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
        });

        it('should verify the token and return true if valid', async () => {
            (verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, { userid: 'testUserId' });
            });

            await expect(guard.canActivate(context)).resolves.toBe(true);
        });

        it('should throw HttpException if token is expired', async () => {
            (verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback({ message: 'jwt expired' }, null);
            });

            await expect(guard.canActivate(context)).rejects.toThrow(HttpException);
        });

        it('should throw HttpException for other token errors', async () => {
            (verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback({ message: 'invalid token' }, null);
            });

            await expect(guard.canActivate(context)).rejects.toThrow(HttpException);
        });
    });
});