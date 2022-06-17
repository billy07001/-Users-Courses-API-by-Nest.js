import { Injectable } from '@nestjs/common';

@Injectable()
export class EnrollmentService {
    Users = [
        {
            "id" : 1 ,
            "name" : "Billy Lai",
            "email" : "abc@billy.com"
        },
        {
            "id" : 2 ,
            "name" : "Pio Lai",
            "email" : "cde@billy.com"
        }
    ]
    Courses = [
        {
        "id": 1,
        "name": "Nestjs 101"
        },
        {
        "id": 2,
        "name": "成為 Nestjs 大師的路上"
        },
        {
        "id": 3,
        "name": "從零開始的 nestjs 之旅"
        },
        {
        "id": 4,
        "name": "You Don't Know Js"
        },
        {
        "id": 5,
        "name": "I Don't Know Js yet"
        }
    ]
    Enrollment = [
        {
            "id" : 1 ,
            "userId" : 1 ,
            "courseId" : 1 ,
            "role" : "student"
        },
        {
            "id" : 2 ,
            "userId" : 2 ,
            "courseId" : 2 ,
            "role" : "teacher"
        },
        {
            "id" : 3 ,
            "userId" : 1 ,
            "courseId" : 2 ,
            "role" : "student"
        },
        {
            "id" : 4 ,
            "userId" : 2 ,
            "courseId" : 1 ,
            "role" : "teacher"
        },
        {
            "id" : 5 ,
            "userId" : 2 ,
            "courseId" : 3 ,
            "role" : "teacher"
        }
    ]

    getEnrollmentbyid(id: String){
        return this.Enrollment.filter(enrollment => enrollment.id === Number(id));
    }

    getUserbycourseid(id: String){
        var result = this.Enrollment.filter(enrollment => enrollment.courseId === Number(id));
        var UserArr = [];
        for (var i = 0 ; i < result.length ; i++){
            UserArr[i] = this.Users.filter(user => user.id === result[i].userId)
        }
        return UserArr;
    }

    enrollUser(userId: string , courseId: string , role: string){
        var lastenrollmentid = this.Enrollment[this.Enrollment.length-1].id;
        var usersearch = this.Users.filter(user => user.id === Number(userId));
        var coursesearch = this.Courses.filter(course => course.id === Number(courseId));
        if (usersearch.length != 0 && coursesearch.length != 0){
            if (role === 'student' || role === 'teacher'){
                this.Enrollment[this.Enrollment.length] = {
                    "id" : lastenrollmentid+1 ,
                    "userId" : Number(userId) ,
                    "courseId" : Number(courseId) ,
                    "role" : role
                }
                return this.Enrollment[this.Enrollment.length-1];
            }
            return -1;
        }
        return -1;
    }

    withdrawUserbyenrollmentid(id: String){
        var result = this.Enrollment.filter(enrollment => enrollment.id === Number(id));
        if (result.length > 0){
            this.Enrollment.splice(this.Enrollment.indexOf(result[0]),1);
            return 0;
        }
        else {
            return -1;
        }
    }

    getEnrollmentbyrequest(userId: string , courseId: string , role: string){
        var result = this.Enrollment
        if (userId != undefined){
            result = this.Enrollment.filter(enrollment => enrollment.userId === Number(userId));
        }
        if(courseId != undefined){
            result = this.Enrollment.filter(enrollment => enrollment.courseId === Number(courseId));
        }
        if (role != undefined){
            result = this.Enrollment.filter(enrollment => enrollment.role === role);
        }

        if (result.length > 0){
            return result;
        }
        else {
            return null;
        }
    }

    getCoursebyuserid(id: String){
        var result = this.Enrollment.filter(enrollment => enrollment.userId === Number(id));
        var CourseArr = [];
        for (var i = 0 ; i < result.length ; i++){
            CourseArr[i] = this.Courses.filter(course => course.id === result[i].courseId)
        }
        return CourseArr;
    }
}
