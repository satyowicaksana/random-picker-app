import { useState } from 'react'
import { Button, Typography } from 'antd'

import { randomizer } from 'helpers'
import { Navbar, BottomDrawer } from 'components'
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

  const renderFlipButton = () => (
    <Button onClick={handleClickFlip} type='primary' size='large'>Flip</Button>
  )

  return (<>
    <Navbar/>
    <div className='content-container coin-container'>
      <div onAnimationEnd={() => setToggleFlip(false)} className={`coin ${toggleFlip ? 'flip' : ''} mb-1`}>
        <div className={`coin-layer p-3 ${toggleFlip ? 'flip' : ''}`}>
          {front !== 'head'
          ? <img src={head} alt='head' className='coin-icon' />
          : <img src={tail} alt='tail' className='coin-icon' />
          }
        </div>
        {Array.from(Array(8).keys()).map(i => (
          <div key={i} className='coin-layer'/>
        ))}
        <div className='coin-layer p-2'>
          {front !== 'tail'
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
      <div className='coin-button-container desktop'>
        {renderFlipButton()}
      </div>
    </div>
    <BottomDrawer>
      {renderFlipButton()}
    </BottomDrawer>
  </>)
}

export default Coin;