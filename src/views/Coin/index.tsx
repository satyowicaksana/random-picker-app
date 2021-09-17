import { useState } from 'react'
import { Button, Typography } from 'antd'

import { randomizer } from 'helpers'
import { Navbar } from 'components'
import { head, tail } from 'assets'
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

  return (<>
    <Navbar/>
    <div className='coin-container'>
      <div onAnimationEnd={() => setToggleFlip(false)} className={`coin ${toggleFlip ? 'flip' : ''} mb-1`}>
        <div className='coin-front p-2'>
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
        <div className='coin-shadow'/>
      </div>
      <div className='coin-flip-result mb-2'>
      {(front && !toggleFlip) && (
        <Title type='secondary' level={3}>{front.toUpperCase()}</Title>
      )}
      </div>
      <div className='coin-button-container'>
        <Button onClick={handleClickFlip} type='primary' size='large'>Flip</Button>
      </div>
    </div>
  </>)
}

export default Coin;