import { ClientProviderOptions, Transport } from '@nestjs/microservices';
export enum MicroserviceKey {
    USER = 'USER',
    POST = 'POST',
    MAIL = 'MAIL',
}

function validateMicroserviceEnv(service: MicroserviceKey) {
    const hostKey = `${service}_HOST`;
    const portKey = `${service}_PORT`;

    const host = process.env[hostKey];
    const port = process.env[portKey];

    if (!host) {
        throw new Error(`Missing environment variable: ${hostKey}`);
    }

    if (!port) {
        throw new Error(`Missing environment variable: ${portKey}`);
    }

    if (Number.isNaN(Number(port))) {
        throw new Error(
            `Environment variable ${portKey} must be a number`,
        );
    }

    return {
        host,
        port: Number(port),
    };
}

export function registerTcpClients(
    services: MicroserviceKey[],
): ClientProviderOptions[] {
    return services.map((service) => {
        const { host, port } = validateMicroserviceEnv(service);

        return {
            name: service,
            transport: Transport.TCP,
            options: {
                host,
                port,
            },
        };
    });
}