import { Body, Controller, Get, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { MicroserviceKey } from "@common/config";
import { TCP_REQUEST_MESSAGE } from "@common/constant";
import { EmailDto } from "@common/dto";

@ApiTags('mail')
@Controller('mail')
export class MailController {
    constructor(
        @Inject(MicroserviceKey.MAIL)
        private readonly mailClient: ClientProxy,
    ) { }
    @Post()
    async create(@Body() body: EmailDto) {
        return this.mailClient.send(TCP_REQUEST_MESSAGE.MAIL.SEND, body);
    }

}