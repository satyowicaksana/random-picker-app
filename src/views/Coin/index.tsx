import { useState, useEffect } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, notification } from 'antd'
import { KeyboardEventHandler } from 'react'

import { head, tail } from 'assets'
import './style.less'

const { Title } = Typography

const Coin = () => {
  const [toggleCoinFlip, setToggleCoinFlip] = useState(false)

  const handleClickFlip = () => {
    setToggleCoinFlip(true)
  }

  return (
    <div className='coin-container'>
      <div onAnimationEnd={() => setToggleCoinFlip(false)} className={`coin ${toggleCoinFlip ? 'flip' : ''}`}>
        <div className='coin-front p-3'>
          <img src={head} alt='head' className='coin-icon' />
        </div>
        <div className='coin-edge'>
          {Array.from(Array(80).keys()).map(i => (
            <div key={i}/>
          ))}
        </div>
        <div className={`coin-back p-3 ${toggleCoinFlip ? 'flip' : ''}`}>
          <img src={tail} alt='tail' className='coin-icon' />
        </div>
        <div className='coin-shadow'/>
      </div>

      <Button onClick={handleClickFlip} type='primary' size='large'>Flip</Button>
    </div>
  )
}

export default Coin;