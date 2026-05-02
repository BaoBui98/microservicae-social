import { Module } from '@nestjs/common';


import { ClientsModule } from '@nestjs/microservices';
import { MicroserviceKey, registerTcpClients } from '@common/config';
import { MailController } from './mail.controller';



@Module({
    imports: [ClientsModule.register(
        registerTcpClients([MicroserviceKey.MAIL]),
    ),],
    controllers: [MailController],
})
export class MailModule { }
