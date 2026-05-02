import { IsNumber, IsOptional, validateSync } from 'class-validator';

export class EnvironmentVariables {
    @IsNumber()
    PORT!: number;

    @IsOptional()
    PREFIX?: string;

    @IsNumber()
    USER_PORT!: number;

    @IsNumber()
    POST_PORT!: number;

    @IsNumber()
    MAIL_PORT!: number;

    constructor() {
        this.PORT = Number(process.env['PORT']);
        this.PREFIX = process.env['PREFIX'] ?? '';
        this.USER_PORT = Number(process.env['USER_PORT']);
        this.POST_PORT = Number(process.env['POST_PORT']);
        this.MAIL_PORT = Number(process.env['MAIL_PORT']);
        const errors = validateSync(this, {
            skipMissingProperties: false,
        });

        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
    }
}