import React from 'react';
import './Card.css'

const Card = (props) => (
    <div className="card-container">
        <div className="card">
            <div className="front">
                <div className="word">{props.word}</div>
            </div>
            <div className="back">
                <div className="meaning">{props.meaning}</div>
                <div className="type">{props.type}</div>
                <div className="usage">{props.usage}</div>
            </div>
        </div>
    </div>

)

export default Card