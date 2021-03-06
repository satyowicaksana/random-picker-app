import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Row, Col, InputNumber, Button, Typography, Form, List, notification } from 'antd'
import { MdContentCopy, MdEdit } from 'react-icons/md'

import { randomizer } from 'helpers'
import { db } from 'storage'
import { ListsParamTypes } from 'views/Lists/consts'
import { BottomDrawer } from 'components'
import { tabKey } from '../../consts'
import { formFields } from './consts'
import './style.less'

const { Text } = Typography

const Groups = () => {
  const history = useHistory()
  const { id } = useParams<ListsParamTypes>()

  const [form] = Form.useForm()

  const list = useLiveQuery(() => db.lists.get(Number(id)))

  const [groups, setGroups] = useState<string[][]>([])
  const [toggleZoom, setToggleZoom] = useState(false)

  useEffect(() => {
    form.setFieldsValue({
      [formFields.totalGroup]: 2
    })
  }, [form])

  if(!list) {
    return null
  }

  const handleClickGenerateGroup = () => {
    const newGroups: string[][] = []
    const items = [...list.items]
    let i = 0
    while(items.length > 0) {
      const randomIndex = randomizer.getRandomInteger(0, items.length - 1)
      const randomItem = items[randomIndex]
      items.splice(randomIndex, 1)
      if(!newGroups[i]) {
        newGroups[i] = []
      }
      newGroups[i].push(randomItem)

      if(i < form.getFieldValue(formFields.totalGroup) - 1) {
        i++
      } else {
        i = 0
      }
    }
    setGroups(newGroups)
    setToggleZoom(true)
  }

  const handleClickCopyToClipboard = (group: string) => {
    navigator.clipboard.writeText(group)
    notification.open({
      message: 'Copied to clipboard'
    })
  }

  const renderGenerateGroupButton = () => (
    <Button type='primary' size='large' onClick={handleClickGenerateGroup}>
      Generate Group
    </Button>
  )

  return (<>
    <div>
      <Form form={form}>
        {list.items.length <= 2 ? (
          <>
            <div className='mb-2'>
              <Text>The list should have more than two items in order to be split into groups.</Text>
            </div>
            <Button
              icon={<MdEdit className='mr-1'/>}
              type='primary'
              size='large'
              onClick={() => history.replace(`/lists/${id}/${tabKey.edit}`)}
            >
              Edit List
            </Button>
          </>
        ) : (<>
            <Row align='middle' gutter={{xs: 0, md: 12}} className='mb-4'>
              <Col>
                <Row align='middle' gutter={8}>
                  <Col>
                    <Text>Number of groups:</Text>
                  </Col>
                  <Col >
                    <Form.Item name={formFields.totalGroup} className='groups-form-item' >
                      <InputNumber size='large' min={2} max={list.items.length - 1}/>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col className='desktop'>
                {renderGenerateGroupButton()}
              </Col>
            </Row>
            <div onAnimationEnd={() => setToggleZoom(false)} className={`groups-lists-container ${toggleZoom ? 'zoom' : ''}`}>
              <List
                itemLayout="horizontal"
                dataSource={groups}
                renderItem={group => (
                  <List.Item
                    actions={[
                      <Button type='link' onClick={() => handleClickCopyToClipboard(group.join(', '))}><MdContentCopy/></Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<Text strong>{group.join(', ')}</Text>}
                    />
                  </List.Item>
                )}
                className='list-selectable shuffle-lists'
              />
            </div>
        </>)}
        <BottomDrawer className='list-button-bottom-drawer'>
          {renderGenerateGroupButton()}
        </BottomDrawer>
        <div className='list-bottom-drawer-padding'/>
      </Form> 
    </div>
  </>)
}

export default Groups;