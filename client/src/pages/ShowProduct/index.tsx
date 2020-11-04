import React, {useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom'
import api from '../../services/api';

interface IProduct{
    id: number;
    name: string;
    price: number;
}

interface ParamTypes{
    id: string
}

const ShowProduct: React.FC = () => {


    const [show, setShow] = useState<boolean>(true);
    const {id}  = useParams<ParamTypes>();
    const history = useHistory();
    const handleClose = () => {
        setShow(false);
        history.goBack();
    }

    useEffect(() => {
        findProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const [model, setModel] = useState<IProduct>({
      id: 0,
      name:'',
      price:0
    })

    async function findProduct() {
        const response = await api.get(`/api/v1/products/${id}`)
        setModel({
            id: parseInt(id),
            name: response.data.name,
            price: response.data.price
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Name: {model.name}</p>
            <p>Price: {model.price}</p>
        </Modal.Body>

        </Modal>
    );
}

export default ShowProduct;