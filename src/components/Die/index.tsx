import { useState, useEffect, ReactNode } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, notification } from 'antd'
import { KeyboardEventHandler } from 'react'
import ReactCardFlip from 'react-card-flip'

import { cards, spades } from 'assets'
import { randomizer } from 'helpers'
import './style.less'

const { Title } = Typography

type DieProps = {
  handleAnimationEndDie?: () => void
  rollResult?: number
  toggleRoll: boolean
}

const Die = ({
  handleAnimationEndDie,
  toggleRoll,
  rollResult
}: DieProps) => {
  return (<>
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
  </>)
}

export default Die;