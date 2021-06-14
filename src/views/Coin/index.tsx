import { useState, useEffect } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, notification } from 'antd'
import { KeyboardEventHandler } from 'react'

import { head, tail } from 'assets'
import { randomizer } from 'helpers'
import './style.less'

const { Title } = Typography

const Coin = () => {
  const [toggleFlip, setToggleFlip] = useState(false)
  const [front, setFront] = useState<'head' | 'tail' | undefined>(undefined)

  const handleClickFlip = () => {
    setToggleFlip(true)
    const isHead = !!(randomizer.getRandomInteger(0, 1))
    setFront(isHead ? 'head' : 'tail')
  }

  return (
    <div className='coin-container'>
      <div onAnimationEnd={() => setToggleFlip(false)} className={`coin ${toggleFlip ? 'flip' : ''}`}>
        <div className='coin-front p-3'>
          {front !== 'tail'
          ? <img src={head} alt='head' className='coin-icon' />
          : <img src={tail} alt='tail' className='coin-icon' />
          }
        </div>
        <div className='coin-edge'>
          {Array.from(Array(80).keys()).map(i => (
            <div key={i}/>
          ))}
        </div>
        <div className={`coin-back p-3 ${toggleFlip ? 'flip' : ''}`}>
          {front !== 'head'
          ? <img src={head} alt='head' className='coin-icon' />
          : <img src={tail} alt='tail' className='coin-icon' />
          }
        </div>
        {(front && !toggleFlip) && (
          <div className='coin-flip-result'>
            <Title type='secondary' level={3}>{front.toUpperCase()}</Title>
          </div>
        )}
        <div className='coin-shadow'/>
      </div>

      <Button onClick={handleClickFlip} type='primary' size='large'>Flip</Button>
    </div>
  )
}

export default Coin;