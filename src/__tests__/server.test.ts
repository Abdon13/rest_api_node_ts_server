// describe('Nuestro primer test', ()=>{
//     it('Debe revisar que 1 + 1 sean 2', ()=>{
//         expect( 1 + 1).toBe(2) //Que es lo que espera un error, respuesta, etc y toBe es el valor con el cual se va a comprar
//     })
//     it('Debe revisar que 1 + 1 no sean 3', ()=>{
//         expect( 1 + 1).not.toBe(3) //Que es lo que espera un error, respuesta, etc y toBe es el valor con el cual se va a comprar
//     })
// })

import { connectDB } from "../server";
import db from "../config/db";

//Forzando el error de la linea 15 de server.ts
jest.mock('../config/db')
describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})