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
                    Nome do dragão
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome do dragão" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control as="select">
                            <option value="air">Ar</option>
                            <option value="water">Agua</option>
                            <option value="ice">Gelo</option>
                            <option value="fire">Fogo</option>
                            <option value="ground">Terra</option>
                            <option value="thunder">Trovão</option>
                            <option value="poison">Veneno</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>História</Form.Label>
                        <Form.Control as="textarea" rows="3" />
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
