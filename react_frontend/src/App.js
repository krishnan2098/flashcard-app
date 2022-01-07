import { useState, useEffect } from 'react';
import { AiFillLeftCircle, AiFillRightCircle, AiFillEdit } from 'react-icons/ai';
import { GiCardExchange, GiSpeaker } from 'react-icons/gi';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import ReactModal from 'react-modal';

import Card from './components/Card/Card';
import Button from './components/Button/Button';
import Preloader from './components/Preloader/Preloader';
import ModalView from './components/ModalView/ModalView';
import './App.css';

const App = () => {
  let [cards, setCards] = useState([]);
  let [frontSide, setSide] = useState(true)
  let [currentCard, setCurrentCard] = useState(0);
  let [showModal, setShowModal] = useState(false)
  let [isCompleted, setIsCompleted] = useState(false)
  let audio = new Audio()
  audio.src = "https://ssl.gstatic.com/dictionary/static/sounds/20200429/enfranchise--_gb_1.mp3"

  useEffect(() => {
    console.log("App component mounted")
    fetch('http://localhost:8000/api/flashcards/')
      .then(response => response.json())
      .then(json => setCards(json));
  }, [])

  useEffect(() => {
    console.log("Cards state updated: ", cards)
  }, [cards])

  useEffect(() => {
    console.log("Current Card changed: ", currentCard)
  }, [currentCard])

  useEffect(() => {
    console.log("Front Side: ", frontSide)
  }, [frontSide])

  useEffect(() => {
    console.log("Model Open: ", showModal)
  }, [showModal])

  useEffect(() => {
    console.log("Completed: ", isCompleted)
  }, [isCompleted])

  ReactModal.setAppElement('#root');

  if (cards.length === 0) {
    return (
      <div className="App">
        <Preloader />
      </div>
    )
  } else {
    // audio.src = cards[currentCard]["audio"]
    return (
      <div className="App">
        <div className="row">
          <Card frontSide={frontSide} word={cards[currentCard].word} meaning={cards[currentCard].meanings[0].meaning} type={cards[currentCard].meanings[0].part_of_speech} usage={cards[currentCard].meanings[0].example} />
        </div>
        <div className="row">
          <div className='app-btn'>
            <Button className="prev" style={{ width: "4vw", backgroundColor: "#6253cc", color: "white" }} onClick={() => { if(currentCard === 0) { return setCurrentCard(0) } else { return setCurrentCard(currentCard - 1)} }} ><AiFillLeftCircle /></Button>
          </div>
          <div className='app-btn'>
            <Button className="flip" style={{ width: "4vw", backgroundColor: "#6253cc", color: "white" }} onClick={() => setSide(!frontSide)} ><GiCardExchange /></Button>
          </div>
          <div className='app-btn'>
            <Button className="audio" style={{ width: "4vw", backgroundColor: "#6253cc", color: "white" }} onClick={() => audio.play()} ><GiSpeaker /></Button>
          </div>
          <div className='app-btn'>
            <Button className="edit" style={{ width: "4vw", backgroundColor: "#6253cc", color: "white" }} onClick={() => setShowModal(!showModal)} ><AiFillEdit /></Button>
          </div>
          <div className='app-btn'>
            <Button className="completed" style={{ width: "4vw", backgroundColor: "#6253cc", color: "white" }} onClick={() => setIsCompleted(-1)} >{isCompleted === false ? <MdCheckBoxOutlineBlank /> : <MdCheckBox />}</Button>
          </div>
          <div className='app-btn'>
            <Button className="next" style={{ width: "4vw", backgroundColor: "#6253cc", color: "white" }} onClick={() => setCurrentCard(currentCard + 1)} ><AiFillRightCircle /></Button>
          </div>

          <ReactModal isOpen={showModal} contentElement={() => <ModalView card={cards[currentCard]} onClick={() => setShowModal(false)} />} style={{
            overlay: {
              position: 'fixed',
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "10vh"
            }
          }}>
          </ReactModal>
        </div >
      </div >
    )
  }
};

export default App;
