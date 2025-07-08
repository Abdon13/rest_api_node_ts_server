import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true})//Elimina todos los datos de la bd
        console.log('Datos eliminados correctamente')
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === '--clear'){//Se ejecuta tras desde el comnadline de nodejs 2 seria la posición
    clearDB()
}