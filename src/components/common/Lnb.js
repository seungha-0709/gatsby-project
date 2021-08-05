import React, { useState } from 'react'
import classNames from 'classnames'
import Navigation from './Navigation'

const Lnb = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <div className='lnb-bg'>
      <div>
        {/* <div className={classNames('lnb-nav', isMenuOpen ? 'open' : '')}> */}
        <Navigation />
      </div>
    </div>
  )
}
export default Lnb;