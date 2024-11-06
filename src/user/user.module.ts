// src/users/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity with TypeORM
  providers: [UserService], // Provide the UserService for dependency injection
  exports: [UserService], // Export UserService so it can be used in other modules (e.g., AuthModule)
})
export class UserModule {}
