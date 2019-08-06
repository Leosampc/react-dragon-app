import React from 'react';
import { Card, Button } from 'react-bootstrap'
import './styles.css';

function formatDate(timestamp) { //funcao para transformar o timestamp em data e retornar na formatação correta
    const DateObject = new Date(timestamp) //cria um objeto Date com o timestamp recebido
    let correctMonth = DateObject.getUTCMonth() + 1 //meses vão de 0-11, então conforme o mes resgatado soma +1 no valor
    
    correctMonth = (parseInt(correctMonth) < 10) ? "0" + correctMonth : correctMonth //adiciona um 0 à frente da string do mês caso o mesmo seja menor que 10
    
    return `${DateObject.getUTCDate()}/${correctMonth}/${DateObject.getUTCFullYear()}` //cria a string com a data correta, formato: dd/mm/YYYY
}

const CardDragon = (props) => {
    const { dragon } = props
    const createdAt = formatDate(dragon.createdAt)
    
    return (
        <Card className="cardComponent p-3" >
            <Card.Header className="cardHeader">
                <Card.Title>{dragon.name}</Card.Title>
            </Card.Header>
            <Card.Body className="cardBody">
                <Card.Title>{dragon.type}</Card.Title>
                <Card.Text>
                    {dragon.histories.slice(0, 60)}
                </Card.Text>
                
                <p className="pReadingMore" href="#" onClick={() => props._toggleDragonModal(dragon, "modalDragonHistory")} >
                        {dragon.histories.length > 60 ? `...ler mais` : ``}
                    </p>
                
                <Card.Text className="cardTextFooter">
                    <small className="">cadastrado em: {createdAt}</small>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="cardFooter">
                <Button 
                    variant="custom-btn-card" 
                    onClick={() => props._toggleDragonModal(dragon, "modalDragonEdit")}
                >
                    Alterar
                </Button>
                <Button 
                    variant="custom-btn-card" 
                    onClick={() => props._goToDragonDetails(dragon)}
                >
                    Visualizar
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default CardDragon;
