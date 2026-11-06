import Fastify from 'fastify';
import userRoute from './routes/user.route';
import fastifyJwt from '@fastify/jwt';
import { authRouter } from './routes/auth.route';
import { serializerCompiler,validatorCompiler,jsonSchemaTransform } from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const PORT = 5000;
//creating fastify server instance
const server = Fastify();
//when ever we create a server we should write a health check router

//zod validation for knowing zod
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler)

//swagger configuration
server.register(fastifySwagger,{
   openapi: {
    info: {
      title: "User API",
      description: "Fastify API with Zod validation and Prisma",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,

})

server.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
});

server.get('/health',async()=>{
    return {status:'ok'}
})

server.register(fastifyJwt,{
    secret:"hello"
});


async function startServer(){

    //registering a route
    server.register(userRoute,{prefix:'api/user'});
    server.register(authRouter,{prefix:'api/user/auth'})
    
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