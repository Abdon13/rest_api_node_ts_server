import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response)=>{
    const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        res.json({data: products})

}
export const getProductsById = async (req: Request, res: Response)=>{
    const { id } = req.params //Se manda llamar como fue llamada en el router dinámico en este caso id

       const product = await Product.findByPk(id)//Busca por medio del id que se le paso a traves de la primary key de las columna 

       if(!product){
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
       }

       res.json({data: product}) //Manda llamar el json completo del id solicitado

}

//Siempre se que interactúa con modelos las funciones deben de ser asincronas
//En lo que hace la consulta tarda un poco haciéndola async el código detiene su ejecución hasta 
//que se obtienen resultados
export const createProduct = async (req: Request, res: Response)=>{  
    const product = await Product.create(req.body)//Esto crea el objeto instancia el nuevo producto y
        //  lo almacena en la bd
        res.status(201).json({data: product})//Retorna el producto que se ingreso a la base de datos

}

export const updatedProduct = async (req: Request, res: Response)=>{
    const { id } = req.params //Se manda llamar como fue llamada en el router dinámico en este caso id

       const product = await Product.findByPk(id)//Busca por medio del id que se le paso a traves de la primary key de las columna 

       if(!product){
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
       }
       //Actualizar
       await product.update(req.body)//para recuperar los datos para un post o put se usa req.body actualiza
       await product.save()//Se almacena en la base de datos
       res.json({data: product})
}

export const updateAvailability = async (req: Request, res: Response)=>{
    const { id } = req.params //Se manda llamar como fue llamada en el router dinámico en este caso id

       const product = await Product.findByPk(id)//Busca por medio del id que se le paso a traves de la primary key de las columna 

       if(!product){
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
       }
       //Actualizar
      product.availability = !product.dataValues.availability // Accedes al data value de disponibilidad y lo cambia al valor contrario !
       await product.save()//Se almacena en la base de datos
       res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response)=>{
    const { id } = req.params //Se manda llamar como fue llamada en el router dinámico en este caso id

       const product = await Product.findByPk(id)//Busca por medio del id que se le paso a traves de la primary key de las columna 

       if(!product){
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
       }

     await product.destroy() //Destroy elimina de la base de datos el producto seleccionado
     //En algunos proyectos no se pueden eliminar los datos
     //Se recomienda usar un eliminado lógico para eso casos
     res.json({data:'Producto eliminado'})
}