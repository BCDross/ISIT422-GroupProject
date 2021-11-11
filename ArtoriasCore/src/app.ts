import express = require('express');
import { APILogger } from "./Logger/apiLogger";
import { UserController } from "./Controllers/UserController";
import * as swaggerUi from 'swagger-ui-express';
import fs = require('fs');

class App {

    public express: express.Application;
    public logger: APILogger;
    public userController: UserController;

    /* Swagger files start */
    private swaggerFile: any = (process.cwd()+"/src/Swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd()+"/src/Swagger/swagger.css"), 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.userController = new UserController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get('/api/users', (req, res) => {
            this.userController.getUsers().then(data => res.json(data));
        });
        
        this.express.post('/api/user', (req, res) => {
            console.log(req.body);
            this.userController.createUser(req.body.user).then(data => res.json(data));
        });
        
        this.express.put('/api/user', (req, res) => {
          console.log(req.body);
            this.userController.updateUser(req.body.user).then(data => res.json(data));
        });
        
        this.express.delete('/api/user/:id', (req, res) => {
            this.userController.deleteUser(req.params.id).then(data => res.json(data));
        });

        this.express.get("/", (req, res, next) => {
            res.send("You have reached ArtoriasCore. Did you mean to come here?");
        });

        // swagger docs
        // this.express.use('/api/docs', swaggerUi.serve,
        //    swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Are you sure you have the right url? Try again!");
        });
    }
}

export default new App().express;