/* eslint-disable no-undef */
const request = require('supertest');

const baseURL = 'http://localhost:3606';

describe('POST /account', () => {
  it('should create the account with all fields', async () => {
    const data = {
      name: 'Michael',
      username: 'Michael',
      email: '1@1.com',
      password: '1',
    };
    const response = await request(baseURL).post('/account').send(data);
    expect(response.statusCode).toBe(201);
    expect(response.body.data.name).toEqual(data.name);
    expect(response.body.data.user.username).toEqual(data.username);
    expect(response.body.data.user.email).toEqual(data.email);
  });

  it('should create the account with the required properties: name, email and password', async () => {
    const data = {
      name: 'Michael',
      email: '1@1.com',
      password: '1',
    };
    const response = await request(baseURL).post('/account').send(data);
    expect(response.statusCode).toBe(201);
    expect(response.body.data.name).toEqual(data.name);
    expect(response.body.data.user.email).toEqual(data.email);
  });

  it('should return an error when try to create account without the name', async () => {
    const data = {
      username: 'Michael',
      email: '1@1.com',
      password: '1',
    };
    const response = await request(baseURL).post('/account').send(data);
    expect(response.statusCode).toBe(400);
  });

  it('should return an error when try to create account without the email', async () => {
    const data = {
      name: 'Michael',
      username: 'Michael',
      password: '1',
    };
    const response = await request(baseURL).post('/account').send(data);
    expect(response.statusCode).toBe(400);
  });

  it('should return an error when try to create account without the password', async () => {
    const data = {
      name: 'Michael',
      username: 'Michael',
      email: '1@1.com',
    };
    const response = await request(baseURL).post('/account').send(data);
    expect(response.statusCode).toBe(400);
  });
});
