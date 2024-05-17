export interface User {
    userId : string,
    userInfo? : {
        firstName : string,
        lastName : string,
        nickName : string,
        tel : string,
        dateOfBirth : Date,
    }
    joiningTime : Date,
    friends? : string[]
}