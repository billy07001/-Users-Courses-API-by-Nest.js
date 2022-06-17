import { Controller , Get , Post , Put , Delete , Param, Body, Response, HttpStatus, Query , UseGuards} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('bearer'))
@Controller('enrollment')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) {}

    @Get('/:id')
    getEnrollmentbyid(@Response() res , @Param() Param){
        var data = this.enrollmentService.getEnrollmentbyid(Param.id);
        if (data.length > 0){
            res.status(HttpStatus.OK).json(data);
          }
        else {
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Can not find enrollment"
            });
        }
    }

    @Get('/courseId/:id')
    getUserbycourseid(@Response() res , @Param() Param){
        var data = this.enrollmentService.getUserbycourseid(Param.id);
        if (data.length > 0){
            res.status(HttpStatus.OK).json(data);
          }
        else {
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Can not find user"
            });
        }
    }

    @Get()
    getEnrollmentbyrequest(@Response() res , @Query() query){
        var data = this.enrollmentService.getEnrollmentbyrequest(query.userId , query.courseId , query.role);
        if (data != null){
            res.status(HttpStatus.OK).json(data);
        }
        else{
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Cannot find the enrollment"
            });
        }
    }

    @Get('/userId/:id')
    getCoursebyuserid(@Response() res , @Param() Param){
        var data = this.enrollmentService.getCoursebyuserid(Param.id);
        if (data.length > 0){
            res.status(HttpStatus.OK).json(data);
          }
        else {
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Can not find course"
            });
        }
    }

    @Post()
    enrollUser(@Response() res , @Body() enrollment){
        var data = this.enrollmentService.enrollUser(enrollment.userId , enrollment.courseId , enrollment.role);
        if (data != -1){
            res.status(HttpStatus.OK).json(data);
        }
        else{
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "User or Course or role doesn't exist"
            });
        }
    }

    @Delete('/:id')
    withdrawUserbyenrollmentid(@Response() res , @Param() Param){
        var data = this.enrollmentService.withdrawUserbyenrollmentid(Param.id);
        if (data === 0){
            res.status(HttpStatus.OK).json({
                message : "The User had been withdraw"
            });
        }
        else{
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "The enrollment doesn't exist"
            });
        }
    }
    
}
