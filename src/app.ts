import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, router } from './trpc';
import { notesRouter } from './routes/notes.routes';

const app = express();

const appRouter = router({
  note: notesRouter,
});

app.use(cors());
app.use(morgan('dev'));

//trpc
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use('/', (req, res) => {
  res.json({ message: 'tRPC' });
});

export type AppRouter = typeof appRouter;

export default app;
