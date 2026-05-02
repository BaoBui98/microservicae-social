import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { MicroserviceKey } from "@common/config";
import { EMAIL_ACTION, TCP_REQUEST_MESSAGE } from "@common/constant";
import { EmailDto, ForgotPasswordDto, LoginDto, SignUpDto, VerifyEmailDto } from "@common/dto";
import { firstValueFrom } from "rxjs";

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
        return await firstValueFrom(
            this.usersClient.send(TCP_REQUEST_MESSAGE.USER.CREATE, body)
        );
    }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, description: 'Login success' })
    @Post('login')
    async login(@Body() body: LoginDto) {
        return await firstValueFrom(
            this.usersClient.send(TCP_REQUEST_MESSAGE.USER.LOGIN, body)
        );
    }

    @ApiOperation({ summary: 'Verify email' })
    @ApiResponse({ status: 200, description: 'Verify email success' })
    @Post('verify-email')
    async verifyEmail(@Body() body: VerifyEmailDto) {
        try {
            const res = await firstValueFrom(
                this.usersClient.send(TCP_REQUEST_MESSAGE.USER.VERIFY_EMAIL, {
                    email: body.email,
                    action: EMAIL_ACTION.VERIFY,
                })
            );
            console.log("In ra res", res)
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @ApiOperation({ summary: 'Forgot password' })
    @ApiResponse({ status: 200, description: 'Forgot password success' })
    @Post('forgot-password')
    async forgotPassword(@Body() body: ForgotPasswordDto) {
        try {
            const res = await firstValueFrom(
                this.usersClient.send(TCP_REQUEST_MESSAGE.USER.FORGOT_PASSWORD, {
                    ...body,
                    action: EMAIL_ACTION.VERIFY,
                })
            );
            console.log("In ra res", res)
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}