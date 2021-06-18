import { useState, useEffect } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, notification } from 'antd'
import { KeyboardEventHandler } from 'react'
import ReactCardFlip from 'react-card-flip'

import { cards } from 'assets'
import { randomizer } from 'helpers'
import './style.less'
import { jokers, numbers, symbols } from './const'

const { Title } = Typography

type Card = {
  id: number
  name: string
  src: string
}

const Cards = () => {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => { //generate cards
    const generatedCards: Card[] = []
    symbols.forEach((symbol, i) => {
      numbers.forEach((number, j) => {
        generatedCards.push({
          id: i + j,
          name: `${number} of ${symbol}`,
          src: require(`assets/cards/${number}_of_${symbol}.png`).default
        })
      })
    })
    //add joker
    jokers.forEach(joker => {
      generatedCards.push({
        id: 50,
        name: `${joker} joker`,
        src: require(`assets/cards/${joker}_joker.png`).default
      })
    })
    setCards(generatedCards)
  }, [])
  
  return (
    <div className='cards-container'>
      <div className='cards-cards-container'>
        {cards.map(card => (
          <div className='cards-card-container'>
            <ReactCardFlip key={card.id} isFlipped={false} flipDirection="vertical">
              <div>
                <img src={card.src} alt=''/>
              </div>
              <div>
                <img src={card.src} alt=''/>
              </div>
            </ReactCardFlip>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards;