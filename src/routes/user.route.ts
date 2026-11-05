import {type FastifyInstance } from "fastify";
import { UserRegisterController } from "../controllers/user.controller";

export default async function userRoute(server:FastifyInstance){
    server.post('/register',UserRegisterController.userRegisterHandler);
    server.post('/login',UserRegisterController.userLogin)
}