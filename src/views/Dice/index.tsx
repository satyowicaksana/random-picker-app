import { useState } from 'react'
import { Row, Col, Button, Typography } from 'antd'

import { head, tail } from 'assets'
import { randomizer } from 'helpers'
import './style.less'

const { Title } = Typography

const Dice = () => {
  const [rollResult, setRollResult] = useState<number | undefined>()
  const [toggleRoll, setToggleRoll] = useState(false)

  const handleAnimationEndDie = () => {
    setToggleRoll(false)
    setRollResult(randomizer.getRandomInteger(1, 6))
  }

  const handleClickRoll = () => {
    if(!toggleRoll) setToggleRoll(true)
  }

  return (
    <div className='dice-container'>
      <div onAnimationEnd={handleAnimationEndDie} className={`die ${toggleRoll ? 'roll' : ''} ${rollResult ? `show-${rollResult}` : ''} mb-1`}>
        <div className="die-face face-1">
          <div className='die-face-dot dot-center'/>
        </div>
        <div className="die-face face-2">
          <div className='die-face-dot dot-top-right'/>
          <div className='die-face-dot dot-bottom-left'/>
        </div>
        <div className="die-face face-3">
          <div className='die-face-dot dot-top-right'/>
          <div className='die-face-dot dot-center'/>
          <div className='die-face-dot dot-bottom-left'/>
        </div>
        <div className="die-face face-4">
          <div className='die-face-dot dot-top-left'/>
          <div className='die-face-dot dot-top-right'/>
          <div className='die-face-dot dot-bottom-left'/>
          <div className='die-face-dot dot-bottom-right'/>
        </div>
        <div className="die-face face-5">
          <div className='die-face-dot dot-top-left'/>
          <div className='die-face-dot dot-top-right'/>
          <div className='die-face-dot dot-center'/>
          <div className='die-face-dot dot-bottom-left'/>
          <div className='die-face-dot dot-bottom-right'/>
        </div>
        <div className="die-face face-6">
          <div className='die-face-dot dot-top-center'/>
          <div className='die-face-dot dot-top-left'/>
          <div className='die-face-dot dot-top-right'/>
          <div className='die-face-dot dot-bottom-center'/>
          <div className='die-face-dot dot-bottom-left'/>
          <div className='die-face-dot dot-bottom-right'/>
        </div>
      </div>
      <div className='dice-result-container mb-2'>
      {(rollResult && !toggleRoll) && (
        <Title type='secondary' level={3} className='mb-0'>{rollResult}</Title>
      )}
      </div>
      <div className='dice-button-container'>
        <Button size='large' type='primary' onClick={handleClickRoll}>Roll</Button>
      </div>
    </div>
  )
}

export default Dice;