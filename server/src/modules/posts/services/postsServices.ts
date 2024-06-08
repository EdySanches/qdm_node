import { PrismaClient, posts, users } from "@prisma/client";
import { serviceResponse } from "../../../shared/utils";
import { postDTO } from "../dtos/postDTO";

const prisma = new PrismaClient();

export default class postsServices {

    public async createPost(post: postDTO): Promise<serviceResponse> {
        return {
            sucess: true,
            data: await prisma.posts.create({
                data: post
            })
        }
    }
    
    public async readPostsByUser(user_id: number): Promise<serviceResponse> {
        const posts = await prisma.posts.findMany({ 
            where: { user_id: user_id }, 
            orderBy: { id: "asc" } })
        if (!posts.length)
            return {
                sucess: false,
                message: "Posts not found!"
            }
        else {
            await prisma.posts.updateMany({
                where: { user_id: user_id},
                data: { views: { increment: 1 } }
            })
            return {
                sucess: true,
                data: posts
            }
        }
            
    }

    public async readPostById(post_id: number): Promise<serviceResponse> {
        const post = await prisma.posts.findUnique({ where: { id: post_id } })
        if (!post)
            return {
                sucess: false,
                message: "Post not found!"
            }
        else {
            await prisma.posts.update({
                where: { id: post_id},
                data: { views: { increment: 1 } }
            })
            return {
                sucess: true,
                data: post
            }
        }
    }

    public async updatePost(post_id: number, post: postDTO): Promise<serviceResponse> {
        const pSearch = await prisma.posts.findUnique({ where: { id: post_id } })
        if (!pSearch || pSearch.user_id !== post.user_id) 
            return {
                sucess: false,
                message: "User unauthorized to update!"
            }
        else {
            return {
                sucess: true,
                data: await prisma.posts.update({
                    where: { id: post_id },
                    data: post
                })
            }
        }
    }

    public async deletePost(post_id: number, user_id: number): Promise<serviceResponse> {

        const pSearch = await prisma.posts.findUnique({ where: { id: post_id } })
        if (!pSearch || pSearch.user_id !== user_id) {
            return {
                sucess: false,
                message: "User unauthorized to delete!"
            }
        }

        return {
            sucess: true,
            data: await prisma.posts.delete({
                where: { id: post_id },
            })
        }
    }

}
