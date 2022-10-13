import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import db from './database';
import client from './database';
import routes from './routes';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
const app: express.Application = express();
const port = config.port;

app.use(bodyParser.json());
//app.use(express.json());
app.use(morgan('common'));
app.get('/', (req: Request, res: Response) => {
  throw new Error('Eror');
  res.send('Hello World!');
});

db.connect().then((client) => {
  return client
    .query('SELECT NOw()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});
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
