import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, SignInDto } from '../dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(userDto: CreateUserDto) {
        const checkExist = await this.userRepository.findOne({
            where: {
                email: userDto.email,
            },
        });

        if (checkExist) {
            throw new HttpException(
                'User is already exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        userDto.password = await bcrypt.hash(userDto.password, 10);
        const newUser = await await this.userRepository.save(userDto);

        const token = this._createToken(newUser);
        return {
            email: newUser.email,
            token,
        };
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.userRepository.findOne({
            where: [
                {
                    phone_number: signInDto.phone_number,
                },
                {
                    email: signInDto.email,
                },
            ],
        });

        if (!user) {
            throw new HttpException('User is not found!', HttpStatus.NOT_FOUND);
        }

        const isMatch = await bcrypt.compare(signInDto.password, user.password);

        if (!isMatch) {
            throw new HttpException(
                'Password was wrong!',
                HttpStatus.BAD_REQUEST,
            );
        }

        const token = this._createToken(user);

        return {
            email: user.email,
            token,
        };
    }

    private _createToken({ email }) {
        return this.jwtService.sign({ email });
    }
}
