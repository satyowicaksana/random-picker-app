import { useState } from 'react'
import { Row, Col, Button, Typography, Slider } from 'antd'

import { BottomDrawer, Navbar, Die } from 'components'
import { randomizer } from 'helpers'
import './style.less'
import { useEffect } from 'react'

const { Text, Title } = Typography

const Dice = () => {
  const [results, setResults] = useState<number[]>([1])
  const [toggleRoll, setToggleRoll] = useState(false)

  //settings form
  const [resultNumber, setResultNumber] = useState(1)

  useEffect(() => {
    const newResults = []
    for(let i = 0; i < resultNumber; i++) {
      newResults.push(1)
    }
    setResults(newResults)
  }, [resultNumber])

  const handleAnimationEndDie = () => {
    setToggleRoll(false)
    const newResults = []
    for(let i = 0; i < resultNumber; i++) {
      newResults.push(randomizer.getRandomInteger(1, 6))
    }
    setResults(newResults)
  }

  const handleClickRoll = () => {
    if(!toggleRoll) setToggleRoll(true)
  }

  const renderRollButton = () => (
    <Button size='large' type='primary' onClick={handleClickRoll} className='full-width'>Roll</Button>
  )

  const renderSettingsForm = () => (
    <div>
      <Text>Number of dice: {resultNumber}</Text>
      <Row gutter={16} align='middle'>
        <Col>
          <Text>1</Text>
        </Col>
        <Col flex='auto'>
          <Slider value={resultNumber} onChange={value => setResultNumber(value)} min={1} max={10}/>
        </Col>
        <Col>
          <Text>10</Text>
        </Col>
      </Row>
    </div>
  )

  return (<>
    <Navbar
      settingsContent={renderSettingsForm()}
    />
    <div >
      <Row gutter={{xs: 0, md: 40}} wrap={false}>
        <Col flex='400px' className='desktop'>
          {renderRollButton()}
          <div  className='mt-2'/>
          {renderSettingsForm()}
        </Col>
        <Col flex='auto'>
          <Row>
            {results.map(result => (
              <Col className='centering-flex' xs={resultNumber <= 1 ? 24 : 12} md={6}>
                <Die handleAnimationEndDie={handleAnimationEndDie} toggleRoll={toggleRoll} rollResult={result}/>
                <div className='dice-result-container mb-2'>
                {(result && !toggleRoll) && (
                  <Title type='secondary' level={3} className='mb-0'>{result}</Title>
                )}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
    <BottomDrawer>
      {renderRollButton()}
    </BottomDrawer>
  </>)
}

export default Dice;