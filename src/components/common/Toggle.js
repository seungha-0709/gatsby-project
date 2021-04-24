import React, { useState } from 'react'
import classNames from 'classnames'
import { GiHamburgerMenu } from "react-icons/gi"
import { HiOutlineSun } from 'react-icons/hi'
import { RiMoonFill } from 'react-icons/ri'

const Toggle = () => {
  const [toggleShift, setToggleShift] = useState(false)

  const handleToggleClick = () => {
    setToggleShift(!toggleShift)
  }

  return (
    <div>
      <GiHamburgerMenu />
      <div className="toggle-button">
        <div className="toggle-bg">
          <div
            className={classNames('click', toggleShift ? 'dark' : '')}
            onClick={handleToggleClick}
          ></div>
          <RiMoonFill />
          <HiOutlineSun />
        </div>
      </div>
    </div>
  )
}
export default Toggle