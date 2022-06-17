import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseController } from './course/course.controller';

import { CourseService } from './course/course.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [AuthModule, UserModule, EnrollmentModule],
  controllers: [AppController, CourseController],
  providers: [AppService, CourseService ],
})
export class AppModule {}
