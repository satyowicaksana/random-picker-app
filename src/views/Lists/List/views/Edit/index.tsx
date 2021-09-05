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
import { useHistory, useParams } from 'react-router-dom'
import { ListForm } from 'views/Lists/components'

const { Title, Text } = Typography

const Edit = () => {
  return (<>
    <div>
      <ListForm/>
    </div>
  </>)
}

export default Edit;