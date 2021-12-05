import express = require('express');
import { APILogger } from "./Logger/apiLogger";
import { UserController } from "./Controllers/UserController";
import { ProjectController } from "./Controllers/ProjectController";
import { ItemController } from "./Controllers/ItemController";
import * as swaggerUi from 'swagger-ui-express';
import fs = require('fs');
import cors from 'cors';

class App {

    public express: express.Application;
    public logger: APILogger;
    public userController: UserController;
    public projectController: ProjectController;
    public itemController: ItemController;

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
        this.projectController = new ProjectController();
        this.itemController = new ItemController();
    }

    // Configure Express middleware.
    private middleware(): void {
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: "GET, PUT, PATCH, POST, DELETE",
            origin: 'http://localhost:4200',
            preflightContinue: false,
        };

        this.express.use(cors(options));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {

        // User Routes
        this.express.get('/api/users', (req, res) => {
            this.userController.getUsers().then(data => res.json(data));
        });

        // Need to require both email and password field to be present to compare.
        this.express.get('/api/user/:email', (req, res) => {
            console.log(req.params);
            this.userController.getUserByEmail(req.params.email).then(data => res.json(data));
        });

        this.express.get('/api/login/:email/:password', (req, res) => {
            console.log(req.params);
            this.userController.userLogin(req.params.email, req.params.password).then(data => res.json(data));
        });
        
        this.express.post('/api/user', (req, res) => {
            console.log(req.body);
            this.userController.createUser(req.body.user).then(data => res.json(data));
        });
        
        this.express.put('/api/user', (req, res) => {
          console.log(req.body);
            this.userController.updateUser(req.body.user).then(data => res.json(data));
        });

        // Patch api is untested and needs to be debugged.
        this.express.patch('/api/user/:id', (req, res) => {
            console.log(req.body);
            this.userController.patchUser(req.body.user).then(data => res.json(data));
        });
        
        this.express.delete('/api/user/:id', (req, res) => {
            this.userController.deleteUser(req.params.id).then(data => res.json(data));
        });

        // Project Routes
        this.express.get('/api/projects', (req, res) => {
            this.projectController.getProjects().then(data => res.json(data));
        });
        
        this.express.get('/api/projects/:creatorId', (req, res) => {
            console.log(req.params);
            this.projectController.getProjectsByCreatorId(req.params.creatorId).then(data => res.json(data));
        });

        this.express.get('/api/project/:projectId', (req, res) => {
            console.log(req.params);
            this.projectController.getProjectByProjectId(req.params.projectId).then(data => res.json(data));
        });

        this.express.post('/api/project', (req, res) => {
            console.log(req.body);
            this.projectController.createProject(req.body.project).then(data => res.json(data));
        });
        
        this.express.put('/api/project', (req, res) => {
          console.log(req.body);
            this.projectController.updateProject(req.body.project).then(data => res.json(data));
        });
        
        this.express.delete('/api/project/:id', (req, res) => {
            this.projectController.deleteProject(req.params.id).then(data => res.json(data));
        });

        // Item Routes
        this.express.get('/api/items', (req, res) => {
            this.itemController.getItems().then(data => res.json(data));
        });

        this.express.get('/api/items/:projectId', (req, res) => {
            console.log(req.params);
            this.itemController.getItemsByProjectId(req.params.projectId).then(data => res.json(data));
        });
        
        this.express.post('/api/item', (req, res) => {
            console.log(req.body);
            this.itemController.createItem(req.body.item).then(data => res.json(data));
        });
        
        this.express.put('/api/item', (req, res) => {
          console.log(req.body);
            this.itemController.updateItem(req.body.item).then(data => res.json(data));
        });
        
        this.express.delete('/api/item/:id', (req, res) => {
            this.itemController.deleteItem(req.params.id).then(data => res.json(data));
        });

        
        // swagger docs
        // this.express.use('/api/docs', swaggerUi.serve,
        //    swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

        // handle undefined routes
        //

        // All non-api urls.
        this.express.use("*", (req, res, next) => {
            res.send("Are you sure you have the right url? Try again!");
        });
    }
}

export default new App().express;