import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, List, Avatar, Modal, Button, Typography, Form, notification, Input, Menu, Checkbox } from 'antd'
import { MdEdit, MdGroup, MdShuffle, MdList } from 'react-icons/md';

import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { useWindowSize } from 'hooks'
import { randomizer } from 'helpers'
import { db } from 'storage';
import { useHistory, useParams } from 'react-router-dom';
import { ListType } from 'interfaces/list';
import {
  Element, Shuffle, Groups
} from './views'
import './style.less'
import { tabKey } from './consts';

const { Title, Text } = Typography
const { Search } = Input

type ParamTypes = {
  id: string
  tab?: string
}

const Lists = () => {
  const [form] = Form.useForm()
  const { width } = useWindowSize()
  const history = useHistory()
  const { id, tab = tabKey.element } = useParams<ParamTypes>()

  const [list, setList] = useState<ListType | undefined>(undefined)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const getList = async () => {
      const list = await db.lists.get(Number(id))
      if(!list) {
        setNotFound(true)
      } else {
        setList(list)
      }
    }
    getList()
  }, [])

  useEffect(() => {
  }, [tab])

  const renderContent = () => {
    if (notFound) return (
      <p>not found</p>
    )
  
    if(!list) return (
      <p>loading</p>
    )

    switch (tab) {
      case tabKey.shuffle:
        return <Shuffle/>
      case tabKey.groups:
        return <Groups/>
      default:
        return <Element/>
    }
  }

  const menuItems = [
    {
      key: tabKey.element,
      icon: <MdList />,
      label: 'Element'
    },
    {
      key: tabKey.shuffle,
      icon: <MdShuffle />,
      label: 'Shuffle'
    },
    {
      key: tabKey.groups,
      icon: <MdGroup />,
      label: 'Group'
    },
    {
      key: tabKey.edit,
      icon: <MdEdit />,
      label: 'Edit'
    }
  ]


  return (<>
    <Navbar title={list?.name}/>
    <div className='content-container'>
      <Row gutter={40}>
        <Col>
          <Menu selectedKeys={[tab]} inlineCollapsed>
            {menuItems.map(menu => (
              <Menu.Item key={menu.key} icon={menu.icon} onClick={() => history.push(`/lists/${id}/${menu.key}`)}>
                {menu.label}
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col flex='auto'>
          {renderContent()}
        </Col>
      </Row>
    </div>
  </>)
}

export default Lists;