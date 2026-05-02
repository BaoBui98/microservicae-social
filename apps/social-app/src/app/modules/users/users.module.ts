import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

import { ClientsModule } from '@nestjs/microservices';
import { MicroserviceKey, registerTcpClients } from '@common/config';


@Module({
    imports: [ClientsModule.register(
        registerTcpClients([MicroserviceKey.USER]),
    ),],
    controllers: [UsersController],
})
export class UsersModule { }
