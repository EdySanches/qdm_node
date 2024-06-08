import { PrismaClient, posts, users } from "@prisma/client";
import { serviceResponse } from "../../../shared/utils";
import { commentDTO } from "../dtos/commentDTO";

const prisma = new PrismaClient();

export default class commentsServices {

    public async createComment(comm: commentDTO): Promise<serviceResponse> {
        return {
            sucess: true,
            data: await prisma.comments.create({
                data: comm
            })
        }
    }

    public async readCommentsByPost(post_id: number): Promise<serviceResponse> {
        const comm = await prisma.comments.findMany({ where: { post_id: post_id } })
        if (!comm.length)
            return {
                sucess: false,
                message: "Comments not found!"
            }
        else {
            return {
                sucess: true,
                data: comm
            }
        }
    }

    public async readCommentsByUser(user_id: number): Promise<serviceResponse> {
        const comms = await prisma.comments.findMany({ 
            where: { user_id: user_id }, 
            orderBy: { id: "asc" } })
        if (!comms.length)
            return {
                sucess: false,
                message: "Comments not found!"
            }
        else {
            return {
                sucess: true,
                data: comms
            }
        }
            
    }

    public async readCommentById(comm_id: number): Promise<serviceResponse> {
        const comm = await prisma.comments.findUnique({ where: { id: comm_id } })
        if (!comm)
            return {
                sucess: false,
                message: "Comment not found!"
            }
        else {
            return {
                sucess: true,
                data: comm
            }
        }
    }

    public async updateComment(comm_id: number, comm: commentDTO): Promise<serviceResponse> {
        const cSearch = await prisma.comments.findUnique({ where: { id: comm_id } })
        if (!cSearch || cSearch.user_id !== comm.user_id) 
            return {
                sucess: false,
                message: "User unauthorized to update!"
            }
        else {
            return {
                sucess: true,
                data: await prisma.comments.update({
                    where: { id: comm_id },
                    data: comm
                })
            }
        }
    }

    public async deleteCommentByUser(comm_id: number, user_id: number): Promise<serviceResponse> {

        const cSearch = await prisma.comments.findUnique({ where: { id: comm_id } })
        if (!cSearch || cSearch.user_id !== user_id) {
            return {
                sucess: false,
                message: "User unauthorized to delete!"
            }
        }

        return {
            sucess: true,
            data: await prisma.comments.delete({
                where: { id: comm_id },
            })
        }
    }

    public async deleteCommentByPO(comm_id: number, po_id: number): Promise<serviceResponse> {

        const cSearch = await prisma.comments.findUnique({ where: { id: comm_id } })
        if (!cSearch || cSearch.post_owner_id !== po_id) {
            return {
                sucess: false,
                message: "User unauthorized to delete!"
            }
        }

        return {
            sucess: true,
            data: await prisma.comments.update({
                where: { id: comm_id },
                data: { comment_status: "Removed by post owner!"}
            })
        }
    } 
}
