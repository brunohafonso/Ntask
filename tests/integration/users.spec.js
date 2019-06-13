import supertest from 'supertest';
import { expect } from 'chai';
import { generateToken } from '../../src/libs/token';
import app from '../../app';


const request = supertest(app);
const Users = app.get('db').models.Users;
let token;

describe('POST /login', () => {
  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(async () => {
        await Users.create({
          name: 'brunohafonso',
          email: 'brunohafonso@gmail.com',
          password: '123456',
        });
        done();
      });
  });

  after((done) => {
    Users.destroy({ where: {} })
      .then(() => done());
  });

  it(`status 200 correct credentials - 
    should return the token of authenticated user`, (done) => {
    request.post('/login')
      .send({
        email: 'brunohafonso@gmail.com',
        password: '123456',
      })
      .expect(200)
      .end((error, response) => {
        expect(response.body).to.include.keys('token');
        done(error);
      });
  });

  it(`status 400 empty credentials - 
    should return error message when the email or password is blank`, (done) => {
    request.post('/login')
      .send({
        email: '',
        password: '',
      })
      .expect(400)
      .end((error, response) => {
        expect(response.body).to.include.keys('message');
        expect(response.body.message).to.be.equal('You need to inform the credentials correctly');
        done(error);
      });
  });

  it(`status 200 wrong password - 
  should return error message when the password is wrong`, (done) => {
    request.post('/login')
      .send({
        email: 'brunohafonso@gmail.com',
        password: '12',
      })
      .expect(200)
      .end((error, response) => {
        expect(response.body).to.include.keys('message');
        expect(response.body.message).to.be.equal('User or password incorrect');
        done(error);
      });
  });

  it(`status 404 credentials that does not exist - 
    should return error when the email informed does not exist`, (done) => {
    request.post('/login')
      .send({
        email: 'brunohafonso@gmai.com',
        password: '12',
      })
      .expect(404)
      .end((error, response) => {
        expect(response.body).to.include.keys('message');
        expect(response.body.message).to.be.equal('user not found');
        done(error);
      });
  });
});

describe('POST /users', () => {
  after((done) => {
    Users.destroy({ where: {} })
      .then(() => done());
  });

  it(`status 201 correct user data - 
  should return the user inserted on db`, (done) => {
    request.post('/users')
      .send({
        name: 'bruno h afonso',
        email: 'brunohafonso@gmail.com',
        password: '123456',
      })
      .expect(201)
      .end((error, response) => {
        expect(response.body).to.include.keys('user');
        done(error);
      });
  });

  it(`status 412 wrong user data - 
  should return an error message`, (done) => {
    request.post('/users')
      .send({
        name: '',
        email: '',
        password: '',
      })
      .expect(412)
      .end((error, response) => {
        expect(response.body).to.include.keys('message');
        expect(response.body.message).to.contains('Error to create user');
        done(error);
      });
  });

  it(`status 412 invalid email - 
  should return an error message`, (done) => {
    request.post('/users')
      .send({
        name: '',
        email: 'brunohafonso.gmail.com',
        password: '',
      })
      .expect(412)
      .end((error, response) => {
        expect(response.body).to.include.keys('message');
        expect(response.body.message).to.contains('The email you entered is invalid or is already in our system');
        done(error);
      });
  });
});

describe('GET /user', () => {
  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(async () => {
        const user = await Users.create({
          name: 'brunohafonso',
          email: 'brunohafonso@gmail.com',
          password: '123456',
        });
        token = await generateToken({ id: user.id, email: user.email });
        done();
      });
  });

  it('status 200 - should return an authenticated user', (done) => {
    request.get('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, response) => {
        expect(response.body).to.include.keys('user');
        expect(response.body.user.name).to.be.equal('brunohafonso');
        done(err);
      });
  });
});

describe('DELETE /user', () => {
  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(async () => {
        const user = await Users.create({
          name: 'brunohafonso',
          email: 'brunohafonso@gmail.com',
          password: '123456',
        });
        token = await generateToken({ id: user.id, email: user.email });
        done();
      });
  });

  it('status 204 - should return nothing', (done) => {
    request.delete('/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
      .end(err => done(err));
  });
});

describe('PUT /user', () => {
  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(async () => {
        const user = await Users.create({
          name: 'brunohafonso',
          email: 'brunohafonso@gmail.com',
          password: '123456',
        });
        token = await generateToken({ id: user.id, email: user.email });
        done();
      });
  });

  it('status 204 - should return nothing', (done) => {
    request.put('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'brunoafonso',
        email: 'brunohafonso@yahoo.com',
        password: '123456',
      })
      .expect(204)
      .end(err => done(err));
  });
});
