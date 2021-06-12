import { useHistory } from 'react-router-dom'
import { Row, Col, Card, Typography } from 'antd'

import { menuItems } from './consts'
import './style.less';

const { Text, Title } = Typography

const Home = () => {
  const history = useHistory()

  return (
    <div className='home-container p-3'>
      <Title level={3} className='mb-2'>Randomize!</Title>
      <Row gutter={24}>
        {menuItems.map(item => (
          <Col key={item.value} span={12}>
            <div onClick={() => history.push(`/${item.value}`)} className='home-card card mb-3 p-1'>
              <div className='home-card-content'>
                <img src={item.imageUrl} alt={item.value} className='mb-2'/>
                <div>
                  <Text type='secondary'>{item.label}</Text>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home;