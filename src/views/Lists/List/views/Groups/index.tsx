import { useState, useEffect, KeyboardEventHandler } from 'react'
import { List, Col, InputNumber, Button, Typography, Form, notification, Modal, Slider, Checkbox } from 'antd'

import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { useWindowSize } from 'hooks'
import { randomizer } from 'helpers'
import './style.less'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from 'storage'
import { AiOutlineRight } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'

const { Title, Text } = Typography

const Groups = () => {
  const lists = useLiveQuery(() => db.lists.toArray())

  return (<>
    <div>
      <div className='mb-2'>
        <Text>The list should have more than two items in order to be split into groups.</Text>
      </div>
      <Button icon={<MdEdit className='mr-1'/>} type='primary'>Edit List</Button>
    </div>
  </>)
}

export default Groups;