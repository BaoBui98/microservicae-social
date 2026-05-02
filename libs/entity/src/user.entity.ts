import { Entity, Column, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserRole } from '@common/constant';
import { Profile } from './profile.entity';

@Entity('users')
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'enum', enum: UserRole, nullable: false, default: UserRole.USER })
    role!: UserRole;

    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
    profile!: Profile;
}
