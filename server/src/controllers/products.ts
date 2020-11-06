import {Request, Response} from 'express';
import {badRequest, internalServerError, notFouund, ok, validateNumber} from '../services/utils';
import {Product, productModel} from '../models/product';

const insertProduct = (req: Request, res: Response) => {

    {
        const product = req.body;
        if (!product)
            return badRequest(res, "Produto inválido");

        if (!product.name)
            return badRequest(res, 'Informe o nome do produto');

        if (!validateNumber(product.price))
            return badRequest(res, 'Informe o preço');
        
        if (!validateNumber(product.stock))
            return badRequest(res, 'Informe a quantidade');
    }

    const product = req.body as Product;
    return productModel.insertProduct(product)
        .then(product => {
            res.json(product);
        })
        .catch(err => internalServerError(res, err));
}

const updateProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido")

        const product = req.body;
        if (!product)
            return badRequest(res, "Produto inválido");

        if (!product.name)
            return badRequest(res, 'Informe o nome do produto');

        if (!validateNumber(product.price))
            return badRequest(res, 'Informe o preço');
        
        const productSaved = await productModel.getProduct(id);
        if(!productSaved)
            return notFouund(res); 
    }

    const product = req.body as Product;
    return productModel.updateProduct(product)
        .then(product => {
            res.json(product);
        })
        .catch(err => internalServerError(res, err));
}


const sellProduct = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido")
        
        const productSaved = await productModel.getProduct(id);
        if(!productSaved)
            return notFouund(res); 
    }

    const product  = await productModel.getProduct(id) as Product;
    product.stock -= 1 ;

    if(product.stock >= 0){
        return productModel.updateProduct(product)
        .then(product => {
            res.json(product);
        })
        .catch(err => internalServerError(res, err));
    }
}


const listProduct = ({}: Request, res: Response) => {
    productModel.listProduct()
    .then(products => {
        res.json(products)
    })
    .catch(err => internalServerError(res, err));

    //res.status(200)
}

const getProduct = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido")
    }

   return productModel.getProduct(id)
    .then((product) => {
        if(product)
            return res.json(product)
        else 
            return notFouund(res);
    })
    .catch(err => internalServerError(res, err));
}


const deleteProduct = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido")
        
        const productSaved = await productModel.getProduct(id);
        if(!productSaved)
            return notFouund(res); 
    }

    return  productModel.deleteProduct(id)
    .then(() => ok(res))
    .catch(err => internalServerError(res, err));
}




export const productController = {
    insertProduct,
    listProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    sellProduct
}