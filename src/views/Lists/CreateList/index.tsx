import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, List, Avatar, Button, Typography, Form, notification, Input, Slider, Checkbox } from 'antd'
import { MdModeEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { useWindowSize } from 'hooks'
import './style.less'
import { randomizer } from 'helpers'
import { db } from 'storage';
import { ListType } from 'interfaces/list';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography
const { Search } = Input

const Lists = () => {
  const [form] = Form.useForm()
  const { width } = useWindowSize()
  const history = useHistory()

  const [items, setItems] = useState<string[]>([])

  //settings form
  const [resultNumber, setResultNumber] = useState(1)
  const [hasRepetition, setHasRepetition] = useState(true)

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

  const handleClickAddItem = () => {
    if(form.getFieldValue('newItem')) {
      setItems([...items, form.getFieldValue('newItem')])
    }
  }

  const handleClickSaveList = async () => {
    try {
      const newList: ListType = {
        name: form.getFieldValue('newItem'),
        items: items,
      }
      await db.lists.put(newList)
      history.push('/lists')
    } catch (err) {
      alert('error handleClickSaveList')
    }
  }

  return (<>
    <Navbar
      settingsContent={renderSettingsForm()}
    />
    <div className='content-container'>
      <div className='mb-4'>
        <Form form={form}>
          <Form.Item name='gas'>
            <Row gutter={16} justify='space-between'>
              <Col>
                <Form.Item name='listName'>
                  <Input size='large' placeholder='List Name' className='mb-2'/>
                </Form.Item>
              </Col>
              <Form.Item shouldUpdate>
                {() => (
                  <Button onClick={handleClickSaveList} disabled={!form.getFieldValue('listName')} size='large' type='primary'>Save List</Button>
                )}
              </Form.Item>
            </Row>
          </Form.Item>
          <Row gutter={16}>
            <Col>
              <Form.Item name='newItem'>
                <Input onPressEnter={handleClickAddItem} size='large' placeholder='New Item'/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item shouldUpdate>
                {() => (
                <Button disabled={!form.getFieldValue('newItem')} size='large' type='primary' onClick={handleClickAddItem}>+ Add</Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={items}
          renderItem={item => (
            <List.Item
              actions={[<a><MdModeEdit/></a>, <a key="list-loadmore-more"><AiFillDelete/></a>]}
            >
              <List.Item.Meta
                title={item}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  </>)
}

export default Lists;