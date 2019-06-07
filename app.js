import express from 'express';
import morgan from 'morgan';
import consign from 'consign';
import * as dotenv from 'dotenv';

dotenv.config(); // carragando variaveis de ambiente
const app = express();

// injetando middlewares
app.use(express.json());
app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' ')));

// configurando variaveis do app
// faz com que o json que vai ser enviado nos endpoints seja formatado de forma amigavel
app.set('json spaces', 4);
app.set('port', process.env.PORT);

// injetando os demais módulos do projeto
consign({ cwd: 'src' })
  .include('database')
  .then('models')
  .then('routes')
  .then('libs')
  .into(app);

module.exports = app;
