import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { IsString, validateSync, IsOptional } from 'class-validator';

export class JwtEnvironmentVariables {
    @IsString()
    JWT_SECRET!: string;

    @IsString()
    @IsOptional()
    JWT_EXPIRES_IN!: string;

    constructor(configService: ConfigService) {
        this.JWT_SECRET = configService.get<string>('JWT_SECRET') as string;
        this.JWT_EXPIRES_IN = configService.get<string>('JWT_EXPIRES_IN', '1d') as string;

        const errors = validateSync(this, {
            skipMissingProperties: false,
        });

        if (errors.length > 0) {
            throw new Error(`JWT config validation error: ${errors.toString()}`);
        }
    }
}

export const jwtConfig: JwtModuleAsyncOptions = {
    global: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): JwtModuleOptions => {
        const env = new JwtEnvironmentVariables(configService);

        return {
            secret: env.JWT_SECRET,
            signOptions: { expiresIn: env.JWT_EXPIRES_IN as any },
        };
    },
};
