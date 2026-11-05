import Fastify from 'fastify';
import userRoute from './routes/user.route';
import fastifyJwt from '@fastify/jwt';
import type{ FastifyRequest,FastifyReply } from 'fastify';

const PORT = 5000;
//creating fastify server instance
const server = Fastify();
//when ever we create a server we should write a health check router

server.get('/health',async()=>{
    return {status:'ok'}
})

server.register(fastifyJwt,{
    secret:"hello"
});

// server.decorate("authencate",async(request:FastifyRequest,reply:FastifyReply)=>{
//  try{
//     await request.jwtVerify()
//  }
//  catch(err){
//     console.log(err);
//     return reply.code(500).send(err)
//  }
// })

async function startServer(){

    //registering a route
    server.register(userRoute,{prefix:'api/user'});
    //register a fastify jwt
    
    try{
        await server.listen({port: PORT},()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }

}

startServer();