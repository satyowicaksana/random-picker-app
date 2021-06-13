import { useState } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form } from 'antd'
import { KeyboardEventHandler } from 'react'

import './style.less'

const { Title } = Typography

const Numbers = () => {
  const [form] = Form.useForm()
  const [toggleCardZoom, setToggleCardZoom] = useState(false)
  const [randomNumber, setRandomNumber] = useState<number | undefined>(undefined)

  const getRandomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleFinish = (values: any) => {
    const {min, max} = values
    if(min && max) {
      setRandomNumber(getRandomInteger(min, max))
      setToggleCardZoom(true)
    }
  }

  const handleInputNumberKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if(e.key === 'e' || e.key === '.' || e.key === ',') {
      e.preventDefault()
    } 
  }

  return (
    <div className='numbers-container'>
      <Form  form={form} onFinish={handleFinish}>
        <Row gutter={16} className='mb-2'>
          <Col span={12}>
            <Form.Item name='min'>
              <InputNumber
                type='number'
                size='large'
                placeholder='Min' 
                onKeyDown={handleInputNumberKeyDown}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='max'>
              <InputNumber
                type='number'
                size='large'
                placeholder='Max' 
                onKeyDown={handleInputNumberKeyDown}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type='primary' htmlType='submit' size='large' className='mb-3'>
            Get Random Number
          </Button>
        </Form.Item>
      </Form>
        <div onAnimationEnd={() => setToggleCardZoom(false)} className={`numbers-card card ${toggleCardZoom && 'zoom'}`}>
          <div>
            <Title
              level={
                String(randomNumber).length <= 3
                ? 1
                : String(randomNumber).length <= 6
                ? 2
                : String(randomNumber).length <= 9
                ? 3
                : String(randomNumber).length <= 12
                ? 4
                : 5
              }
            >
              {randomNumber}
            </Title>
          </div>
        </div>
    </div>
  )
}

export default Numbers;