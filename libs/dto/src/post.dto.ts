import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsOptional,
    IsString,
    ArrayNotEmpty,
    ArrayMaxSize,
    IsUrl,
} from 'class-validator';

export class CreatePostDto {
    @ApiPropertyOptional({
        example: 'Hôm nay chơi game vui quá',
        description: 'Nội dung bài post',
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        example: 'gaming',
        description: 'Tag của bài post',
    })
    @IsString()
    @IsOptional()
    tag?: string;

    @ApiPropertyOptional({
        example: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
        ],
        description: 'Danh sách ảnh',
        type: [String],
    })
    @IsArray()
    @IsOptional()
    @ArrayMaxSize(10)
    @IsString({ each: true })
    image?: string[];
}