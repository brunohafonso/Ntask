# Ntask

Projeto de estudos de nodeJs, sequelize e express com sqlite, utilizando as melhores práticas para organização e construção da aplicação, testes automatizados para validação das funcionalidades e eslint para validação da escrita do código.

## funcionalidades da aplicação

Basicamente a aplicação tem a possibilidade de criação e autenticação de usuários via token (JWT) passado via header, e um usuário logado tem a possibilidade de criar tasks e alterar o status dela para done, utilizei o sqlite para persistência de dados, o sequelize como ORM o express como framework para montar o sevidor, swagger para documentação dos endpoints e o mocha, chai, supertest para realizar os testes de integração de forma automatizada, para válidar a escrita do código utilizei o ESLINT que realiza a correção de alguns pontos do código e me mostra onde é necessário refatorar ou adaptar para seguir as melhores práticas de escrita, a seguir vou descrever algumas caracteristicas do projeto e mostrar como testar o mesmo em sua máquina.

## organização do projeto




## instalação

Após clonar  repositório é necessário ter o node.js instalado em sua máquina e executar o seguinte comando para instalar as dependências projeto:

```javascript
npm install ou yarn install
```


