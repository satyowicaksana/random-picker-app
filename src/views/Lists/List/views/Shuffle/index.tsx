import { useState, useEffect, KeyboardEventHandler } from 'react'
import { List, Col, InputNumber, Button, Typography, Form, notification, Modal, Slider, Checkbox } from 'antd'

import { Navbar, BottomDrawer } from 'components'
import { windowSizes } from 'consts'
import { useWindowSize } from 'hooks'
import { randomizer } from 'helpers'
import './style.less'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from 'storage'
import { AiOutlineRight } from 'react-icons/ai'

const { Title, Text } = Typography

const Shuffle = () => {
  const lists = useLiveQuery(() => db.lists.toArray())

  const [shuffledLists, setShuffledLists] = useState(lists)
  const [toggleZoom, setToggleZoom] = useState(false)

  const handleClickShuffle = () => {
    if(lists) {
      const newLists = randomizer.shuffleArray([...lists])
      setShuffledLists(newLists)
    }
    setToggleZoom(true)
  }

  useEffect(() => {
    setShuffledLists(lists)
  }, [lists])

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
          dataSource={shuffledLists}
          renderItem={list => (
            <List.Item>
              <List.Item.Meta
                title={<Text strong>{list.name}</Text>}
                description={`${list.items.length} items`}
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