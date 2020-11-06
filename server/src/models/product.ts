import { dbQuery, dbQueryFirst } from "../services/db"


export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
}

const insertProduct = async(product: Product) => {
    await dbQuery(`INSERT INTO product (name, price, stock) VALUES(?, ?, ?)`, [product.name, product.price, product.stock])
    let final = await dbQuery(`SELECT seq AS Id from sqlite_sequence WHERE name = 'product'`);
    return getProduct(final[0].Id);
}

const updateProduct = async(product: Product) => {
    await dbQuery(`UPDATE product SET name = ?, price = ?, stock = ? WHERE id = ?`, [product.name, product.price, product.stock,  product.id])
    return getProduct(product.id); 
}

const listProduct = async() =>{
    const final = await dbQuery(`SELECT * FROM product`);
    return final as Product[];
} 

const getProduct = async(id: number) =>{
    const final = await dbQueryFirst(`SELECT * FROM product WHERE id = ?`, [id]);
    return final as Product
} 

const deleteProduct = async(id: number) =>{
     await dbQueryFirst(`DELETE FROM product WHERE id = ?`, [id]);
} 

const dropDatabase = async() => {
    await dbQuery("DELETE FROM product")
}


export const productModel = {
    insertProduct,
    listProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    dropDatabase
}