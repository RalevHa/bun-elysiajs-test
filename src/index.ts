import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { noteRouter } from './routes/noteRoutes'; 
import { logger } from './utils/logger';

const apiVersion = process.env.API_VERSION || 'v1';

const noteSubRouter = new Elysia({prefix: `/${apiVersion}/notes`})
    .use(noteRouter);

const app = new Elysia()
    .use(swagger())
    .use(noteSubRouter)
    .listen(process.env.PORT || 3000);

logger.info(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

logger.info(`Swagger documentation is available at /swagger`);