import React, {Component} from 'react';
import './App.css';
import Card from './components/Card/Card'
import DrawButton from './components/DrawButton/DrawButton'

class App extends Component {
  constructor(props){
    super(props)
    this.updateCard = this.updateCard.bind(this);
    this.state = {
      cards: [
        {id: 1, word: "t1", meaning: "m1", type: "verb", usage: "u1"},
        {id: 2, word: "t2", meaning: "m2", type: "verb", usage: "u2"},
        {id: 3, word: "t3", meaning: "m3", type: "verb", usage: "u3"},
        {id: 4, word: "t4", meaning: "m4", type: "verb", usage: "u4"},
        {id: 5, word: "t5", meaning: "m5", type: "verb", usage: "u5"}
      ],
      currentCard: {}
    }
  }

  getRandomCard(currentCards) {
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return(card);
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="card-row">
          <Card word={this.state.currentCard.word} meaning={this.state.currentCard.meaning} type={this.state.currentCard.type} usage={this.state.currentCard.usage}/>
        </div>
        <div className="buttonRow">
          <DrawButton drawCard={this.updateCard}/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const currentCards = this.state.cards

    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  }
}

export default App;
