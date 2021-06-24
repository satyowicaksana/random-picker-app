import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, notification, Modal, Slider, Checkbox } from 'antd'
import { IoIosSettings } from 'react-icons/io'

import { Navbar, BottomDrawer } from 'components'
import './style.less'

const { Title, Text } = Typography

const Numbers = () => {
  const [form] = Form.useForm()
  const [toggleCardZoom, setToggleCardZoom] = useState(false)
  const [randomNumber, setRandomNumber] = useState<number | undefined>(undefined)
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

  const getRandomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
      setRandomNumber(undefined)
    }
    return valid
  }

  const handleFinish = (values: any) => {
    const {min, max} = values
    if(validateForm(values)) {
      setRandomNumber(getRandomInteger(min, max))
      const newResults = []
      for(let i = 0; i < resultNumber; i++) {
        newResults.push(getRandomInteger(min, max))
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

  return (<>
    <Navbar
      topRightContent={
        <div>
          <Title
            level={3}
            className='mb-0'
            onClick={() => setModalVisible(true)}
          >
            <IoIosSettings/>
          </Title>
        </div>
      }
    />
    <div className='numbers-container p-3'>
      <Form form={form} onFinish={handleFinish}>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Row gutter={16} className='mb-2'>
              <Col span={12}>
                <Form.Item name='min'>
                  <InputNumber
                    size='large'
                    placeholder='Min'
                    maxLength={13}
                    onKeyDown={handleInputNumberKeyDown}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => `${value}`.replace(/,*/g, '')}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='max'>
                  <InputNumber
                    size='large'
                    placeholder='Max'
                    maxLength={13}
                    onKeyDown={handleInputNumberKeyDown}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => `${value}`.replace(/,*/g, '')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item className='desktop'>
              <Button type='primary' htmlType='submit' size='large' className='mb-3'>
                Get Random Number
              </Button>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            {results.map(result => (
              <div onAnimationEnd={() => setToggleCardZoom(false)} className={`numbers-card card ${toggleCardZoom ? 'zoom' : ''}`}>
                <div>
                  <Title
                    level={
                      String(result).length <= 3
                      ? 1
                      : String(result).length <= 6
                      ? 2
                      : String(result).length <= 9
                      ? 3
                      : 4
                    }
                  >
                    {`${result}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Title>
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <BottomDrawer>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' className='mb-3'>
              Get Random Number
            </Button>
          </Form.Item>
        </BottomDrawer>
      </Form>
    </div>
    <Modal
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
    >
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
      >Repetition
      </Checkbox>
    </Modal>
  </>)
}

export default Numbers;