import { Request, Response , NextFunction } from "express";
import authUserService from "../../../auth/authenticateUser"
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import usersServices from "../services/postsServices";
import { postDTO } from "../dtos/postDTO";

export default new class postsControllers {

    public async createPost(req :Request, res: Response){
        
        try{
            /* check fields */
            req.body.post.views = 0
            req.body.post.likes = 0
            req.body.post.dislikes = 0
            const postFmt = plainToInstance(postDTO, req.body.post)
            await validateOrReject(postFmt)

            /* call service */
            const result = await new usersServices().createPost(postFmt)

            /* return reponse */
            res.status(201).json(result)
        } catch (err) {
            console.log(new Date(), "createPost -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async readPostById(req :Request, res: Response){
        
        try{
            /* check fields */
            if (!req.body.post.id){
                res.status(422).send('Missing post.id parameter!');
                return
            }

            /* call service */
            const result = await new usersServices().readPostById(req.body.post.id)

            /* return reponse */
            res.status(201).json(result)
        } catch (err) {
            console.log(new Date(), "readPostById -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async readPostsByUser(req :Request, res: Response){
        try{            
            /* check fields */ 
            if (!req.body.post.user_id){
                res.status(422).send('Missing post.user_id parameter!');
                return
            }

            /* call service */
            const result = await new usersServices().readPostsByUser(req.body.post.user_id)

            /* return reponse */
            res.status(201).json(result)
        } catch (err) {
            console.log(new Date(), "readPostsByUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async updatePost(req :Request, res: Response){
        
        try{
            /* check fields */
            const postFmt = plainToInstance(postDTO, req.body.post)
            await validateOrReject(postFmt)

            /* call service */
            const result = await new usersServices().updatePost(req.body.post.id, postFmt)

            /* return reponse */
            if (result.sucess)
                res.status(202).json(result)
            else 
                res.status(400).json(result)

        } catch (err) {
            console.log(new Date(), "updatePost -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async deletePost(req :Request, res: Response){
        try{
            /* check fields */
            if (!req.body.post?.id || !req.body.post?.user_id){
                res.status(422).send('Missing post.id or post.user_id parameters!');
                return
            }
            
            /* call service */
            const result = await new usersServices().deletePost(req.body.post.id, req.body.post.user_id)

            /* return reponse */
            if (result.sucess)
                res.status(202).json(result)
            else 
                res.status(400).json(result)
            
        } catch (err) {
            console.log(new Date(), "deletePost -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

}

