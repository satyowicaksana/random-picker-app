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
import { useLiveQuery } from 'dexie-react-hooks';
import { useHistory, useParams } from 'react-router-dom';
import { ListType } from 'interfaces/list';

const { Title, Text } = Typography
const { Search } = Input

type ParamTypes = {
  id: string
}

const Lists = () => {
  const [form] = Form.useForm()
  const { width } = useWindowSize()
  const history = useHistory()
  const params = useParams<ParamTypes>()

  const [list, setList] = useState<ListType | undefined>(undefined)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const getList = async () => {
      const list = await db.lists.get(Number(params.id))
      if(!list) {
        setNotFound(true)
      } else {
        setList(list)
      }
    }
    getList()
  }, [])

  const renderContent = () => {
    if (notFound) return (
      <p>not found</p>
    )
  
    if(!list) return (
      <p>loading</p>
    )

    return (
      <div>
        {JSON.stringify(list.id)}
      </div>
    )
  }


  return (<>
    <Navbar title={list?.name}/>
    <div className='content-container'>
      {renderContent()}
    </div>
  </>)
}

export default Lists;