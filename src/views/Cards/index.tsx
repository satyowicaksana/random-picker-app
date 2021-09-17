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
  const [disableClickDraw, setDisableClickDraw] = useState(false)
  const [drawedCardStack, setDrawedCardStack] = useState(0)
  const [displayedDrawedCardName, setDisplayedDrawedCardName] = useState('')

  useEffect(() => {
    setCards(cardsData)
    setUndrawedCardIndexes(cardsData.map((card, i) => i))
  }, [])

  const handleClickDraw = () => {
    setDisableClickDraw(true)
    if(undrawedCardIndexes.length > 0) {
      const randomIndex = randomizer.getRandomInteger(0, undrawedCardIndexes.length - 1)
      const randomUndrawedCardIndex = undrawedCardIndexes[randomIndex]

      console.log(randomIndex, 'randomIndex')
      console.log(randomUndrawedCardIndex, 'randomUndrawedCardIndex')

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
        console.log('newUndrawed', newUndrawedCardIndexes)
        newUndrawedCardIndexes.splice(randomIndex, 1)
        console.log('newUndrawed', newUndrawedCardIndexes)
        setUndrawedCardIndexes(newUndrawedCardIndexes)
      }
    }
    setDisableClickDraw(false)
  }

  const handleClickResetDeck = () => {
    setCards(cardsData)
    setTimeout(() => {
      setDisplayedDrawedCardName('')
    }, 500)
  }
  
  return (<>
    <Navbar/>
    <div className='cards-container centering-flex'>
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
              <div className='cards-card'>
                
              </div>
            </ReactCardFlip>
          </div>
        ))}
      </div>
      <div className='cards-result-container mb-2'>
        {displayedDrawedCardName && <Title type='secondary' level={3}>{displayedDrawedCardName}</Title>}
      </div>
      <div className='cards-button-container'>
        <Button size='large' type='primary' disabled={!undrawedCardIndexes.length || disableClickDraw} onClick={handleClickDraw} className='cards-button mb-2'>Draw</Button>
        <Button size='large' disabled={undrawedCardIndexes.length === cardsData.length} onClick={handleClickResetDeck} className='cards-button'>Reset Deck</Button>
      </div>
    </div>
  </>)
}

export default Cards;