import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Row, Col, List, Button, Typography, Form, Input } from 'antd'
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'

import { db } from 'storage'
import { Navbar } from 'components'
import { ListType } from 'interfaces/list'
import './style.less'

const { Text } = Typography

const Lists = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const lists = useLiveQuery(() => db.lists.toArray());

  useEffect(() => {
    if(form) {
      form.setFieldsValue({
        min: 1,
        max: 100
      })
    }
  }, [form])

  const handleClickList = (list: ListType) => {
    history.push(`/lists/${list.id}`)
  }

  return (<>
    <Navbar/>
    <div className='content-container'>
      <Form form={form}>
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