import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Button, Typography, Form, Tooltip, Row, Col, notification } from 'antd'

import { randomizer } from 'helpers'
import { db } from 'storage'
import { BottomDrawer } from 'components'
import { ListsParamTypes } from 'views/Lists/consts'
import { MdContentCopy } from 'react-icons/md'
import './style.less'
import { useWindowSize } from 'hooks'
import { windowSizes } from 'consts'

const { Title } = Typography

const Element = () => {
  const { id } = useParams<ListsParamTypes>()
  const { width } = useWindowSize()

  const list = useLiveQuery(() => db.lists.get(Number(id)))

  const [form] = Form.useForm()

  const [toggleCardZoom, setToggleCardZoom] = useState(false)
  const [result, setResult] = useState('')

  //settings form

  useEffect(() => {
    if(form) {
      form.setFieldsValue({
        min: 1,
        max: 100
      })
    }
  }, [form])

  const handleFinish = () => {
    if(list) {
      setResult(list.items[randomizer.getRandomInteger(0, list.items.length - 1)])
      setToggleCardZoom(true)
    }
  }

  const renderGenerateButton = () => (
    <Form.Item>
      <Button type='primary' htmlType='submit' size='large'>
        Get Random Element
      </Button>
    </Form.Item>
  )

  const handleClickCopyToClipboard = () => {
    navigator.clipboard.writeText(result)
    notification.open({
      message: 'Copied to clipboard'
    })
  }

  return (<>
    <Form form={form} onFinish={handleFinish}>
      <Row>
        <Col span={12} className='desktop'>
          {renderGenerateButton()}
        </Col>
        <Col xs={24} md={12}>
          <div onAnimationEnd={() => setToggleCardZoom(false)} className={`element-card card ${toggleCardZoom ? 'zoom' : ''} p-3`}>
            {result && (
              <Tooltip title='Copy to clipboard'>
                <MdContentCopy
                  size={24}
                  onClick={handleClickCopyToClipboard}
                  className='element-copy-icon clickable'
                />
              </Tooltip>
            )}
            <div>
              <Title level={width <= windowSizes.sm.max ? 2 : 1} ellipsis={{rows: 2, tooltip: true}}>
                {result}
              </Title>
            </div>
          </div>
        </Col>
      </Row>
      <BottomDrawer className='list-button-bottom-drawer'>
        {renderGenerateButton()}
      </BottomDrawer>
    </Form>
  </>)
}

export default Element;