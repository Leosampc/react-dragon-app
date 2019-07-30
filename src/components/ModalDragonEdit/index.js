import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap'
import './styles.css';

const ModalDragonEdit = (props) => {
    const { id, name, type, histories } = props.dragon
    return (
        <Modal
            size="lg"
            show={props.show}
            onHide={() => props._toggleModal('modalDragonEdit', !props.show)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton closeLabel="Close">
                <Modal.Title id="example-modal-sizes-title-lg">
                    {name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={props._updateDragon}>
                    <input type="hidden" name="id" defaultValue={id} />
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Nome do dragão" defaultValue={name} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control as="select" name="type" defaultValue={type}>
                            <option value="Ar">Ar</option>
                            <option value="Agua">Agua</option>
                            <option value="Gelo">Gelo</option>
                            <option value="Fogo">Fogo</option>
                            <option value="Terra">Terra</option>
                            <option value="Trovao">Trovão</option>
                            <option value="Veneno">Veneno</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>História</Form.Label>
                        <Form.Control name="histories" as="textarea" rows="3" defaultValue={histories} />
                    </Form.Group>
                    <Button type="submit" variant="custom-btn-modal">Atualizar</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="custom-card-footer"
                    onClick={() => props._deleteDragon(props.dragon.id)}
                >
                    Deletar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDragonEdit;
