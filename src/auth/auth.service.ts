// auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService // Inject JwtService for token generation
  ) {}

  // Register a new user
  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { name, email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);
    return { message: 'User registered successfully' };
  }

  // Login a user
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid credentials'); // Or create a custom error handling strategy
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      username: user.name,
      sub: user.id,
      lastActivity: Date.now(), // Add timestamp for last activity
    }; // JWT payload
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' }); // Generate JWT token

    return { accessToken };
  }

  
}
