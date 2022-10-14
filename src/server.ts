import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import db from './database';
import routes from './routes';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
const app: express.Application = express();
const port = config.port;

app.use(bodyParser.json());
app.use(morgan('common'));

app.use('/api', routes);

app.use(errorMiddleware);
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'youre lost :D',
  });
});

app.listen(port, () => {
  console.log(`starting app on: ${port}`);
});

export default app;
