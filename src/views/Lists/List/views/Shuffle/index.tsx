import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { List, Button, Typography } from 'antd'

import { randomizer } from 'helpers'
import { db } from 'storage'
import { ListsParamTypes } from 'views/Lists/consts'
import { BottomDrawer } from 'components'
import './style.less'

const { Paragraph } = Typography

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

  const renderShuffleButton = () => (
    <Button
        type='primary'
        size='large'
        onClick={handleClickShuffle}
        className='mb-4'
      >
        Shuffle
      </Button>
  )

  return (<>
    <div className='shuffle-container'>
      <div className='desktop'>
        {renderShuffleButton()}
      </div>
      <div onAnimationEnd={() => setToggleZoom(false)} className={`shuffle-lists-container ${toggleZoom ? 'zoom' : ''}`}>
        <List
          itemLayout="horizontal"
          dataSource={shuffledItems}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<Paragraph ellipsis strong className='mb-0'>{item}</Paragraph>}
              />
            </List.Item>
          )}
          className='list-selectable shuffle-lists'
        />
      </div>
      <BottomDrawer className='list-button-bottom-drawer'>
        {renderShuffleButton()}
      </BottomDrawer>
    </div>
  </>)
}

export default Shuffle;