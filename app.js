const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const Prometheus = require('prom-client');

const specs = require('./src/libs/swagger');
const logger = require('./src/libs/logger');
const db = require('./src/database/db');
const routes = require('./src/routes/index.route');

dotenv.config(); // carregando variaveis de ambiente
const app = express();

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: [
    'ipOrigin',
    'method',
    'route',
    'statusCode',
    'httpVersion',
    'client',
    'contentLength',
    'responseTime',
  ],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500], // buckets for response time
});


// injetando middlewares
app.use(express.json());
app.use(helmet());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
});
app.use(morgan((tokens, req, res) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch;

  httpRequestDurationMicroseconds
    .labels(
      tokens['remote-addr'](req, res),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['http-version'](req, res),
      tokens['user-agent'](req, res),
      tokens.res(req, res, 'content-length'),
      tokens['response-time'](req, res),
    ).observe(responseTimeInMs);

  return [
    tokens['remote-addr'](req, res),
    tokens['user-agent'](req, res),
    tokens.date(req, res),
    'HTTP/', tokens['http-version'](req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
  ].join(' ');
}, {
  stream: {
    write: (message) => {
      logger.info(message);
    },
  },
}));
app.use(compression());
app.use((req, _res, next) => {
  delete req.body.id;
  next();
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});


// configurando variaveis do app
// faz com que o json que vai ser enviado nos endpoints seja formatado de forma amigavel
app.set('json spaces', 4);
app.set('port', process.env.PORT);
app.set('db', db());

// consting the routes
routes(app);


module.exports = app;
