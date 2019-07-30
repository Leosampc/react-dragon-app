import React from 'react';
import { Modal } from 'react-bootstrap'
import './styles.css';

const modalDragonHistory = (props) => {
    return (
        <Modal
            size="lg"
            show={props.show}
            onHide={() => props._toggleModal('modalDragonHistory', !props.show)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton closeLabel="Close">
                <Modal.Title id="example-modal-sizes-title-lg">
                    {props.dragon.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.dragon.histories}</p>
            </Modal.Body>
        </Modal>
    )
}

export default modalDragonHistory;
