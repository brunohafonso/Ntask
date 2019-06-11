import express from 'express';
import morgan from 'morgan';
import consign from 'consign';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';

import specs from './src/libs/swagger';

dotenv.config(); // carregando variaveis de ambiente
const app = express();

// injetando middlewares
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan(':remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] :response-time ms - :user-agent'),
);
app.use((req, _res, next) => {
  delete req.body.id;
  next();
});

// configurando variaveis do app
// faz com que o json que vai ser enviado nos endpoints seja formatado de forma amigavel
app.set('json spaces', 4);
app.set('port', process.env.PORT);

// injetando os demais módulos do projeto
consign({ cwd: 'src', verbose: false })
  .include('config')
  .then('database')
  .then('routes')
  .then('libs')
  .into(app);

module.exports = app;
