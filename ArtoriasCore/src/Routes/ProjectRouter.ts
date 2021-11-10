import {Request, Response, NextFunction} from "express";
import { UserController } from "../Controllers/UserController";

export class UserRouter { 
    
    public userController: UserController = new UserController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // User 
        app.route('/user')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);            
            if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }                        
        }, this.userController.getUsers)        

        // POST endpoint
        .post(this.userController.addNewUser);

        // User detail
        app.route('/user/:userId')
        // get specific user
        .get(this.userController.getUserWithID)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)

    }
}