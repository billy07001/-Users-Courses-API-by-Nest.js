import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { HttpStrategy } from './passport/http.strategy';

@Module({
    imports: [ UserModule ],
    providers: [
        AuthService,
        HttpStrategy,
    ],
})
export class AuthModule {}
