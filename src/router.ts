import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updatedProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                       type: string
 *                       description: The Product name
 *                       example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                       type: number
 *                       description: The Product price
 *                       example: 300
 *                  availability:
 *                       type: boolean
 *                       description: The Product availability
 *                       example: true
 * 
 */

/**
 * @swagger
 * /api/products/:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

//Routing 
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a products by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the products to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request - Invalid ID
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,//Se reutiliza el middleware de errores
    getProductsById)//Se utiliza el router dinámico de express donde la url es dinámica
//Inyecta el valor en esa parte de la URL se habilita colocando esos dos puntos : y la puedes nombrar como gustes se recomienda id

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the products to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:           
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not Found
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *           summary: Update Product availability
 *           tags:
 *               - Products
 *           description: Returns the updated availability
 *           parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the products to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *           responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'         
 *              400:
 *                  description: Bad Request - Invalid ID  
 *              404:
 *                  description: Product Not Found                     
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product by a given ID
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the products to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              vale: 'Producto Eliminado'        
 *              400:
 *                  description: Bad Request - Invalid ID  
 *              404:
 *                  description: Product Not Found
 */

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)
    
export default router