import { useState } from 'react'
import { Button, Typography } from 'antd'

import { head, tail } from 'assets'
import { randomizer } from 'helpers'
import { Wheel } from 'react-custom-roulette'
import './style.less'

const { Title } = Typography

const WheelView = () => {

  const data = [
    { option: '' }
  ]

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  return (
    <div className='wheel-container centering-flex'>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={2}
        data={data}
        backgroundColors={['#FFCF5D', '#50E267', '#00F4F5', '#527AAC', '#FF5368', '#FF983B']}
        textColors={['#a7863a', '#359744', '#018b8b', '#304661', '#972f3c', '#9e5e27']}
        radiusLineWidth={0}
        outerBorderColor={'#3d4e64'}
        outerBorderWidth={16}
        onStopSpinning={() => setMustSpin(false)}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  )
}

export default WheelView;