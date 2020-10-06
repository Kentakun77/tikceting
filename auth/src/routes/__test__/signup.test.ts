import request from 'supertest';
import {app} from "../../app";

it('regresa 201 en un signup exitoso', async ()=> {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
});
it('regresa 400 con email invalido', async ()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test',
            password: 'password'
        })
        .expect(400)
});
it('regresa 400 con password invalido', async ()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1'
        })
        .expect(400)
});
it('regresa 400 con malas credenciales invalido', async ()=>{
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400)
});

it('rechaza email duplicado ', async ()=> {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});
it('fija una cookie despues de un signup exitoso ', async ()=> {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
}); 