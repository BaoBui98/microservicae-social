import { Module } from '@nestjs/common';


import { ClientsModule } from '@nestjs/microservices';
import { MicroserviceKey, registerTcpClients } from '@common/config';
import { PostsController } from './posts.controller';


@Module({
    imports: [ClientsModule.register(
        registerTcpClients([MicroserviceKey.POST]),
    ),],
    controllers: [PostsController],
})
export class PostModule { }
