import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Row, Col, Card, Typography } from 'antd'
import { IoIosArrowBack } from 'react-icons/io'

import { titlesMap } from './consts'
import './style.less';

const { Text, Title } = Typography

const Navbar = () => {
  const history = useHistory()
  const location = useLocation()

  const [showArrowBack, setShowArrowBack] = useState(false)
  
  useEffect(() => {
    setShowArrowBack(location.pathname !== '/')
  }, [location])

  return (
    <div className='navbar-container px-3'>
      <div>
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
      </div>
    </div>
  )
}

export default Navbar;