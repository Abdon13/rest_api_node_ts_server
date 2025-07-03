import server from "./server";

//Escuchando desde el puerto 4000
server.listen(4000, () =>{
    console.log("Rest API en el puerto 4000")
})