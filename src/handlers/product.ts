import { Request, Response } from "express"
import Product from "../models/Product.model"

//Siempre se que interactúa con modelos las funciones deben de ser asincronas
//En lo que hace la consulta tarda un poco haciéndola async el código detiene su ejecución hasta 
//que se obtienen resultados
export const createProduct = async (req: Request, res: Response)=>{

    const product = await Product.create(req.body)//Esto crea el objeto instancia el nuevo producto y
    //  lo almacena en la bd

    res.json({data: product})//Retorna el producto que se ingreso a la base de datos

}