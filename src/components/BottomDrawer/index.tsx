import { ReactNode } from 'react'

import './style.less'

type BottomDrawerProps = {
  children?: ReactNode
}

const BottomDrawer = ({
  children
}: BottomDrawerProps) => {
  return (<>
    <div className='bottom-drawer-container mobile p-3'>
      {children}
    </div>
  </>)
}

export default BottomDrawer;