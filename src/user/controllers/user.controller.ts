import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto, SignInDto } from '../dto/createUserDto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('sign_up')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.userService.signUp(createUserDto);
    }

    @Post('sign_in')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.userService.signIn(signInDto);
    }
}
