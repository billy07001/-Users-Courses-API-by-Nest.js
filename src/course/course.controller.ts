import { Controller , Get , Post , Put , Delete , Param, Body, Response, HttpStatus, Query } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Get('/:id')
    getCourse(@Response() res , @Param() Param){
        var data = this.courseService.getCoursebyid(Param.id);
        if (data.length > 0){
            res.status(HttpStatus.OK).json(data);
        }
        else {
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Can not find course"
            });
        }
    }
}
