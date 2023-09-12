import express from "express";
import mongoose, { Error } from "mongoose";
import { User } from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

const db_url = "mongodb://localhost:27017/angular-auth"

export class API {
    private routers: express.Router;


    constructor() {
        this.routers = express.Router();
        this.connect(db_url)
        this.hello();
        this.register();
        this.login();
        this.getEvents();
        this.getSpecialEvents();
    }

    getRouter() {
        return this.routers;
    }

    public async connect(db: string) {
        try {
            const dbConn = await mongoose.connect(db);
            if (dbConn) {
                console.log(`⚡️[server]: Connected to database`);
            }
        } catch (error) {
            console.log(`⚡️[server]: Failed to connect to database`);
            console.log(error);
        }
    }

    public async hello() {
        this.routers.get("/", (req, res) => {
            res.send("Hello World!");
        });
    }


    public async register() {
        this.routers.post("/register", (req, res) => {
            let { name, email, password, role } = req.body;
            let user = new User({ name, email, password, role });
            user.save().then((user) => {
                let payload = { subject: user._id };
                let token =jwt.sign(payload, "secretKey");
                res.status(200).json({token});
            }).catch((err: Error) => {
                res.status(500).json(err);
            })
        })
    }

    public async login() {
        this.routers.post("/login", (req, res) => {
            let userData = req.body;
            User.findOne({ email: userData.email }).then((user) => {
                try {
                    if (!user) {
                        res.status(401).json("Invalid email");
                    } else {
                        if (user.password !== userData.password) {
                            res.status(401).json("Invalid password");
                        } else {
                            let payload = { subject: user._id };
                            let token= jwt.sign(payload, "secretKey")
                            res.status(200).json({token});
                        }
                    }
                } catch (err: any) {
                    res.status(500).json(err);
                }
            })
        })
    }

    public async getEvents() {
        let events = [
            {
                "_id": "1",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "2",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "3",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "4",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "5",
                "name": "Auto Expo",
                "description": "lorem ipsum",

                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "6",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            }
        ]


        this.routers.get("/events", (req, res) => {
            res.json(events);
        })
    }

    public async getSpecialEvents() {
        let events = [
            {
                "_id": "1",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "2",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "3",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "4",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "5",
                "name": "Auto Expo",
                "description": "lorem ipsum",

                "date": "2021-01-01T00:00:00.000Z"
            },
            {
                "_id": "6",
                "name": "Auto Expo",
                "description": "lorem ipsum",
                "date": "2021-01-01T00:00:00.000Z"
            }
        ]


        this.routers.get("/special", this.verifyToken, (req, res) => {
            res.json(events);
        })
    }

    public async verifyToken(req: any, res: any, next: any) {
        if(!req.headers.authorization){
            return res.status(401).send("Unauthorized request")
        }
        let token = req.headers.authorization.split(" ")[1]
        if(token === "null"){
            return res.status(401).send("Unauthorized request")
        }
        let payload:JwtPayload= jwt.verify(token, "secretKey") as JwtPayload
        if(!payload){
            return res.status(401).send("Unauthorized request")
        }
        req.userId = payload.subject
        next()
    }



}