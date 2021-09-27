import React, { Component } from 'react';
import MemoryCard from './MemoryCard.js'

export default class MemoryCardGame extends Component {
  constructor(props) {
      super(props);
      let cards = [];
      this.props.images.forEach((element,index) => {
        // id corresponds to which image, type means which copy
        cards.push({id: index, type: 1, matchedAnimation: false, noMatchAnimation: false, opened: false});
        cards.push({id: index, type: 2, matchedAnimation: false, noMatchAnimation: false, opened: false});
      })
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[j], array[i]] = [array[i], array[j]]
        }
      }
      shuffleArray(cards);
      cards.forEach((c,i) => {c.index = i})
      this.state = {
        cards: cards,
        currentCard: false,
        newCard: false,
        previewingCards: true,
        matchedNum: 0
      }
    this.checkMatch = this.checkMatch.bind(this)
    this.updateState = this.updateState.bind(this)
    this.callbackCheckMatch = this.callbackCheckMatch.bind(this)
    this.previewCard = this.previewCard.bind(this)
    this.unpreviewCard = this.unpreviewCard.bind(this)
    this.num1 = 400;
    this.num2 = 2400;
    }

    previewCard(index) {
      this.num1 = this.num1+10
      this.num2 = this.num2+10
      let cards = this.state.cards;
      cards[index].opened = true;
      this.setState({cards:cards},
          function() {
            if (index<cards.length-1) {
            setTimeout(function() {this.previewCard(index+1)}.bind(this), this.num1) }
            setTimeout(function() {this.unpreviewCard(index, true)}.bind(this), this.num2)
          }
        )}
    unpreviewCard(index, lastPreview) {
      let cards = this.state.cards;
      cards[index].opened = false;
      if (lastPreview === true) {
        this.setState({cards:cards})}
    }
    componentDidMount() {
        setTimeout(function() {this.previewCard(0)}.bind(this), 270)
    }

    callbackCheckMatch() {
      let cards = [...this.state.cards];
      if (this.state.currentCard.id === this.state.newCard.id) {
        //correct match
        this.props.addStarToPlayer(this.props.currentPlayer)
        //flicker on and off the effect for matched cards
        cards[this.state.newCard.index].matchedAnimation = true;
        cards[this.state.currentCard.index].matchedAnimation = true;
        this.setState(prevState => {return {cards: cards, matchedNum: prevState.matchedNum+1}}, function(){
        if (this.state.matchedNum === cards.length/2) {
          this.props.setWinner()
        }
        setTimeout(function(){
          let cards2 = [...this.state.cards];
          cards2[this.state.newCard.index].matchedAnimation = false;
          cards2[this.state.currentCard.index].matchedAnimation = false;
          this.setState({cards: cards2, currentCard: false, newCard: false})}.bind(this),1100)
      })
      }
      else {
        //incorrect match
        this.props.updateCurrentPlayer();
        setTimeout(function(){
          let cards = [...this.state.cards];
          cards[this.state.newCard.index].opened = false;
          cards[this.state.currentCard.index].opened = false;
          this.setState({cards: cards, currentCard: false, newCard: false})}.bind(this),1400)
    }
  }

    checkMatch(card) {
        if (this.state.currentCard === false) {
          // No card uncovered, now uncover first card
          this.setState({currentCard: card}) }
        else {
          // First card was uncovered, now uncover second
          this.setState({newCard: card}, this.callbackCheckMatch)

      }
    }

    updateState(card, where) {
      const index = card.index
      let cards = this.state.cards;
      let opened = cards[index].opened
      if (!this.state.newCard && !opened) {
        // Check that there aren't 2 cards uncovered already and that the card
        // is not open yet
        cards[index].opened = !cards[index].opened
        this.setState({cards: cards}, () => {this.checkMatch(card)})
      }
    }

    render() {
      return <div id='memory-card-game'> {this.state.cards.map(card => {
        return <MemoryCard
        removeNoMatchAnimation={this.removeNoMatchAnimation}
        size={this.state.cards.length/2}
        card={card}
        updateState={this.updateState}
        key={`mc-${card.id}-${card.type}`}
        src={this.props.images[card.id]}
        checkMatch={this.checkMatch}
        />} ) }</div>
    }
}
