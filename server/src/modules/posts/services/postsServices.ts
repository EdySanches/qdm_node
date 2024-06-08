import { PrismaClient, users } from "@prisma/client";
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
        if (!posts)
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

    public async updatePost(post: postDTO): Promise<serviceResponse> {
        const pSearch = await prisma.posts.findUnique({ where: { id: post.id } })
        if (!pSearch || pSearch.owner_id !== post.owner_id) 
            return {
                sucess: false,
                message: "User unauthorized to update!"
            }
        else
            return {
                sucess: true,
                data: await prisma.users.update({
                    where: { id: post.id },
                    data: post
                })
            }
    }

    public async deletePost(id: number): Promise<serviceResponse> {

        const pSearch = prisma.posts.findUnique({ where: { id } })
        if (!pSearch || pSearch.owner_id !== post.owner_id) {
            return {
                sucess: false,
                message: "Post not found!"
            }
        }

        return {
            sucess: true,
            data: await prisma.posts.delete({
                where: { id: id },
            })
        }
    }

}
