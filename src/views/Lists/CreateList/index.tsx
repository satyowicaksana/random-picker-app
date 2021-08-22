import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, List, Avatar, Modal, Button, Typography, Form, notification, Input, Slider, Checkbox } from 'antd'
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
import { formFields } from './consts';

const { Title, Text } = Typography
const { Search } = Input

const Lists = () => {
  const [form] = Form.useForm()
  const { width } = useWindowSize()
  const history = useHistory()

  const [items, setItems] = useState<string[]>([])
  const [editedItemIndex, setEditedItemIndex] = useState(-1)

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
    if(form.getFieldValue(formFields.itemName)) {
      setItems([...items, form.getFieldValue(formFields.itemName)])
    }
    form.resetFields([formFields.itemName])
  }

  const handleClickSaveList = async () => {
    try {
      const newList: ListType = {
        name: form.getFieldValue(formFields.listName),
        items: items,
      }
      await db.lists.put(newList)
      history.push('/lists')
    } catch (err) {
      alert('error handleClickSaveList')
    }
  }

  const handleClickShowEditItemModal = (itemIndex: number) => {
    setEditedItemIndex(itemIndex)
    form.setFieldsValue({
      [formFields.editedItemName]: items[itemIndex]
    })
  }

  const handleClickEditItem = () => {
    const newItems = [...items]
    newItems[editedItemIndex] = form.getFieldValue(formFields.editedItemName)
    setItems(newItems)
    setEditedItemIndex(-1)
  }

  const handleClickDeleteItem = (itemIndex: number) => {
    setItems([...items].filter((_, i) => i !== itemIndex))
  }

  return (<>
    <Navbar
      settingsContent={renderSettingsForm()}
    />
    <div className='content-container'>
      <Form form={form}>
        <div className='mb-4'>
            <Form.Item name='gas'>
              <Row gutter={16} justify='space-between'>
                <Col>
                  <Form.Item name={formFields.listName}>
                    <Input size='large' placeholder='List Name' className='mb-2'/>
                  </Form.Item>
                </Col>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      onClick={handleClickSaveList}
                      disabled={!form.getFieldValue(formFields.listName) || !items.length}
                      size='large'
                      type='primary'
                    >
                      Save List
                    </Button>
                  )}
                </Form.Item>
              </Row>
            </Form.Item>
            <Row gutter={16}>
              <Col>
                <Form.Item name={formFields.itemName}>
                  <Input onPressEnter={handleClickAddItem} size='large' placeholder='New Item'/>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button disabled={!form.getFieldValue(formFields.itemName)} size='large' type='primary' onClick={handleClickAddItem}>+ Add</Button>
                  )}
                </Form.Item>
              </Col>
            </Row>
        </div>
        <div>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, i) => (
              <List.Item
                actions={[
                  <a onClick={() => handleClickShowEditItemModal(i)}><MdModeEdit/></a>,
                  <a onClick={() => handleClickDeleteItem(i)}><AiFillDelete/></a>
                ]}
              >
                <List.Item.Meta
                  title={item}
                />
              </List.Item>
            )}
            className='selectable'
          />
        </div>
        <Modal
          visible={editedItemIndex > -1}
          onCancel={() => setEditedItemIndex(-1)}
        >
          <Title level={4}>Edit Item</Title>
          <Form.Item name={formFields.editedItemName}>
            <Input onPressEnter={handleClickEditItem} size='large' placeholder='Item Name' className='mb-2'/>
          </Form.Item>
          <Row justify='end'>
            <Col>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    onClick={handleClickEditItem}
                    disabled={!form.getFieldValue(formFields.editedItemName)}
                    size='large'
                    type='primary'
                  >
                    Edit
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Modal>
      </Form>
    </div>
  </>)
}

export default Lists;