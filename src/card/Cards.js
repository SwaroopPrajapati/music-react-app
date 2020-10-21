import React from 'react'
import Card from 'react-bootstrap/Card'
import '../styleSheets/myStyle.scss'

function Cards(props) {
    console.log(props.card_detail)
    return (
        <Card id={`card-${props.id}`} className="shadow p-3 mb-5 bg-white rounded">
            <Card.Img variant="top" src={props.card_detail.track.album.images[0].url} />
            <Card.Body>
                <Card.Title>{props.card_detail.track.name}</Card.Title>
                <Card.Text>
                    {props.card_detail.track.artists[0].name}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Cards