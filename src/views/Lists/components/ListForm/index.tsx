import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { Row, Col, List, Modal, Button, Typography, Form, Input, Anchor } from 'antd'
import { MdModeEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import { db } from 'storage';
import { ListType } from 'interfaces/list';
import { ListsParamTypes } from 'views/Lists/consts';
import { formFields } from './consts';
import './style.less'

const { Title } = Typography

const Lists = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const { id } = useParams<ListsParamTypes>()
  const list = useLiveQuery(() => db.lists.get(Number(id)));

  const [items, setItems] = useState<string[]>([])
  const [editedItemIndex, setEditedItemIndex] = useState(-1)

  useEffect(() => {
    if(list) {
      form.setFieldsValue({
        [formFields.listName]: list.name
      })
      setItems(list.items)
    }
  }, [list, form])

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
      if(id) { //update
        await db.lists.update(Number(id), newList)
      } else { //create
        await db.lists.put(newList)
      }
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

  return (
      <Form form={form}>
        <div className='mb-4'>
            <Form.Item>
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
                  <Anchor onClick={() => handleClickShowEditItemModal(i)}><MdModeEdit/></Anchor>,
                  <Anchor onClick={() => handleClickDeleteItem(i)}><AiFillDelete/></Anchor>
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
  )
}

export default Lists;