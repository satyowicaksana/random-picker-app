import { useState, useEffect, ReactNode } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Row, Col, Card, Typography } from 'antd'
import { IoIosArrowBack } from 'react-icons/io'

import { titlesMap } from './consts'
import './style.less';

const { Text, Title } = Typography

type NavbarProps = {
  topRightContent?: ReactNode
}

const Navbar = ({
  topRightContent
}: NavbarProps) => {
  const history = useHistory()
  const location = useLocation()

  const [showArrowBack, setShowArrowBack] = useState(false)
  
  useEffect(() => {
    setShowArrowBack(location.pathname !== '/')
  }, [location])

  return (
    <div className='navbar-container px-3'>
      <Row align='middle' justify='space-between' className='full-width'>
        <Col>
          <Row gutter={16} align='middle'>
            {showArrowBack && (
              <Col>
                <div onClick={() => history.goBack()} className='card p-1 clickable'>
                  <Title level={3} className='mb-0 centering-flex'><IoIosArrowBack/></Title>
                </div>
              </Col>
            )}
            <Col>
              <Title level={3} className='mb-0'>{titlesMap[location.pathname]}</Title>
            </Col>
          </Row>
        </Col>
        <Col>
          {topRightContent}
        </Col>
      </Row>
    </div>
  )
}

export default Navbar;