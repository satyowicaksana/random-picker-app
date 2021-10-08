import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { Row, Col, List, Modal, Button, Typography, Form, Input, notification } from 'antd'
import { MdModeEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import { db } from 'storage';
import { ListType } from 'interfaces/list';
import { ListsParamTypes } from 'views/Lists/consts';
import { BottomDrawer } from 'components'
import { formFields } from './consts';
import './style.less'
import { windowSizes } from 'consts';
import { useWindowSize } from 'hooks';

const { Title, Text, Paragraph } = Typography

const Lists = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { width } = useWindowSize()

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
        notification.success({
          message: 'List updated'
        })
      } else { //create
        await db.lists.put(newList)
        history.goBack()
        notification.success({
          message: 'List created'
        })
      }
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

  const renderRemoveListButton = () => (
    <Button
      onClick={() => setShowDeleteModal(true)}
      size='large'
      danger
    >
      Remove List
    </Button>
  )

  const renderSaveListButton = () => (
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
  )

  const renderAddItemButton = () => (
    <Form.Item shouldUpdate>
      {() => (
        <Button disabled={!form.getFieldValue(formFields.itemName)} size='large' type='primary' onClick={handleClickAddItem}>+ Add</Button>
      )}
    </Form.Item>
  )

  return (
    <Form form={form}>
      <div className='mb-4'>
        <Row justify='space-between'>
          <Col span={width <= windowSizes.sm.max ? 24 : undefined}>
            <Form.Item name={formFields.listName}>
              <Input size='large' placeholder='List Name' maxLength={50} className='mb-2'/>
            </Form.Item>
          </Col>
          <Col className='desktop'>
            {renderSaveListButton()}
          </Col>
        </Row>
        <Row justify='space-between'>
          <Col span={width <= windowSizes.sm.max ? 24 : undefined}>
            <Row gutter={{xs: 0, md: 16}}>
              <Col span={width <= windowSizes.sm.max ? 24 : undefined}>
                <Form.Item name={formFields.itemName}>
                  <Input onPressEnter={handleClickAddItem} size='large' placeholder='New Item' maxLength={50}/>
                </Form.Item>
              </Col>
              <Col className='desktop'>
                {renderAddItemButton()}
              </Col>
            </Row>
          </Col>
          {id && (
            <Col className='desktop'>
              {renderRemoveListButton()}
            </Col>
          )}
        </Row>
        <Row gutter={16} justify='space-between' className='mobile mt-2'>
          <Col>
            {renderAddItemButton()}
          </Col>
          <Col>
            {renderRemoveListButton()}
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
                <Button type='link' href='#' onClick={() => handleClickShowEditItemModal(i)}><MdModeEdit/></Button>,
                <Button type='link' href='#' onClick={() => handleClickDeleteItem(i)}><AiFillDelete/></Button>
              ]}
            >
              <List.Item.Meta
                title={<Paragraph ellipsis strong className='mb-0'>{item}</Paragraph>}
              />
            </List.Item>
          )}
          className='selectable'
        />
      </div>
      <div className='list-bottom-drawer-padding'/>
      <BottomDrawer className='list-button-bottom-drawer'>
        {renderSaveListButton()}
      </BottomDrawer>
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