import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

@Entity('profiles')
export class Profile extends BaseEntity {
    @Column({ type: 'int', default: 0 })
    coin!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar!: string;

    @Column({ type: 'enum', enum: Gender, nullable: true })
    gender!: Gender;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;
}
