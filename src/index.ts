import colors from "colors";
import server from "./server";

const port = process.env.PORT || 4000 // Se le indica que use el puerto que te asigna el servidor o el 4000

//Escuchando desde el puerto 4000
server.listen(4000, () =>{
    console.log(colors.cyan.bold(`Rest API en el puerto ${port}`))
})