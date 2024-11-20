/* eslint-disable prettier/prettier */
// src/middleware/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token=req.cookies?.auth_token;
    if(!token){
        return res.status(500).json({
            success:false,
            message:"token is missing"
        });
    }
    next();
  }
}
