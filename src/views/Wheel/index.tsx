import { useState } from 'react'
import { Input, Typography } from 'antd'

import { head, tail } from 'assets'
import { randomizer } from 'helpers'
import { Wheel } from 'react-custom-roulette'
import './style.less'
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types'
import { useEffect } from 'react'

const { Title } = Typography
const { TextArea } = Input

const WheelView = () => {

  const [namesInput, setNamesInput] = useState('')
  const [names, setNames] = useState<WheelData[]>([{option: ''}])
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(0);

  useEffect(() => {
    if(namesInput) {
      setNames(namesInput.split('\n').map(name => ({option: name})))
    } else {
      setNames([{option: ''}])
    }
  }, [namesInput])

  const handleSpinClick = () => {
    setSpinResult(randomizer.getRandomInteger(0, names.length))
    setIsSpinning(true)
  }

  return (
    <div className='wheel-container centering-flex'>
      <Wheel
        mustStartSpinning={isSpinning}
        prizeNumber={spinResult}
        data={names}
        backgroundColors={namesInput ? ['#FFCF5D', '#50E267', '#00F4F5', '#527AAC', '#FF5368', '#FF983B'] : undefined}
        textColors={['#a7863a', '#359744', '#018b8b', '#304661', '#972f3c', '#9e5e27']}
        radiusLineWidth={names.length > 1 ? 1 : 0}
        radiusLineColor={namesInput ? '#9b9b9b' : undefined}
        outerBorderColor={'#3d4e64'}
        outerBorderWidth={16}
        onStopSpinning={() => setIsSpinning(false)}
      />
      {!isSpinning && <p>{names[spinResult].option}</p>}
      <button onClick={handleSpinClick}>SPIN</button>
      <TextArea
        value={namesInput}
        onChange={e => setNamesInput(e.target.value)}
        placeholder="Input names here"
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
    </div>
  )
}

export default WheelView;