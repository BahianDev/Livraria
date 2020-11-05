import React, {ChangeEvent, useEffect, useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom'
import api from '../../services/api';

interface IProduct{
    id: number;
    name: string;
    price: number;
    stock: number;
}

interface ParamTypes{
    id: string
}

const EditProduct: React.FC = () => {


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
      price:0,
      stock: 0
    })

    async function findProduct() {
        const response = await api.get(`/api/v1/products/${id}`)
        setModel({
            id: parseInt(id),
            name: response.data.name,
            price: response.data.price,
            stock: response.data.stock
        })
    }

    function updateModel (e: ChangeEvent<HTMLInputElement>) {
      setModel({
          ...model,
          [e.target.name]: e.target.value
      })
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>){
      e.preventDefault()
      
      await api.put(`/api/v1/products/${id}`, model)
      setShow(false)
      history.goBack()
    }  
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" name="name" value={model.name} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}/>
              </Form.Group>

              <Form.Group controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="Price" name ="price" value={model.price} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}/>
              </Form.Group>
              <Button variant="dark" type="submit">
                Update
              </Button>
        </Form>
        </Modal.Body>

        </Modal>
    );
}

export default EditProduct;