# Node General App

## instalação/execução

Após clonar  repositório é necessário ter o node.js instalado em sua máquina e executar o seguinte comando para instalar as dependências projeto:

```javascript
npm install ou yarn install
```

ao finalizar a instalação das dependências do projeto criar um arquivo na raiz do projeto chamado .env com o seguinte conteúdo:

```
PORT=3000
```

e então executar o seguinte comando para iniciar a aplicação:

```javascript
npm start ou yarn start
```

depois acessar o endereço http://localhost:3000/api-docs para visualizar a documentação com swagger.

As métricas do prometheus estarão disponíveis no endereço http://localhost:3000/metrics

# Execução em Docker

modelo de dockerfile:

```
FROM node:slim

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN apt-get install -y build-essential

RUN apt-get install -y python

RUN npm install --production

CMD ["npm", "start"]
```

Além disso é necessário passar uma porta padrão para execução do app, através da variavel de ambiente PORT.

PS: estamos utilizando está imagem e instalando o pacote do python, porque alguns modulos do node precisam de ser pre buildadas usando um modulo chamado node-gyp, este módulo usa python 2.7 por trás e sem ele a aplicação não funciona.


