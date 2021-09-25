import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Row, Col, List, Button, Typography, Form, Input, ConfigProvider, Empty } from 'antd'
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'

import { db } from 'storage'
import { Navbar } from 'components'
import { ListType } from 'interfaces/list'
import './style.less'
import { useState } from 'react'
import { ChangedValues } from './consts'

const { Text } = Typography

const Lists = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const lists = useLiveQuery(() => db.lists.toArray());

  const [filteredLists, setFilteredLists] = useState(lists)

  useEffect(() => {
    if(form) {
      form.setFieldsValue({
        min: 1,
        max: 100
      })
    }
  }, [form])

  useEffect(() => {
    if(lists) {
      setFilteredLists(lists)
    }
  }, [lists])

  const handleClickCreateList = () => {
    history.push('/lists/create')
  }

  const handleClickList = (list: ListType) => {
    history.push(`/lists/${list.id}`)
  }

  const handleValuesChangeForm = (changedValues: ChangedValues) => {
    const { search } = changedValues
    if(search) {
      setFilteredLists(lists?.filter(list => list.name.includes(search)))
    }
  }

  return (<>
    <Navbar/>
    <div className='content-container'>
      <Form form={form} onValuesChange={handleValuesChangeForm}>
        <Row className='mb-4'>
          <Col xs={24} sm={6}>
            <Form.Item name='search'>
              <Input
                size='large'
                placeholder='Search List'
                disabled={!(lists?.length)}
                suffix={<AiOutlineSearch/>}
              />
            </Form.Item>
          </Col>
        </Row>
        {!!(lists?.length) && (
          <Button onClick={handleClickCreateList} size='large' type='primary' className='button-floating'>
            <FaPlus/>
          </Button>
        )}
        <ConfigProvider renderEmpty={() => (
          <Empty
            image={lists?.length ? Empty.PRESENTED_IMAGE_SIMPLE : undefined}
            description={
              lists?.length ? 'List not found' : (
                <>
                  <div className='mb-2'>
                    <Text strong>No list yet</Text>
                  </div>
                  <Button onClick={handleClickCreateList} size='large' type='primary'>
                    + Add New List
                  </Button>
                </>
              )
            }
          />
        )}>
          <List
            itemLayout="horizontal"
            dataSource={filteredLists}
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
        </ConfigProvider>
      </Form>
    </div>
  </>)
}

export default Lists;