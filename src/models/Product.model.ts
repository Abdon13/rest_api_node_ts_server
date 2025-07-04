import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

//Decorador de Table siempre inician con @ se le pasa un objeto con sus opciones 
@Table({
    tableName: 'products'
})

//Clase model escribe y define tus modelos extends para heredar
class Product extends Model{
    @Column({
        type: DataType.STRING(100)//Se le agrega el tipo de dato que llevara la columna
    })
    name: string

    @Column({
        type: DataType.FLOAT(5, 2)
    })
    price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Product