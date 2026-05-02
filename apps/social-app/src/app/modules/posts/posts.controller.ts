import { Body, Controller, Get, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { MicroserviceKey } from "@common/config";
import { TCP_REQUEST_MESSAGE } from "@common/constant";
import { CreatePostDto, GetUserDto } from "@common/dto";
import { JwtAuthGuard } from "@common/guard";
import { CurrentUser } from "@common/decorator";
import { IUserJwt } from "@common/interface";

@ApiTags('posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
    constructor(
        @Inject(MicroserviceKey.POST)
        private readonly postsClient: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create post' })
    @ApiResponse({ status: 201, description: 'Create success' })
    @Post()
    async create(@Body() body: CreatePostDto, @CurrentUser() user: IUserJwt) {
        return this.postsClient.send(TCP_REQUEST_MESSAGE.POST.CREATE, { ...body, uploadBy: user.id });
    }

}