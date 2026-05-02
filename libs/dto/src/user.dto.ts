import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '@common/constant';
import { Gender } from '@common/entity';

export class GetUserDto {
    @ApiPropertyOptional({
        example: 'john',
        description: 'Search keyword',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        example: 1,
        description: 'Page number',
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({
        example: 10,
        description: 'Items per page',
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
}

export class SignUpDto {
    @ApiProperty({
        example: 'baobui',
        description: 'Tên người dùng',
    })
    @IsString()
    @IsNotEmpty()
    name!: string;
    @ApiProperty({
        example: 'buitragiabao2016@gmail.com',
        description: 'Email người dùng',
    })
    @IsEmail()
    email!: string;
    @ApiProperty({
        example: '123456',
        minLength: 6,
        description: 'Mật khẩu',
    })
    @IsString()
    @MinLength(6)
    password!: string;
    @ApiProperty({
        example: UserRole.USER,
        description: 'Vai trò người dùng',
    })
    @IsEnum(UserRole)
    @IsOptional()
    @IsString()
    role: UserRole = UserRole.USER;

    @ApiProperty({
        example: Gender.MALE,
        description: 'Giới tính',
        enum: Gender,
        required: false,
    })
    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;
}

export class LoginDto {
    @ApiProperty({
        example: 'buitragiabao2016@gmail.com',
        description: 'Email người dùng',
    })
    @IsEmail()
    email!: string;
    @ApiProperty({
        example: '123456',
        minLength: 6,
        description: 'Mật khẩu',
    })
    @IsString()
    @MinLength(6)
    password!: string;
}
