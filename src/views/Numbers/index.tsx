import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, Slider, Checkbox } from 'antd'

import { useWindowSize } from 'hooks'
import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { randomizer } from 'helpers'
import { ChangedValues, formFields, FormValues } from './consts'
import './style.less'

const { Title, Text } = Typography

const Numbers = () => {
  const { width } = useWindowSize()
  const [form] = Form.useForm()

  const [toggleCardZoom, setToggleCardZoom] = useState(false)
  const [results, setResults] = useState<number[]>([])
  const [isDisabledHasRepetition, setIsDisabledHasRepetition] = useState(false)

  useEffect(() => {
    if(form) {
      form.setFieldsValue({
        [formFields.min]: 1,
        [formFields.max]: 100,
        [formFields.totalResult]: 1,
        [formFields.hasRepetition]: true
      })
    }
  }, [form])

  const handleChangeForm = (changedValues: ChangedValues, values: FormValues) => {
    const {max, totalResult} = values
    if((changedValues.max || changedValues.totalResult) && (max < totalResult)) { //handle max and totalResult constraint
      form.setFieldsValue({
        [formFields.hasRepetition]: true
      })
      if(!isDisabledHasRepetition) setIsDisabledHasRepetition(true)
    } else {
      if(isDisabledHasRepetition) setIsDisabledHasRepetition(false)
    }
  }

  const handleFinishForm = (values: FormValues) => {
    const {min, max, totalResult, hasRepetition} = values

    const newResults: number[] = []
    if(hasRepetition) {
      for(let i = 0; i < totalResult; i++) {
        newResults.push(randomizer.getRandomInteger(min, max))
      }
    } else {
      while (newResults.length < totalResult) {
        const randomInteger = randomizer.getRandomInteger(min, max)
        if(!newResults.includes(randomInteger)) {
          newResults.push(randomInteger)
        }
      }
    }
    setResults(newResults)
    setToggleCardZoom(true)
  }

  const handleInputNumberKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if(e.key === 'e' || e.key === '.' || e.key === ',') {
      e.preventDefault()
    } 
  }

  const getResultFontSize = (resultLength: number) => {
    if(resultLength >= 7 && width <= windowSizes.md.max) return 24
    if(resultLength >= 4 && width <= windowSizes.md.max) return 40
    if(resultLength >= 9) return 24
    if(resultLength >= 6) return 40
    return 60
  }

  const renderSettingsForm = () => (
    <>
      <div className='mb-1'>
        <Form.Item shouldUpdate>
          {() => (
            <Text>Number of results: {form.getFieldValue(formFields.totalResult)}</Text>
          )}
        </Form.Item>
      </div>
      <Row gutter={16} align='middle' className='mb-2'>
        <Col>
        <Text>1</Text>
        </Col>
        <Col flex='auto'>
        <Form.Item name={formFields.totalResult}>
          <Slider min={1} max={10}/>
        </Form.Item>
        </Col>
        <Col>
        <Text>10</Text>
        </Col>
      </Row>
      <Form.Item name={formFields.hasRepetition} dependencies={[formFields.max, formFields.totalResult]} valuePropName='checked'>
        <Checkbox
          disabled={form.getFieldValue(formFields.max) < form.getFieldValue(formFields.totalResult)}
        >
          Repetition
        </Checkbox>
      </Form.Item>
    </>
  )

  const renderGenerateButton = () => (
    <Form.Item shouldUpdate>
      {() => (
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          disabled={
            !form.getFieldValue(formFields.min) || !form.getFieldValue(formFields.min) ||
            form.getFieldValue(formFields.min) > form.getFieldValue(formFields.max)}
          className='full-width'
        >
          Get Random Number
        </Button>
      )}
    </Form.Item>
  )

  return (
    <Form form={form} onFinish={handleFinishForm} onValuesChange={handleChangeForm}>
      <Navbar
        settingsContent={renderSettingsForm()}
      />
      <div className='content-container'>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Row gutter={16} className='mb-2'>
              <Col span={12}>
                <Form.Item name={formFields.min}>
                  <InputNumber
                    size='large'
                    placeholder='Min'
                    maxLength={13}
                    onKeyDown={handleInputNumberKeyDown}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => `${value}`.replace(/,*/g, '')}
                    className='full-width'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={formFields.max} dependencies={[formFields.min]}>
                  <InputNumber
                    size='large'
                    placeholder='Max'
                    maxLength={13}
                    onKeyDown={handleInputNumberKeyDown}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => `${value}`.replace(/,*/g, '')}
                    className='full-width'
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className='desktop mb-3'>
              {renderGenerateButton()}
            </div>
            <div className='numbers-settings-form-desktop desktop'>
              {renderSettingsForm()}
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div onAnimationEnd={() => setToggleCardZoom(false)} className={`numbers-card card p-3 ${toggleCardZoom ? 'zoom' : ''}`}>
              <div>
                  {results.map(result => (
                <div>
                  <Title
                    style={{
                      fontSize: `${getResultFontSize(results.length)}px`
                    }}
                  >
                    {`${result}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Title>
                </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <BottomDrawer>
        {renderGenerateButton()}
      </BottomDrawer>
    </Form>
  )
}

export default Numbers;