import { useState } from 'react'
import { Row, Col, Button, Input, Typography } from 'antd'
import { Wheel } from 'react-custom-roulette'

import { randomizer } from 'helpers'
import './style.less'
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types'
import { useEffect } from 'react'
import { Navbar, BottomDrawer } from 'components'

const { Title } = Typography
const { TextArea } = Input

const WheelView = () => {

  const [namesInput, setNamesInput] = useState('Alice\nBob\nCharlie\nDaniel')
  const [names, setNames] = useState<WheelData[]>([{option: ''}])
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(0);
  const [displayedSpinResult, setDisplayedSpinResult] = useState('');

  useEffect(() => {
    if(namesInput) {
      setNames(namesInput.split('\n').map(name => ({option: name})))
    } else {
      setNames([{option: ''}])
    }
  }, [namesInput])

  const handleSpinClick = () => {
    setIsSpinning(true)
    setSpinResult(randomizer.getRandomInteger(0, names.length - 1))
    setDisplayedSpinResult('')
  }

  const handleClickStopSpinning = () => {
    setIsSpinning(false)
    setDisplayedSpinResult(names[spinResult].option)
  }

  const renderSpinButton = () => (
    <Button size='large' type='primary' disabled={isSpinning || names.length <= 1} onClick={handleSpinClick} className='wheel-spin-button full-width mb-2'>
      SPIN
    </Button>
  )

  return (<>
    <Navbar/>
    <div className='wheel-container centering-flex p-3'>
      <div className='wheel-content-container'>
        <Row gutter={{xs: 0, lg: 80}}>
          <Col xs={24} lg={12} className='centering-flex'>
            <div className='wheel-wheel-container mb-2'>
              <Wheel
                mustStartSpinning={isSpinning}
                prizeNumber={spinResult}
                data={names.map(name  => ({option: name.option.length > 10 ? `${name.option.substring(0, 10)}...` : name.option}))} // truncate names
                backgroundColors={namesInput ? ['#FFCF5D', '#50E267', '#00F4F5', '#7ca2d1', '#FF5368', '#FF983B'] : undefined}
                textColors={['#3d4e64']}
                radiusLineWidth={names.length > 1 ? 2 : 0}
                radiusLineColor={namesInput ? '#3d4e64' : undefined}
                outerBorderColor={'#3d4e64'}
                outerBorderWidth={16}
                onStopSpinning={handleClickStopSpinning}
                textDistance={50}
              />
            </div>
            <div className='wheel-result-container mb-2'>
              {displayedSpinResult && (
                <Title type='secondary' level={3}>{displayedSpinResult}</Title>
              )}
            </div>
            <div className='wheel-button-container desktop'>
              {renderSpinButton()}
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <TextArea
              value={namesInput}
              disabled={isSpinning}
              onChange={e => setNamesInput(e.target.value)}
              placeholder="Input names here"
              autoSize={{ minRows: 4, maxRows: 20 }}
              className='wheel-names-input'
            />
          </Col>
        </Row>
      </div>
    </div>
    <BottomDrawer>
      {renderSpinButton()}
    </BottomDrawer>
    <div className='button-bottom-drawer-padding'/>
  </>)
}

export default WheelView;