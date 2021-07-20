import { useHistory } from 'react-router-dom'
import { Row, Col, Card, Typography } from 'antd'

import { menuItems } from './consts'
import './style.less';
import { Navbar } from 'components';

const { Text, Title } = Typography

const Home = () => {
  const history = useHistory()

  return (<>
    <Navbar/>
    <div className='home-container p-3'>
      <Row gutter={24}>
        {menuItems.map(item => (
          <Col key={item.value} xs={12} md={6}>
            <div onClick={() => history.push(`/${item.value}`)} className='home-card card clickable mb-3 p-1'>
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
  </>)
}

export default Home;