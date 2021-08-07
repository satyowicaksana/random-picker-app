import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, notification, Input, Slider, Checkbox } from 'antd'

import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { useWindowSize } from 'hooks'
import './style.less'
import { randomizer } from 'helpers'

const { Title, Text } = Typography
const { Search } = Input

const Lists = () => {
  const [form] = Form.useForm()
  const { width } = useWindowSize()

  const [toggleCardZoom, setToggleCardZoom] = useState(false)
  const [results, setResults] = useState<number[]>([])
  const [modalVisible, setModalVisible] = useState(false)

  //settings form
  const [resultNumber, setResultNumber] = useState(1)
  const [hasRepetition, setHasRepetition] = useState(true)

  useEffect(() => {
    if(form) {
      form.setFieldsValue({
        min: 1,
        max: 100
      })
    }
  }, [form])

  const validateForm = (values: any) => {
    const {min, max} = values
    let valid = true
    if(!min || !max) {
      notification.error({
        message: 'Please input the number range',
        placement: 'bottomRight',
        duration: 2,
        key: 'number-range-error',
      })
      valid = false
    } else if(min > max) {
      notification.error({
        message: 'Min cannot be larger than max',
        placement: 'bottomRight',
        duration: 2,
        key: 'number-larger-error',
      })
      valid = false
    }
    if(!valid) {
      setResults([])
    }
    return valid
  }

  const handleFinish = (values: any) => {
    const {min, max} = values
    if(validateForm(values)) {
      const newResults = []
      for(let i = 0; i < resultNumber; i++) {
        newResults.push(randomizer.getRandomInteger(min, max))
      }
      setResults(newResults)
      setToggleCardZoom(true)
    }
  }

  const handleInputNumberKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if(e.key === 'e' || e.key === '.' || e.key === ',') {
      e.preventDefault()
    } 
  }

  const getResultFontSize = (resultLength: number) => {
    if(resultLength <= 1) return 72
    if(resultLength >= 10 && width >= windowSizes.md.min) return 16
    if(resultLength >= 5 && width >= windowSizes.md.min) return 20
    return 32
  }

  const renderSettingsForm = () => (
    <>
      <div className='mb-1'>
        <Text>Number of results: {resultNumber}</Text>
      </div>
      <Row gutter={16} align='middle' className='mb-2'>
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
      <Checkbox
        checked={hasRepetition}
      >
        Repetition
      </Checkbox>
    </>
  )

  const renderGenerateButton = () => (
    <Form.Item>
      <Button type='primary' htmlType='submit' size='large'>
        LIST
      </Button>
    </Form.Item>
  )

  return (<>
    <Navbar
      settingsContent={renderSettingsForm()}
    />
    <div className='content-container'>
      <Form form={form} onFinish={handleFinish}>
        <Row justify='space-between'>
          <Col span={6}>
            <Form.Item className='mb-2'>
              <Search size='large' placeholder='Search List'/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className='mb-2'>
              <Button size='large' type='primary'>+ New List</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </>)
}

export default Lists;