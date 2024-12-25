import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dtos/auth.dto';

describe('AuthController', () => {
    let controller: AuthController;

    const dummylogin = {
        accessTokem: 'dummyAccesToken'
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
            {
            provide: AuthService,
            useFactory: jest.fn(() => ({
                login: jest.fn().mockResolvedValue(dummylogin),
            }))
            }
        ],
        })
        .compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('POST login', () => {
        const authenticateDto: AuthenticateDto = {
            username: 'username',
            password: 'password',
        }
        it('should login and receive access token successfully', async () => {
        const mockResponse = {
            status: 200,
            message: 'Successful',
            data: dummylogin,
        };
        expect(await controller.authenticate(authenticateDto)).toEqual(mockResponse);
        });
    });
});
