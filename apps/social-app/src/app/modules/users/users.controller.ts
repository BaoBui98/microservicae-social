import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { MicroserviceKey } from "@common/config";
import { TCP_REQUEST_MESSAGE } from "@common/constant";
import { GetUserDto } from "@common/dto";
import { JwtAuthGuard } from "@common/guard";
import { CurrentUser } from "@common/decorator";
import { IUserJwt } from "@common/interface";

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(
        @Inject(MicroserviceKey.USER)
        private readonly usersClient: ClientProxy,
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all data' })
    @ApiResponse({ status: 200, description: 'Get success' })
    @Get()
    async getAllUser(@Query() query: GetUserDto) {
        return this.usersClient.send(TCP_REQUEST_MESSAGE.USER.GET_ALL, query);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user' })
    @ApiResponse({ status: 200, description: 'Get success' })
    @Get('profile')
    async getProfile(@CurrentUser() user: IUserJwt) {
        return this.usersClient.send(TCP_REQUEST_MESSAGE.USER.GET_BY_EMAIL, user.email);
    }
}