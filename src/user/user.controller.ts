import { Controller , Get , Post , Put , Delete , Param, Body, Response, HttpStatus, Query , UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('bearer'))
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUserbynameoremail(@Response() res, @Query() query){
      var data = this.userService.getUsers();
      if (query.name != null){
        data = this.userService.getUserbyname(query.name);
      }
      else if (query.email != null){
        data = this.userService.getUserbyemail(query.email);
      }
      else {
        data = this.userService.getUsers();
      }

      
      if (data.length > 0){
        res.status(HttpStatus.OK).json(data);
      }
      else {
        res.status(HttpStatus.BAD_REQUEST).json({
            message : "Can not find user"
        });
      }
    }

    @Get('/:id')
    getUserbyid(@Param() Param, @Response() res){
        var data = this.userService.getUserbyid(Param.id);
        if (data.length > 0){
            res.status(HttpStatus.OK).json(data);
          }
          else {
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Can not find user"
            });
          }
    }

    @Post()
    addUser(@Response() res, @Body() user){
        var data = this.userService.addUser(user.name,user.email);
        if (data != -1){
            res.status(HttpStatus.OK).json(data);
          }
          else {
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Email pattern not match"
            });
          }
    }

    @Put('/:id')
    editUser(@Response() res, @Param() Param ,@Body() user){
        var data = this.userService.editUser( Param.id , user.name , user.email);
        if (data != -1 && data != -2){
            res.status(HttpStatus.OK).json(data);
        }
        else if (data === -2){
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Can not find user"
            });
        }
        else {
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Email pattern not match"
            });
        }
    }

    @Delete('/:id')
    deleteUser(@Response() res, @Param() Param){
        var data = this.userService.deleteUser(Param.id);
        if (data === 0){
            res.status(HttpStatus.OK).json({
                message : "The User had been delete"
            });
        }
        else{
            res.status(HttpStatus.BAD_REQUEST).json({
                message : "Can not find user"
            });
        }
    }
}
