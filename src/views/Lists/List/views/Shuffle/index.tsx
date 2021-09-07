import { useState, useEffect, KeyboardEventHandler } from 'react'
import { List, Col, InputNumber, Button, Typography, Form, notification, Modal, Slider, Checkbox } from 'antd'

import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { useWindowSize } from 'hooks'
import { randomizer } from 'helpers'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from 'storage'
import { AiOutlineRight } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { ListsParamTypes } from 'views/Lists/consts'
import './style.less'

const { Title, Text } = Typography

const Shuffle = () => {
  const { id } = useParams<ListsParamTypes>()

  const list = useLiveQuery(() => db.lists.get(Number(id)))

  const [shuffledItems, setShuffledItems] = useState<string[]>([])
  const [toggleZoom, setToggleZoom] = useState(false)

  const handleClickShuffle = () => {
    if(list) {
      const newItems = randomizer.shuffleArray([...list.items])
      setShuffledItems(newItems)
    }
    setToggleZoom(true)
  }

  useEffect(() => {
    if(list) {
      setShuffledItems([...list.items])
    }
  }, [list])

  return (<>
    <div>
      <Button
        type='primary'
        size='large'
        onClick={handleClickShuffle}
        className='mb-4'
      >
        Shuffle
      </Button>
      <div onAnimationEnd={() => setToggleZoom(false)} className={`shuffle-lists-container ${toggleZoom ? 'zoom' : ''}`}>
        <List
          itemLayout="horizontal"
          dataSource={shuffledItems}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<Text strong>{item}</Text>}
              />
            </List.Item>
          )}
          className='list-selectable shuffle-lists'
        />
      </div>
    </div>
  </>)
}

export default Shuffle;