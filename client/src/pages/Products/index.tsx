import React, {useState, useEffect} from 'react';
import { Button, Table } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import ModalInsert from '../InsertProduct';

import './index.css'

interface IProduct {
    id: number;
    name: string;
    price: number
}

const Products: React.FC = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const history = useHistory();

    useEffect(() => {
        loadProducts()
    }, [products])

    async function loadProducts(){
        const response = await api.get("/api/v1/products");
        setProducts(response.data)
    }

    async function deleteProduct(id: number) {
        await api.delete(`/api/v1/products/${id}`)
    }

    function editProduct(id: number){
        history.push(`/edit/${id}`)
    }

    function showProduct(id: number){
        history.push(`show/${id}`)
    }



    return(
        <div className="container">
            <br/>
            <div className="product-header">
                <h1>Products</h1>
                <ModalInsert/>
            </div>
            <br/>
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>R$ {product.price}</td>
                            <td>
                                <Button size="sm" onClick={() => editProduct(product.id)}>Edit</Button> {' '}
                                <Button size="sm" variant="info" onClick={() => showProduct(product.id)}>Show</Button> {' '}
                                <Button size="sm" variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button> {' '}
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Products