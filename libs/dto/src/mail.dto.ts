import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
    @ApiProperty({
        example: 'buitragiabao2016@gmail.com',
        description: 'User email address',
    })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @ApiProperty({
        example: 'register',
        description: 'Action to be performed',
    })
    @IsNotEmpty({ message: 'Action is required' })
    action!: string;
}

export class VerifyEmailDto {
    @ApiProperty({
        example: 'buitragiabao2016@gmail.com',
        description: 'User email address',
    })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;
}

export class ResponseVerifyEmailDto extends EmailDto {
    @ApiProperty({
        example: '123456',
        description: 'Code to be verified',
    })
    @IsString()
    @IsNotEmpty()
    code!: string;
}
export class ForgotPasswordDto {

    @ApiProperty({
        example: '123456',
        description: 'New password',
    })
    @IsString()
    @IsNotEmpty()
    password!: string;

    @ApiProperty({
        example: '123456',
        description: 'Code to be verified',
    })
    @IsString()
    @IsNotEmpty()
    code!: string;

    @ApiProperty({
        example: 'buitragiabao2016@gmail.com',
        description: 'User email address',
    })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;
}