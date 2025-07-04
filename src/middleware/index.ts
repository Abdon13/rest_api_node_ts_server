import { Request, Response, NextFunction } from "express"
import {validationResult} from 'express-validator'

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req)//Se le pasa validation con un request para validar los datos que se le han pasado 
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})//Se le pasan los errores
       return 
    }

    next()//Función dinámica para que se vaya al siguiente middleware
}//Middleware para errores