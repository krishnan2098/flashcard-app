import { GiSpeaker } from 'react-icons/gi';
import Button from '../Button/Button';
import './Card.css'

const Card = (props) => {
  let side;
  let audio = new Audio()
  audio.src = "https://ssl.gstatic.com/dictionary/static/sounds/20200429/enfranchise--_gb_1.mp3"
  if (props.frontSide) {
    side = (
    <div style={{  
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
      }} 
      className="side">
      <div className="word-section"><h3 className="word">{props.word}</h3></div>
    </div>)
  } else {
    side = (
      <div style={{  
        display: "flex",
        flexDirection: "column",
        // justifyContent: "flex-start",
        alignItems: "flex-start"
        }} 
        className="side">
        <div className="word-section">
          <div className='audio-btn'>
            <Button className="audio" style={{ width: "3vw", height: "3vw", borderRadius: "50%", backgroundColor: "#6253cc", color: "white" }} onClick={() => audio.play()} ><GiSpeaker /></Button>
          </div>
          <h3 className="word">{props.word}</h3>
        </div>
        {props.definitions.map(function(definition, i) {
          console.log(definition);
          return (
            <div className="definition">
              <div className="type">{definition.part_of_speech}</div>
              <div className="meaning">{(i + 1) +"."} {definition.meaning}</div>
              <div className="usage"><span className="sentence">Sentence:</span> {definition.example}</div>
            </div>
          )
        })}
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