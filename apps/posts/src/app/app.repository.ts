import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Post } from '@common/entity';
import { IPost } from '@common/interface';
import { CreatePostDto } from '@common/dto';

@Injectable()
export class AppRepository {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) { }

    async createPost(data: IPost): Promise<Post> {
        const post = this.postRepository.create({
            content: data.content,
            image: data.image,
            tag: data.tag,
            uploadBy: { id: data.uploadBy }

        });
        return this.postRepository.save(post);
    }

    async findAllPosts(): Promise<Post[]> {
        return this.postRepository.find({
            relations: ['uploadBy'],
            order: { createdAt: 'DESC' },
        });
    }

    async findPostById(id: string): Promise<Post | null> {
        return this.postRepository.findOne({
            where: { id },
            relations: ['uploadBy'],
        });
    }

    async updatePost(id: string, data: Partial<IPost>): Promise<Post | null> {
        await this.postRepository.update(id, data as import('typeorm/query-builder/QueryPartialEntity').QueryDeepPartialEntity<Post>);
        return this.findPostById(id);
    }

    async deletePost(id: string): Promise<boolean> {
        const result = await this.postRepository.delete(id);
        return result.affected !== 0;
    }
}
