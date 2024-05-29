export interface User {
    userId: string,
    userInfo?: {
        email: string,
        firstName: string,
        lastName: string,
        nickName: string,
        phone: string,
        dateOfBirth: string,
        profilImage: string
    }
    joiningTime: Date,
    friends?: string[]
}