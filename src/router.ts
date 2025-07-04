import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updatedProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

//Routing 
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,//Se reutiliza el middleware de errores
    getProductsById)//Se utiliza el router dinámico de express donde la url es dinámica
//Inyecta el valor en esa parte de la URL se habilita colocando esos dos puntos : y la puedes nombrar como gustes se recomienda id

router.post('/', 
    //Siempre se debe usar await y Le pasas como string el nombre del campo que quieras validar
    body('name')
            .notEmpty()
            .withMessage('El nombre del Producto no puede ir vació'),
            //run req recupera lo que se ha enviado al servidor 
            
    body('price').isNumeric().withMessage('Valor NO valido')
            .notEmpty().withMessage('El precio del Producto no puede ir vació')
            .custom(value => value > 0 ).withMessage('Precio no válido'),
    
    handleInputErrors, //Función intermedia que se ejecuta entre cada request de tipo HTTP 
    createProduct
)

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    body('name')
            .notEmpty()
            .withMessage('El nombre del Producto no puede ir vació'),
            //run req recupera lo que se ha enviado al servidor 
            
    body('price').isNumeric().withMessage('Valor NO valido')
            .notEmpty().withMessage('El precio del Producto no puede ir vació')
            .custom(value => value > 0 ).withMessage('Precio no válido'),
    body('availability')
            .isBoolean().withMessage('El valor de disponibilidad no válido'),
    handleInputErrors,
    updatedProduct )

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)
    
export default router