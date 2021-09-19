import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, Slider, Checkbox, Tooltip, notification } from 'antd'

import { useWindowSize } from 'hooks'
import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { randomizer } from 'helpers'
import { ChangedValues, formFields, FormValues } from './consts'
import './style.less'
import { MdContentCopy } from 'react-icons/md'

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
    if(width <= windowSizes.sm.max) { //mobile
      if(resultLength >= 6) return 6
      return 10
    } else { //desktop
      if(resultLength >= 7) return 2
      if(resultLength >= 5) return 3
      return 4
    }
  }

  const handleClickCopyToClipboard = () => {
    navigator.clipboard.writeText(results.join(', '))
    notification.open({
      message: 'Copied to clipboard'
    })
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
          {!!(results.length) && (
            <Col xs={24} md={12}>
              <div onAnimationEnd={() => setToggleCardZoom(false)} className={`numbers-card card p-3 ${toggleCardZoom ? 'zoom' : ''}`}>
                <Tooltip title='Copy to clipboard'>
                  <MdContentCopy
                    size={24}
                    onClick={handleClickCopyToClipboard}
                    className='numbers-copy-icon clickable'
                  />
                </Tooltip>
                <div>
                    {results.map(result => (
                  <div>
                    <Title
                      style={{
                        fontSize: `${getResultFontSize(results.length)}vw`
                      }}
                    >
                      {`${result}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Title>
                  </div>
                  ))}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
      <BottomDrawer>
        {renderGenerateButton()}
      </BottomDrawer>
    </Form>
  )
}

export default Numbers;