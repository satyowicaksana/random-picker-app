import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, List, Button, Typography, Form, notification, Input, Slider, Checkbox } from 'antd'
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { useLiveQuery } from 'dexie-react-hooks'

import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { useWindowSize } from 'hooks'
import './style.less'
import { randomizer } from 'helpers'
import { useHistory } from 'react-router-dom'
import { db } from 'storage'
import { ListType } from 'interfaces/list'

const { Title, Text } = Typography

const Lists = () => {
  const [form] = Form.useForm()
  const { width } = useWindowSize()
  const history = useHistory()

  const lists = useLiveQuery(() => db.lists.toArray());

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

  const handleClickList = (list: ListType) => {
    history.push(`/lists/${list.id}`)
  }

  return (<>
    <Navbar
      settingsContent={renderSettingsForm()}
    />
    <div className='content-container'>
      <Form form={form} onFinish={handleFinish}>
        <Row className='mb-4'>
          <Col span={6}>
            <Form.Item>
              <Input size='large' placeholder='Search List' suffix={<AiOutlineSearch/>}/>
            </Form.Item>
          </Col>
        </Row>
        <Button onClick={() => history.push('/lists/create')} size='large' type='primary' className='button-floating'>
          <FaPlus/>
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={lists}
          renderItem={list => (
            <List.Item
              actions={[<AiOutlineRight/>]}
              onClick={() => handleClickList(list)}
            >
              <List.Item.Meta
                title={<Text strong>{list.name}</Text>}
                description={`${list.items.length} items`}
              />
            </List.Item>
          )}
          className='list-selectable'
        />
      </Form>
    </div>
  </>)
}

export default Lists;