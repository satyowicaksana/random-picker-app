import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { Row, Col, List, Modal, Button, Typography, Form, Input, Anchor, notification } from 'antd'
import { MdModeEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import { db } from 'storage';
import { ListType } from 'interfaces/list';
import { ListsParamTypes } from 'views/Lists/consts';
import { formFields } from './consts';
import './style.less'

const { Title, Text } = Typography

const Lists = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const { id } = useParams<ListsParamTypes>()
  const list = useLiveQuery(() => id ? db.lists.get(Number(id)) : undefined);

  const [items, setItems] = useState<string[]>([])
  const [editedItemIndex, setEditedItemIndex] = useState(-1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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

  const handleClickUpdateList = async () => {
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
      notification.success({
        message: 'List updated'
      })
    } catch (err) {
      alert('Failed to save list')
    }
  }

  const handleClickDeleteList = async () => {
    try {
      await db.lists.delete(Number(id))
      history.push('/lists')
    } catch (err) {
      alert('Failed to remove list')
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
          <Row justify='space-between'>
            <Col>
              <Form.Item name={formFields.listName}>
                <Input size='large' placeholder='List Name' maxLength={50} className='mb-2'/>
              </Form.Item>
            </Col>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  onClick={handleClickUpdateList}
                  disabled={!form.getFieldValue(formFields.listName) || !items.length}
                  size='large'
                  type='primary'
                >
                  Save List
                </Button>
              )}
            </Form.Item>
          </Row>
          <Row justify='space-between'>
            <Col>
              <Row gutter={16}>
                <Col>
                  <Form.Item name={formFields.itemName}>
                    <Input onPressEnter={handleClickAddItem} size='large' placeholder='New Item' maxLength={50}/>
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
            </Col>
            {id && (
              <Col>
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  size='large'
                  danger
                >
                  Remove List
                </Button>
              </Col>
            )}
          </Row>
        </div>
        <div>
          <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, i) => (
              <List.Item
                actions={[
                  <a href='#' onClick={() => handleClickShowEditItemModal(i)}><MdModeEdit/></a>,
                  <a href='#' onClick={() => handleClickDeleteItem(i)}><AiFillDelete/></a>
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
          visible={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
        >
          <Title level={3}>Delete List</Title>
          <div className='mb-2'>
            <Text>Are you sure you want to delete <Text strong>{list?.name}</Text> list?</Text>
          </div>
          <Row gutter={16} justify='end'>
            <Col>
              <Button size='large'>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button onClick={handleClickDeleteList} size='large' danger type='primary'>
                Delete
              </Button>
            </Col>
          </Row>
        </Modal>
        <Modal
          visible={editedItemIndex > -1}
          onCancel={() => setEditedItemIndex(-1)}
        >
          <Title level={4}>Edit Item</Title>
          <Form.Item name={formFields.editedItemName}>
            <Input onPressEnter={handleClickEditItem} maxLength={50} size='large' placeholder='Item Name' className='mb-2'/>
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