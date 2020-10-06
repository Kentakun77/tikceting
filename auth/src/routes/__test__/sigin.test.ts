import request from 'supertest';
import {app} from "../../app";

it('falla cuando no encuentra un email registrado', async ()=> {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
});

it('falla cuando se pasa un password incorrecto ', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password1'
        })
        .expect(400);
});
it('responde con una cookie cuando se llena correctamente ', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
    console.log(response.get('Set-Cookie'));
});