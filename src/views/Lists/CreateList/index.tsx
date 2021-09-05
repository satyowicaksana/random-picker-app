import { useState, useEffect, KeyboardEventHandler } from 'react'
import { Row, Col, List, Avatar, Modal, Button, Typography, Form, notification, Input, Slider, Checkbox } from 'antd'
import { MdModeEdit } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import { Navbar, BottomDrawer } from 'components'
import { ListForm } from 'views/Lists/components'
import { windowSizes } from 'consts'
import { useWindowSize } from 'hooks'
import './style.less'
import { randomizer } from 'helpers'
import { db } from 'storage';
import { ListType } from 'interfaces/list';
import { useHistory } from 'react-router-dom';
import { formFields } from './consts';

const { Title, Text } = Typography
const { Search } = Input

const Lists = () => {

  return (<>
    <Navbar/>
    <div className='content-container'>
      <ListForm/>
    </div>
  </>)
}

export default Lists;