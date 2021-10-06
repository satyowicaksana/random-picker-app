import { useState, useEffect } from 'react'
import { Button, Typography } from 'antd'
import ReactCardFlip from 'react-card-flip'

import { randomizer } from 'helpers'
import { Navbar } from 'components'
import { Card, cardsData } from './const'
import './style.less'

const { Title } = Typography

const Cards = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [undrawedCardIndexes, setUndrawedCardIndexes] = useState<number[]>([])
  const [drawedCardStack, setDrawedCardStack] = useState(0)
  const [displayedDrawedCardName, setDisplayedDrawedCardName] = useState('')

  useEffect(() => {
    setCards(cardsData)
    setUndrawedCardIndexes(cardsData.map((card, i) => i))
  }, [])

  const handleClickDraw = () => {
    if(undrawedCardIndexes.length > 0) {
      const randomIndex = randomizer.getRandomInteger(0, undrawedCardIndexes.length - 1)
      const randomUndrawedCardIndex = undrawedCardIndexes[randomIndex]

      if(randomUndrawedCardIndex !== undefined) {
        
        //update cards with new drawed card
        const newCards = [...cards]
        newCards[randomUndrawedCardIndex] = {
          ...newCards[randomUndrawedCardIndex],
          isDrawed: true,
          stack: drawedCardStack
        }
        setCards(newCards)
        setTimeout(() => {
          setDisplayedDrawedCardName(newCards[randomUndrawedCardIndex].name)
        }, 500)

        //add stack for z-index
        setDrawedCardStack(drawedCardStack + 1)
    
        //pop random index from undrawed indexes 
        const newUndrawedCardIndexes = [...undrawedCardIndexes]
        newUndrawedCardIndexes.splice(randomIndex, 1)
        setUndrawedCardIndexes(newUndrawedCardIndexes)
      }
    }
  }

  const handleClickResetDeck = () => {
    setCards(cardsData)
    setTimeout(() => {
      setDisplayedDrawedCardName('')
    }, 500)
  }
  
  return (<>
    <Navbar/>
    <div className='content-container cards-container'>
      <div className='cards-cards-container mb-2'>
        {cards.map((card, i) => (
          <div key={`${card.number}_${card.symbol}_${i}`} style={{zIndex: card.stack}} className={`cards-card-container ${card.isDrawed ? 'drawed' : ''}`}>
            <ReactCardFlip isFlipped={!card.isDrawed}>
              <div className='cards-card'>
                <Title level={3} className={`cards-card-number ${card.color}`}>{card.number}</Title>
                <img src={card.icon} alt='' className='cards-card-icon'/>
                <img src={card.symbol} alt='' className='cards-card-symbol'/>
                <img src={card.illustration} alt='' className='cards-card-illustration'/>
              </div>
              <div className='cards-card'/>
            </ReactCardFlip>
          </div>
        ))}
      </div>
      <div className='cards-result-container mb-2'>
        {displayedDrawedCardName && <Title type='secondary' level={3}>{displayedDrawedCardName}</Title>}
      </div>
      <div className='cards-button-container'>
        <Button size='large' type='primary' disabled={!undrawedCardIndexes.length} onClick={handleClickDraw} className='cards-button mb-2'>Draw</Button>
        <Button size='large' disabled={undrawedCardIndexes.length === cardsData.length} onClick={handleClickResetDeck} className='cards-button'>Reset Deck</Button>
      </div>
    </div>
  </>)
}

export default Cards;