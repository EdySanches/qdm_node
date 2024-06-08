import { Request, Response , NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import usersServices from "../services/commentsServices";
import { commentDTO } from "../dtos/commentDTO";

export default new class commentsControllers {

    public async createComment(req :Request, res: Response){
        
        try{
            /* check fields */
            const commFmt = plainToInstance(commentDTO, req.body.comment)
            await validateOrReject(commFmt)

            /* call service */
            const result = await new usersServices().createComment(commFmt)

            /* return reponse */
            res.status(201).json(result)
        } catch (err) {
            console.log(new Date(), "createComment -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async readCommentsByPost(req :Request, res: Response){
        try{            
            /* check fields */ 
            if (!req.body.comment.post_id){
                res.status(422).send('Missing comment.post_id parameter!');
                return
            }

            /* call service */
            const result = await new usersServices().readCommentsByPost(req.body.comment.post_id)

            /* return reponse */
            res.status(200).json(result)
        } catch (err) {
            console.log(new Date(), "readCommentsByUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async readCommentsByUser(req :Request, res: Response){
        try{            
            /* check fields */ 
            if (!req.body.comment.user_id){
                res.status(422).send('Missing comment.user_id parameter!');
                return
            }

            /* call service */
            const result = await new usersServices().readCommentsByUser(req.body.comment.user_id)

            /* return reponse */
            res.status(200).json(result)
        } catch (err) {
            console.log(new Date(), "readCommentsByUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async readCommentById(req :Request, res: Response){
        
        try{
            /* check fields */
            if (!req.body.comment.id){
                res.status(422).send('Missing comment.id parameter!');
                return
            }

            /* call service */
            const result = await new usersServices().readCommentById(req.body.comment.id)

            /* return reponse */
            res.status(200).json(result)
        } catch (err) {
            console.log(new Date(), "readCommentById -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async updateComment(req :Request, res: Response){
        
        try{
            /* check fields */
            const commFmt = plainToInstance(commentDTO, req.body.comment)
            await validateOrReject(commFmt)

            /* call service */
            const result = await new usersServices().updateComment(req.body.post.id, commFmt)

            /* return reponse */
            if (result.sucess)
                res.status(202).json(result)
            else 
                res.status(400).json(result)

        } catch (err) {
            console.log(new Date(), "updateComment -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async deleteCommentByUser(req :Request, res: Response){
        try{
            /* check fields */
            if (!req.body.comment?.id || !req.body.comment?.user_id){
                res.status(422).send('Missing comment.id or comment.user_id parameters!');
                return
            }
            
            /* call service */
            const result = await new usersServices().deleteCommentByUser(req.body.comment.id, req.body.comment.user_id)

            /* return reponse */
            if (result.sucess)
                res.status(202).json(result)
            else 
                res.status(400).json(result)
            
        } catch (err) {
            console.log(new Date(), "deleteCommentByUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async deleteCommentByPO(req :Request, res: Response){
        try{
            /* check fields */
            if (!req.body.comment?.id || !req.body.comment?.post_owner_id){
                res.status(422).send('Missing comment.id or comment.post_owner_id parameters!');
                return
            }
            
            /* call service */
            const result = await new usersServices().deleteCommentByPO(req.body.comment.id, req.body.comment.post_owner_id)

            /* return reponse */
            if (result.sucess)
                res.status(202).json(result)
            else 
                res.status(400).json(result)
            
        } catch (err) {
            console.log(new Date(), "deleteCommentByPO -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

}

