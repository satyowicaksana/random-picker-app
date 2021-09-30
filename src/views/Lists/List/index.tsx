import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Menu, Typography } from 'antd'
import { MdEdit, MdGroup, MdShuffle, MdList } from 'react-icons/md';

import { db } from 'storage';
import { ListType } from 'interfaces/list';
import { Navbar, BottomDrawer } from 'components'
import { Element, Shuffle, Groups, Edit } from './views'
import { ListsParamTypes } from '../consts';
import { tabKey } from './consts';
import './style.less'

const { Text } = Typography

const Lists = () => {
  const history = useHistory()
  const { id, tab = tabKey.element } = useParams<ListsParamTypes>()

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
  }, [id])

  useEffect(() => {
  }, [tab])

  const handleClickChangeTab = (key: string) => {
    history.replace(`/lists/${id}/${key}`)
  }

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
      case tabKey.edit:
        return <Edit/>
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
    <div className='content-container list-content-container'>
      <Row gutter={40} wrap={false}>
        <Col className='desktop'>
          <Menu selectedKeys={[tab]} inlineCollapsed>
            {menuItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon} onClick={() => handleClickChangeTab(item.key)}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col flex='auto'>
          {renderContent()}
        </Col>
      </Row>
    </div>
    <BottomDrawer>
      <Row>
        {menuItems.map(item => (
          <Col span={6} onClick={() => handleClickChangeTab(item.key)} className={`list-tab-icon-container ${item.key === tab ? 'selected' : ''}`}>
            {item.icon}
            <Text>{item.label}</Text>
          </Col>
        ))}
      </Row>
    </BottomDrawer>
  </>)
}

export default Lists;