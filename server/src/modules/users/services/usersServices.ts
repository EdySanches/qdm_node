import { PrismaClient, users } from "@prisma/client";
import { userDTO } from "../dtos/userDTO"
import { serviceResponse } from "../../../shared/utils";

const prisma = new PrismaClient();

export default class usersServices {

    public async createUser(user: userDTO): Promise<serviceResponse> {
        return {
            sucess: true,
            data: await prisma.users.create({
                data: user
            })
        }
    }
    
    public async readUsers(user_name?: string): Promise<serviceResponse> {
        if (user_name)
            return {
                sucess: true,
                data: await prisma.users.findMany({ 
                    where: { user_name: user_name }, 
                    orderBy: { id: "asc" } })
            }
        else
            return {
                sucess: true,
                data: await prisma.users.findMany({ orderBy: { id: "asc" } })
            }
    }

    public async updateUser(id: number, user: userDTO): Promise<serviceResponse> {
        const uSearch = prisma.users.findUnique({ where: { id } })
        if (!uSearch) {
            return {
                sucess: false,
                message: "User not found!"
            }
        }

        return {
            sucess: true,
            data: await prisma.users.update({
                where: { id: id },
                data: user
            })
        }
    }

    public async deleteUser(id: number): Promise<serviceResponse> {

        const uSearch = prisma.users.findUnique({ where: { id } })
        if (!uSearch) {
            return {
                sucess: false,
                message: "User not found!"
            }
        }

        return {
            sucess: true,
            data: await prisma.users.delete({
                where: { id: id },
            })
        }
    }

}
