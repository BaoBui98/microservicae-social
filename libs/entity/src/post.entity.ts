import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('posts')
export class Post extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    content!: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    tag!: string | null;

    @Column({ type: 'text', array: true, nullable: true })
    image!: string[] | null;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'upload_by' })
    uploadBy!: User;
}
