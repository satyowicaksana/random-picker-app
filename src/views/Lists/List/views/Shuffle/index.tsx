import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { List, Button, Typography } from 'antd'

import { randomizer } from 'helpers'
import { db } from 'storage'
import { ListsParamTypes } from 'views/Lists/consts'
import './style.less'

const { Text } = Typography

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