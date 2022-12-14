export class CreateUserDto {
    full_name: string;
    phone_number: string;
    username: string;
    email: string;
    password: string;
}

export class SignInDto {
    email: string;
    phone_number: string;
    password: string;
}
