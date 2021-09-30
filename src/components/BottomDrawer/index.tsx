import { ReactNode } from 'react'

import './style.less'

type BottomDrawerProps = {
  className?: string
  children?: ReactNode
}

const BottomDrawer = ({
  className,
  children
}: BottomDrawerProps) => {
  return (<>
    <div className={`bottom-drawer-container mobile p-3 ${className}`}>
      {children}
    </div>
  </>)
}

export default BottomDrawer;