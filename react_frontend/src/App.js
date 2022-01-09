import { useState, useEffect } from 'react';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { GiCardExchange } from 'react-icons/gi';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import ReactModal from 'react-modal';

import Card from './components/Card/Card';
import Button from './components/Button/Button';
import Preloader from './components/Preloader/Preloader';
import ModalView from './components/ModalView/ModalView';
import './App.css';

const App = () => {
  let [cards, setCards] = useState([]);
  let [isEmpty, setIsEmpty] = useState("");
  let [frontSide, setSide] = useState(true)
  let [currentCard, setCurrentCard] = useState(1);
  let [showModal, setShowModal] = useState(false)
  let [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/api/flashcards/')
      .then(response => response.json())
      .then(json => setCards(json));
  }, [])

  const handleCardChange = (e) => {
    if (e.target.value !== "" && parseInt(e.target.value) !==0 && e.target.value <= cards.length) { setCurrentCard(parseInt(e.target.value)); setIsEmpty(false) }
    else if (e.target.value > cards.length) {alert("Max Limit Reached!")}
    else setIsEmpty(e.target.value)
  }

  const handleCompletion = () => {
    try {
      fetch('http://localhost:8000/api/flashcards/' + currentCard + '/update/', {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id: currentCard,
          completed: !isCompleted,
          meaning_id: cards[currentCard - 1].meanings[0].id,
          word: cards[currentCard - 1].word,
          meaning: cards[currentCard - 1].meanings[0].meaning,
          part_of_speech: cards[currentCard - 1].meanings[0].part_of_speech,
          example: cards[currentCard - 1].meanings[0].example
        })
      })
      .then( response => { if(response.status === 200) { setIsCompleted(!isCompleted) }})
    } catch(e) {
      alert("Something went wrong! Please retry or contact Admin");
    }
  }

  ReactModal.setAppElement('#root');

  if (cards.length === 0) {
    return (
      <div className="App">
        <Preloader />
      </div>
    )
  } else {
    return (
      <div>
        <div className="App">
          <div className="row">
            <Card frontSide={frontSide} toggleModal={() => setShowModal(true)} audio={cards[currentCard - 1]["audio"]} word={cards[currentCard - 1].word} definitions={cards[currentCard - 1].meanings} />
          </div>
          <div className="row">
            <div className='app-btn'>
              <Button className="flip button-standards" onClick={() => setSide(!frontSide)} >
              <GiCardExchange />
            </Button>
            </div>
            <div className='app-btn'>
              <Button className="prev button-standards" onClick={() => { if (currentCard === 1) { return setCurrentCard(1) } else { return setCurrentCard(currentCard - 1) } }} >
                <AiFillLeftCircle />
              </Button>
            </div>
            <div className='app-btn'>
              <div className='current-card-inp-field'>
                <input
                onChange={handleCardChange}
                className="current-card-inp" type="text" name="card_id" value={isEmpty?isEmpty:currentCard} />
                {" / " + cards.length} 
              </div>
            </div>
            <div className='app-btn'>
              <Button className="next button-standards" onClick={() => { if (currentCard === cards.length) {alert("Max limit Reached!")} else setCurrentCard(currentCard + 1) }} ><AiFillRightCircle /></Button>
            </div>
            <div className='app-btn'>
              <Button className="completed button-standards" onClick={() => handleCompletion()} >{isCompleted === false ? <MdCheckBoxOutlineBlank /> : <MdCheckBox />}</Button>
            </div>

            <ReactModal isOpen={showModal} contentElement={() => <ModalView card={cards[currentCard - 1]} onClick={() => setShowModal(false)} />} style={{
              overlay: {
                position: 'fixed',
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }
            }}>
            </ReactModal>
          </div >
        </div >
      </div>
    )
  }
};

export default App;
