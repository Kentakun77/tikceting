import request from 'supertest';
import {app} from "../../app";

it('responde con detalles del usuario actual ', async ()=> {
    const cookie = await global.signin();
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responde null si no esta autentificado', async ()=> {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);
    expect(response.body.currentUser).toEqual(null);
});