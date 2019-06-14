# Ntask

Projeto de estudos de nodeJs, criação de uma API rest com sequelize, express e sqlite, utilizando as melhores práticas para organização e construção da aplicação, testes automatizados para validação das funcionalidades e eslint para validação da escrita do código.

## funcionalidades da aplicação

- **Usuário**
  - criar usuário
  - listar todos os usuários
  - buscar usuário por Id
  - deletar usuário por Id
  - atualizar usuário por Id
  - autenticação via JWT

- **Task**
  - criar Task
  - listar todas as Task
  - buscar Task por Id
  - deletar Task por Id
  - atualizar Task por Id
  - 
## organização do projeto

Utilizei a arquitetura MRSC (model routes services controllers):

**model** - arquivos responsáveis pelo mapeamento dos objetos (entidades) do baco de dados, utilizei o sequelize que cria o banco de dados com base nessas models.

**routes** - arquivos responsáveis pelas rotas do projeto, ou seja, os endpoints da API.

**services** - arquivos responsáveis por fazer as queries no banco de dados.

**controllers** - arquivos responsáveis por retornar os dados e status code quando a API receber as requisições nas rotas definidas.

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

depois acessar o endereço http://localhost:3000/api-docs para visualizar a documentação com swagger


