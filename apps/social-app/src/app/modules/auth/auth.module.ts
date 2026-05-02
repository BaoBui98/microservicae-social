import { Module } from '@nestjs/common';


import { ClientsModule } from '@nestjs/microservices';
import { MicroserviceKey, registerTcpClients } from '@common/config';
import { AuthController } from './auth.controller';


@Module({
    imports: [ClientsModule.register(
        registerTcpClients([MicroserviceKey.USER]),
    ),],
    controllers: [AuthController],
})
export class AuthModule { }
