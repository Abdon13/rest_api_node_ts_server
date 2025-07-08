// describe('Nuestro primer test', ()=>{
//     it('Debe revisar que 1 + 1 sean 2', ()=>{
//         expect( 1 + 1).toBe(2) //Que es lo que espera un error, respuesta, etc y toBe es el valor con el cual se va a comprar
//     })
//     it('Debe revisar que 1 + 1 no sean 3', ()=>{
//         expect( 1 + 1).not.toBe(3) //Que es lo que espera un error, respuesta, etc y toBe es el valor con el cual se va a comprar
//     })
// })

import request from "supertest"; //Envía una petición a determinado endpoint de nuestro proyecto
import server from "../server"; 

describe('GET /api', () => {
    it('should send back a json response', async ()=> { //La consulta es async por que no sabemos cuanto le puede demorar 
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        //Lo que no debe hacer
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})