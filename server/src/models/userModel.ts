export interface userModelInt {
    idUser?: number
    name: string
    email: string
    password: string
    type: number
    lastLogin?: Date

    formatUserReq?(req: any): userModelInt
}

export class userModel implements userModelInt {

    idUser: number
    name: string
    email: string
    password: string
    type: number
    lastLogin: Date
    
    constructor(
        idUser: number = 0,
        name: string = '',
        email: string = '',
        password: string = '',
        type: number = 0,
        lastLogin: Date = new Date()
    ) {
        this.idUser = idUser;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.lastLogin = lastLogin;
    }

    public formatUserReq(req: any): userModelInt {

        const u: userModelInt = {
            name: req.body.name || '', 
            email: req.body.email || '',
            password: req.body.password || '',
            type: req.body.type || 99
        }
        console.log('userModel/formatUserReq -- usuario formatado:', u)

        return u
    }

}
