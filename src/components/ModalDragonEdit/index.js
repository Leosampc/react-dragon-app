import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap'
import './styles.css';

const ModalDragonEdit = (props) => {
    return (
        <Modal
            size="lg"
            show={props.show}
            onHide={() => props._toggleModal('modalDragonEdit', !props.show)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton closeLabel="Close">
                <Modal.Title id="example-modal-sizes-title-lg">
                    {props.dragon.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome do dragão" value={props.dragon.name} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control as="select" value={props.dragon.type}>
                            <option value="ar">Ar</option>
                            <option value="agua">Agua</option>
                            <option value="gelo">Gelo</option>
                            <option value="fogo">Fogo</option>
                            <option value="terra">Terra</option>
                            <option value="trovao">Trovão</option>
                            <option value="veneno">Veneno</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>História</Form.Label>
                        <Form.Control as="textarea" rows="3" value={props.dragon.histories} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="custom-card-footer">Deletar</Button>
                <Button variant="custom-btn-modal">Atualizar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDragonEdit;
