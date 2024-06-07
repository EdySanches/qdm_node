import { PrismaClient, users } from "@prisma/client";
import { userDTO } from "../dtos/userDTO"
import { serviceResponse } from "../../../shared/utils";

const prisma = new PrismaClient();

export default class usersServices {

    public async createtUser(user: userDTO): Promise<users> {
        return prisma.users.create({
            data: user,
        });
    }
    
    public async readUser(user_name?: string): Promise<users[]> {
        if (user_name)
            return prisma.users.findMany({ where: { user_name: user_name } })
        else
            return prisma.users.findMany()
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
            data: prisma.users.update({
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
            data: prisma.users.delete({
                where: { id: id },
            })
        }
    }

}
