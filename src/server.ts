import express from "express";
import router from "./router";
import path from "path";
import db from "./config/db";
import colors from "colors";
import SwaggerUi from "swagger-ui-express";
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
//Instalamos la dependencia de colors para cambiar el color de los mensajes de la terminal 

//Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate() //Esperar a que se realice la conexión autentificando con .authenticate
        db.sync() //En caso de crear nuevos modelos o columnas las ira agregando
        //console.log(colors.blue('Conexión exitosa a la BD'))
    } catch (error) {
        //console.log(error)
        console.log(colors.bgRed.white("Hubo un error al conectar a la BD"))
        
    }
    
}

connectDB() //Se manda llamar la función

//Instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())//Habilita la lectura de los json

server.use('/api/products', router)

//Docs
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions))
server.use('/public', express.static(path.join(__dirname, '../public')))

export default server