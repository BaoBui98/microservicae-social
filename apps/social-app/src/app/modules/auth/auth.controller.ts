import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { MicroserviceKey } from "@common/config";
import { TCP_REQUEST_MESSAGE } from "@common/constant";
import { LoginDto, SignUpDto } from "@common/dto";

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(MicroserviceKey.USER)
        private readonly usersClient: ClientProxy,
    ) { }
    @ApiOperation({ summary: 'Register' })
    @ApiResponse({ status: 200, description: 'Register success' })
    @Post('register')
    async register(@Body() body: SignUpDto) {
        return this.usersClient.send(TCP_REQUEST_MESSAGE.USER.CREATE, body);
    }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, description: 'Login success' })
    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.usersClient.send(TCP_REQUEST_MESSAGE.USER.LOGIN, body);
    }
}