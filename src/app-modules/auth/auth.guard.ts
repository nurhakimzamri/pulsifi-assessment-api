import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    await this.verifyAuth(token, request);
    return true;
  }

  /* The function is responsible for extracting the token from the authorization
    header in the HTTP request. It splits the authorization header value into two parts: the type (e.g.,
    'Bearer') and the token itself. If the type is 'Bearer', it returns the token; otherwise, it returns
    `undefined`. */
  private async extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyAuth(token: string, request) {
    //verify token
    verify(token, process.env.JWT_SECRET, function (error, decoded) {
      if (!error) {
        request.username = decoded['username'];
        return true;
      } else {
        if (error.message == 'jwt expired') {
          throw new HttpException('Token Timeout', HttpStatus.UNAUTHORIZED);
        } else {
          console.log('error :>> ', error);
          throw new HttpException(
            'Token Unauthorized',
            HttpStatus.UNAUTHORIZED,
          );
        }
      }
    });
  }
}
