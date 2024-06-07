import { PrismaClient, users } from "@prisma/client";
import { userDTO } from "../dtos/userDTO"

const prisma = new PrismaClient();

export default class usersServices {

    public async createtUser(user: userDTO): Promise<users>{
        return prisma.users.create({
            data: user,
        });
    }
    
    public async readUser(user: userDTO): Promise<any>{
        return
    }

    public async updateUser(user: userDTO): Promise<boolean>{

        return true
    }

    public async deleterUser(user: userDTO): Promise<boolean>{

        return true
    }

}
