import { useState } from "react";
import { MdOutlineClose } from "react-icons/md"
import Button from '../Button/Button';
import './ModalView.css'

const ModalView = (props) => {
  let [submitted, setSubmitted] = useState(false)
  let [formValues, setFormValues] = useState({
    id: props.card.id,
    completed: props.card.is_completed,
    meaning_id: props.card.meanings[0].id,
    word: props.card.word,
    meaning: props.card.meanings[0].meaning,
    part_of_speech: props.card.meanings[0].part_of_speech,
    example: props.card.meanings[0].example
  })

  const handleWordChange = (e) => {
    setFormValues({...formValues, word: e.target.value});
  }

  const handleMeaningChange = (e) => {
    setFormValues({...formValues, meaning: e.target.value});
  }

  const handlePartOfSpeechChange = (e) => {
    setFormValues({...formValues, part_of_speech: e.target.value});
  }

  const handleExampleChange = (e) => {
    setFormValues({...formValues, example: e.target.value});
  }

  const submitData = async () => {
    try {
      console.log("Submitted: ", submitted)
      let result = await fetch("http://localhost:8000/api/flashcards/" + props.card.id + "/update/", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(formValues)
      })
      console.log("Result: ", result);
    } catch(e) {
      console.log(e);
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
  }
  // const form = useRef();
  console.log(props)
  return (
    <div className="modal-wrapper">
      <div className="mo-row">
        <div className='mo-header'><h1 className="mo-h1">Update Flashcard</h1></div>
        <div className="mo-close-btn">
          {/* <Button onClick={props.onClick} style={{backgroundColor: "transparent"}}><MdOutlineClose /></Button> */}
          <MdOutlineClose onClick={props.onClick} size={"2vw"} />
        </div>
      </div>
      <div className="mo-row">
        <form action="" className="mo-form" onSubmit={handleSubmit}>
          <div className="form">
            <div className='mo-input-field'>
              <label className="inp-label">Word</label>
              <input className="inp" type="text" name="word" value={formValues.word} onChange={handleWordChange} placeholder={"word"} required />
              {/* { submitted && !formValues.word ? <span className="inp-error">Word cannot be empty! Please try again.</span> : null } */}
            </div>
            <div className='mo-input-field'>
              <label className="inp-label">Meaning</label>
              <input className="inp" type="text" name="meaning" value={formValues.meaning} onChange={handleMeaningChange} placeholder={"meaning"} required />
              {/* { submitted && !formValues.meaning ? <span className="inp-error">Meaning of a word cannot be empty! Please try again.</span> : null } */}
            </div>
            <div className='mo-input-field'>
              <label className="inp-label">Part Of Speech</label>
              <input className="inp" type="text" name="part_of_speech" value={formValues.part_of_speech} onChange={handlePartOfSpeechChange} placeholder={"part of speech"} required />
              {/* { submitted && !formValues.part_of_speech ? <span className="inp-error">Part of Speech cannot be empty! Please try again.</span> : null } */}
            </div>
            <div className='mo-textarea-field'>
              <label className="inp-label">Sentence</label>
              <textarea rows={3} name="usage" value={formValues.example} onChange={handleExampleChange} placeholder='Type your sentence here ...' required></textarea>
              {/* { submitted && !formValues.usage ? <span className="inp-error">Sentence cannot be empty! Please try again.</span> : null } */}
            </div>
            <div className='mo-btn-row'>
              <div className="mo-btn"></div>
              <div className="mo-btn"></div>
              <div className="mo-btn"></div>
              <div className="mo-btn"></div>
              <div className="mo-btn">
                <Button onClick={props.onClick}><div className="btn-txt">Cancel</div></Button>
              </div>
              <div className="mo-btn">
                <Button onClick={() => submitData() } style={{ backgroundColor: "#6253cc", color: "white" }} ><div className="btn-txt">Save</div></Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {props.children}
    </div>
  )
};

export default ModalView;