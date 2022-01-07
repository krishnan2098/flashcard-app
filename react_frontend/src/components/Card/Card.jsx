import './Card.css'

const Card = (props) => {
  let side;
  if (props.frontSide) {
    side = <div className="side"><div className="word">{props.word}</div></div>
  } else {
    side = (
      <div className="side">
        <div className="meaning">{props.meaning}</div>
        <div className="type">{props.type}</div>
        <div className="usage">{props.usage}</div>
      </div>
    )
  }

  return (
    <div className="card-container">
      <div className="card">
        {side}
      </div>
    </div>
  )
};

export default Card