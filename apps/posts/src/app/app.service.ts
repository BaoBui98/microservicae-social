import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

import { CreatePostDto } from '@common/dto';
import { IPost } from '@common/interface';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) { }

  async createPost(data: IPost) {
    return this.appRepository.createPost(data);
  }

  async findAllPosts() {
    return this.appRepository.findAllPosts();
  }

  async findPostById(id: string) {
    return this.appRepository.findPostById(id);
  }

  async updatePost(id: string, data: any) {
    return this.appRepository.updatePost(id, data);
  }

  async deletePost(id: string) {
    return this.appRepository.deletePost(id);
  }
}
