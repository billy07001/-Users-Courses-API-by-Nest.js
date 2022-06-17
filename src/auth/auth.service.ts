import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,) {}

  async validateUser(token: string): Promise<any> {
    // 先假定token已知，由userService回傳使用者資料
    // 如果token不正確則回傳null
    return await this.userService.findOneByToken(token);
  }
}
