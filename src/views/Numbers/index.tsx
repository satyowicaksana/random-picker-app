import { useState, useEffect } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, notification } from 'antd'
import { KeyboardEventHandler } from 'react'

import './style.less'

const { Title } = Typography

const Numbers = () => {
  const [form] = Form.useForm()
  const [toggleCardZoom, setToggleCardZoom] = useState(false)
  const [randomNumber, setRandomNumber] = useState<number | undefined>(undefined)

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
        <Form.Item>
          <Button type='primary' htmlType='submit' size='large' className='mb-3'>
            Get Random Number
          </Button>
        </Form.Item>
      </Form>
        {randomNumber !== undefined && (
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
                  : 4
                }
              >
                {`${randomNumber}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Title>
            </div>
          </div>
        )}
    </div>
  )
}

export default Numbers;