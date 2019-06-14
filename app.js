import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import specs from './src/libs/swagger';
import logger from './src/libs/logger';
import db from './src/database/db';
import routes from './src/routes/index.route';

dotenv.config(); // carregando variaveis de ambiente
const app = express();

// injetando middlewares
app.use(express.json());
app.use(helmet());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors({
  origin: ['http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan(':remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] :response-time ms - :user-agent', {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  }),
);
app.use(compression());
app.use((req, _res, next) => {
  delete req.body.id;
  next();
});

// configurando variaveis do app
// faz com que o json que vai ser enviado nos endpoints seja formatado de forma amigavel
app.set('json spaces', 4);
app.set('port', process.env.PORT);
app.set('db', db());

// importing the routes
routes(app);


module.exports = app;
