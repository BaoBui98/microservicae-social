import { IsEmail, IsNotEmpty } from 'class-validator';
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