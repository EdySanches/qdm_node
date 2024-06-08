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
            const postFmt = plainToInstance(postDTO, req.body.user)
            await validateOrReject(postFmt)

            /* call service */
            const result = await new usersServices().createPost(postFmt)

            /* return reponse */
            res.status(201).json(result)
        } catch (err) {
            console.log(new Date(), "createUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async readUsers(req :Request, res: Response){
        
        try{
            /* check fields */
            const user_name = req.body.user?.user_name || '' 

            /* call service */
            const result = await new usersServices().readUsers(user_name)
            console.log(new Date(), "readUsers -- result", result)

            /* return reponse */
            res.status(201).json(result)
        } catch (err) {
            console.log(new Date(), "createUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async updatePost(req :Request, res: Response){
        
        try{
            /* check fields */
            req.body.user.last_login = new Date() // TODO plain how to fix
            req.body.user.updated_at = new Date()
            const postFmt = plainToInstance(postDTO, req.body.user)
            await validateOrReject(postFmt)

            /* call service */
            const user = await new usersServices().updatePost(req.body.user.id, postFmt)

            /* return reponse */
            if (user.sucess)
                res.status(202).json(user)
            else 
                res.status(400).json(user)

        } catch (err) {
            console.log(new Date(), "createUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async deletePost(req :Request, res: Response){
        
        try{
            /* call service */
            const user = await new usersServices().deletePost(req.body.user.id)
            console.log(new Date(), "deleteUser")
            /* return reponse */
            if (user.sucess)
                res.status(202).json(user)
            else 
                res.status(400).json(user)
            
        } catch (err) {
            console.log(new Date(), "createUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

}

