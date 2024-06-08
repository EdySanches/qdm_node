import { Request, Response , NextFunction, request} from "express";
import authUserService from "../../../auth/authenticateUser"
import { plainToInstance } from "class-transformer";
import { userDTO } from "../dtos/userDTO";
import { validateOrReject } from "class-validator";
import usersServices from "../services/usersServices";

export default new class userControllers {

    public async login(req: Request, res: Response, _:NextFunction){

        try{
            /* token part */
            const token = await new authUserService().execute(req.body.user_email, req.body.user_passw)
            
            if(token) {
                res.status(200).json({token:token})
            }
            else {
                res.status(401).send('Incorrect email/password combination.')
            }
        }  catch(err) {
            console.log(new Date(), "login -- err:", err)
            res.status(422).send('Parameters error!');
        }

        return

    } 

    public async createUser(req :Request, res: Response){
        
        try{
            /* check fields */
            req.body.user.last_login = new Date()
            const userFMT = plainToInstance(userDTO, req.body.user)
            await validateOrReject(userFMT)

            /* call service */
            const result = await new usersServices().createUser(userFMT)

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

            /* return reponse */
            res.status(201).json(result)
        } catch (err) {
            console.log(new Date(), "readUsers -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async updateUser(req :Request, res: Response){
        
        try{
            /* check fields */
            req.body.user.last_login = new Date() // TODO plain how to fix
            req.body.user.updated_at = new Date()
            const userFMT = plainToInstance(userDTO, req.body.user)
            await validateOrReject(userFMT)

            /* call service */
            const user = await new usersServices().updateUser(req.body.user.id, userFMT)

            /* return reponse */
            if (user.sucess)
                res.status(202).json(user)
            else 
                res.status(400).json(user)

        } catch (err) {
            console.log(new Date(), "updateUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

    public async deleteUser(req :Request, res: Response){
        
        try{
            /* call service */
            const user = await new usersServices().deleteUser(req.body.user.id)
            /* return reponse */
            if (user.sucess)
                res.status(202).json(user)
            else 
                res.status(400).json(user)
            
        } catch (err) {
            console.log(new Date(), "deleteUser -- err:", err)
            res.status(422).send('Parameters error!');
        }
    } 

}

