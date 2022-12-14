import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.ACCESS_SECRET_KEY,
                signOptions: {
                    expiresIn: process.env.ACCESS_EXPRIRE_IN,
                },
            }),
        }),
    ],
    providers: [UserService, JwtStrategy, JwtAuthGuard],
    controllers: [UserController],
})
export class UserModule {}
