import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!,{
    models:[__dirname + '/../models/**/*'],//Dirname nos retorna la ubicación del archivo que lo esta mandando llamar
    logging:false // se agrega logging para que no mande nada a la consola 
})//Se le tienen que agregar los decoradores en el tsconfig.json
//SE definen los modelos después de la URL para generar las columnas
//Se crea variable para la url de Render
// A la url se le agrega ?ssl=true para forzar la conexión
// Se instala la librería dotenv para ocultar el URL 
export default db

