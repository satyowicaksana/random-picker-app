import { Navbar } from 'components'
import { ListForm } from 'views/Lists/components'
import './style.less'

const Lists = () => {

  return (<>
    <Navbar/>
    <div className='content-container'>
      <ListForm/>
    </div>
  </>)
}

export default Lists;