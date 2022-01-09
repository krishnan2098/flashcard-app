import { AiFillEdit } from 'react-icons/ai';
import { GiSpeaker } from 'react-icons/gi';
import './Card.css'

const Card = (props) => {
  let side;
  let audio = new Audio()
  if (!props.audio) {
    audio.src = ""
  } else {
    audio.src = props.audio
  }

  if (props.frontSide) {
    side = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
        className="side">
        <div className="heading">
          <h3 className="word">{props.word}</h3>
          <div className="edit-btn">
            <AiFillEdit onClick={props.toggleModal} size={"1.75vw"} />
          </div>
        </div>
      </div>)
  } else {
    side = (
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
        className="side">
        <div className="word-section">
          <div className="heading">
            <div className='audio-btn'>
              <div className="audio" disabled={props.audio ? null: 'disabled'} onClick={() => props.audio ? audio.play() : null} ><GiSpeaker size={"1.5vw"} /></div>
            </div>
            <h3 className="word">{props.word}</h3>
          </div>
          <div className="edit-btn">
            <AiFillEdit onClick={props.toggleModal} size={"1.75vw"} />
          </div>
        </div>
        {props.definitions.map(function (definition, i) {
          return (
            <div key={i} className="definition">
              <div className="type"><i>{definition.part_of_speech}</i></div>
              <div className="meaning">{(i + 1) + "."} {definition.meaning}</div>
              <div className="usage"><span className="sentence">Sentence:</span> {definition.example}</div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div 
      animate={{ rotate: 360 }}
      transition={{ duration: 2 }}
    >
      <div className="card">
        {/* {props.frontSide && side}
        {!props.frontSide && side} */}
        {side}
      </div>
    </div>
  )
};

export default Card