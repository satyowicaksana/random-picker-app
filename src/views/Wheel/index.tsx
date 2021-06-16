import { useState } from 'react'
import { Row, Col, Button, Input, Typography } from 'antd'

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
      <div className='wheel-content-container'>
        <Row gutter={24}>
          <Col xs={24} md={12} className='centering-flex'>
            <div className='wheel-wheel-container mb-2'>
              <Wheel
                mustStartSpinning={isSpinning}
                prizeNumber={spinResult}
                data={names}
                backgroundColors={namesInput ? ['#FFCF5D', '#50E267', '#00F4F5', '#527AAC', '#FF5368', '#FF983B'] : undefined}
                textColors={['#a7863a', '#359744', '#018b8b', '#304661', '#972f3c', '#9e5e27']}
                radiusLineWidth={names.length > 1 ? 1 : 0}
                radiusLineColor={namesInput ? '#7e90a7' : undefined}
                outerBorderColor={'#3d4e64'}
                outerBorderWidth={16}
                onStopSpinning={() => setIsSpinning(false)}
              />
              <Button disabled={isSpinning || names.length <= 1} onClick={handleSpinClick} className='wheel-spin-button'>
                {!isSpinning && names.length > 1 ? 'SPIN' : ' '}
              </Button>
            </div>
            {!isSpinning && <p>{names[spinResult]?.option}</p>}
          </Col>
          <Col xs={24} lg={12}>
            <TextArea
              value={namesInput}
              onChange={e => setNamesInput(e.target.value)}
              placeholder="Input names here"
              autoSize={{ minRows: 2, maxRows: 6 }}
              className='wheel-names-input'
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default WheelView;