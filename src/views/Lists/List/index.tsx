import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col, Menu } from 'antd'
import { MdEdit, MdGroup, MdShuffle, MdList } from 'react-icons/md';

import { db } from 'storage';
import { ListType } from 'interfaces/list';
import { Navbar } from 'components'
import { Element, Shuffle, Groups, Edit } from './views'
import { ListsParamTypes } from '../consts';
import { tabKey } from './consts';
import './style.less'

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