import React, {ChangeEvent, useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import api from '../../services/api';

interface IProduct{
  name: string;
  price: number;
}

const InsertProduct: React.FC = () => {

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [model, setModel] = useState<IProduct>({
      name:'',
      price:0
    })

    function updateModel (e: ChangeEvent<HTMLInputElement>) {
      setModel({
          ...model,
          [e.target.name]: e.target.value
      })
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>){
      e.preventDefault()
      
      await api.post('/api/v1/products', model)
      setShow(false)
    }
  
    return (
      <>
        <Button variant="dark" onClick={handleShow}>
          Insert
        </Button>
  
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Insert Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" name="name" onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}/>
              </Form.Group>

              <Form.Group controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="Price" name ="price" onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}/>
              </Form.Group>
              <Button variant="dark" type="submit">
                Insert
              </Button>
        </Form>
        </Modal.Body>

        </Modal>
      </>
    );
}

export default InsertProduct;