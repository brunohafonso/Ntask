import supertest from 'supertest';
import { expect } from 'chai';
import { generateToken } from '../../src/libs/token';
import app from '../../app';


const request = supertest(app);
const Users = app.database.db.models.Users;
const Tasks = app.database.db.models.Tasks;
let token;
let fakeTest;


describe('GET: /tasks', () => {
  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(async () => {
        const [user] = await Promise.all([Users.create({
          name: 'bruno h afonso',
          email: 'brunohafonso@gmail.com',
          password: '123456',
        }),
        Tasks.destroy({ where: {} })]);
        Tasks.bulkCreate([{
          id: 1,
          title: 'work',
          user_id: user.id,
        }, {
          id: 2,
          title: 'study',
          user_id: user.id,
        }]).then(async (tasks) => {
          fakeTest = tasks[0];
          token = await generateToken({ id: user.id, email: user.email });
          done();
        });
      });
  });

  it(`status 200 - 
  should return a list with two tasks`, (done) => {
    request.get('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, response) => {
        expect(response.body.tasks).have.length(2);
        expect(response.body.tasks[0].title).to.be.equal('work');
        expect(response.body.tasks[1].title).to.be.equal('study');
        done(err);
      });
  });

  it(`status 401 - 
  when user is not authenticated`, (done) => {
    request.get('/tasks')
      .expect(401)
      .end(err => done(err));
  });
});

describe('GET: /tasks/:id', () => {
  it('status 200 - should return a task', (done) => {
    request.get(`/tasks/${fakeTest.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, response) => {
        expect(response.body.task.title).to.be.equal('work');
        done(err);
      });
  });

  it('status 404 - should return a message of not found', (done) => {
    request.get('/tasks/0')
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .end((err, response) => {
        expect(response.body).to.include.keys('message');
        expect(response.body.message).to.be.equal('task not found');
        done(err);
      });
  });
});

describe('PUT: /tasks/:id', () => {
  it('status 204 - should return nothing', (done) => {
    request.put(`/tasks/${fakeTest.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'travel',
        done: true,
      })
      .expect(204)
      .end(err => done(err));
  });
});

describe('DELETE: /tasks/:id', () => {
  it('status 204 - should return the status 204', (done) => {
    request.delete(`/tasks/${fakeTest.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
      .end(err => done(err));
  });

  it(`status 401 - 
  when user is not authenticated`, (done) => {
    request.get('/tasks')
      .expect(401)
      .end(err => done(err));
  });
});
