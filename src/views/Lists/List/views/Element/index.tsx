import { useState, useEffect } from 'react'
import { Button, Typography, Form } from 'antd'

import { BottomDrawer } from 'components'
import { randomizer } from 'helpers'
import { ListsParamTypes } from 'views/Lists/consts'
import { useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from 'storage'
import './style.less'

const { Title, Text } = Typography

const Element = () => {
  const { id } = useParams<ListsParamTypes>()

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

  return (<>
    <Form form={form} onFinish={handleFinish}>
      <div className='element-content-container'>
        <div className='desktop mb-3'>
          {renderGenerateButton()}
        </div>
        {result && (
          <div onAnimationEnd={() => setToggleCardZoom(false)} className={`element-card card ${toggleCardZoom ? 'zoom' : ''}`}>
            <div>
              <Title>
                {result}
              </Title>
            </div>
          </div>
        )}
      </div>
      <BottomDrawer>
        {renderGenerateButton()}
      </BottomDrawer>
    </Form>
  </>)
}

export default Element;