import { Router } from 'express';
import {productController} from '../controllers/products';

const productRouter = Router();

productRouter.post('/', productController.insertProduct);
productRouter.get('/', productController.listProduct);
productRouter.get('/:id', productController.getProduct);
productRouter.delete('/:id', productController.deleteProduct);
productRouter.put('/:id', productController.updateProduct);

export {
    productRouter
}
