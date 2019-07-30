import React from 'react';
import { Card, Button } from 'react-bootstrap'
import './styles.css';

const CardDragon = (props) => {
    const { dragon } = props
    return (
      <Card md className="cardComponent p-3" >
      <Card.Header className="cardHeader">
          <Card.Title>{dragon.name}</Card.Title>
      </Card.Header>
      <Card.Body className="cardBody">
          <Card.Title>{dragon.type}</Card.Title>
          <Card.Text>
              {dragon.histories.slice(0, 60)}
              <p 
                  className="pReadingMore" 
                  href="#"
                  onClick={() => props._toggleDragonHistoryModal(dragon) } 
              >
              {dragon.histories.length > 60 ? `...ler mais` : ``}
              </p>
          </Card.Text>
          <Card.Text className="cardTextFooter">
              <small className="">Data de Cadastro: 01/08/2019</small>
          </Card.Text>
      </Card.Body>
      <Card.Footer className="cardFooter">
          <Button 
            variant="custom-card-footer" 
            onClick={() => props._toggleDragonEditModal(dragon) }
          >
            Alterar
          </Button>
      </Card.Footer>
  </Card>
    )
}

export default CardDragon;
