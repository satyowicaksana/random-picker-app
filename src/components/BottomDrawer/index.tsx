import { useState, useEffect, ReactNode } from 'react'
import { Row, Col, InputNumber, Button, Typography, Form, notification } from 'antd'
import { KeyboardEventHandler } from 'react'
import ReactCardFlip from 'react-card-flip'

import { cards, spades } from 'assets'
import { randomizer } from 'helpers'
import './style.less'

const { Title } = Typography

type BottomDrawerProps = {
  children?: ReactNode
}

const BottomDrawer = ({
  children
}: BottomDrawerProps) => {
  return (
    <div className='bottom-drawer-container mobile p-3'>
      {children}
    </div>
  )
}

export default BottomDrawer;