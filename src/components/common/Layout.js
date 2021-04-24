import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import classNames from 'classnames'
import { GiConsoleController, GiHamburgerMenu } from "react-icons/Gi"
import { HiOutlineSun } from 'react-icons/Hi'
import { RiMoonFill } from 'react-icons/Ri'
import { IoIosArrowBack } from 'react-icons/Io'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { isDarkShift } from '../../store/dark'
import Img from 'gatsby-image'
import Toggle from './Toggle'
import Lnb from './Lnb'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/


const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    console.log(isDarkShift)
    const [darkToggle, setDarkToggle] = useRecoilState(isDarkShift)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [toggleShift, setToggleShift] = useState(false)

    console.log(darkToggle)
    const handleToggleClick = () => {
        setToggleShift(!toggleShift)
        setDarkToggle(!darkToggle)
    }

    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => { // cleanup 
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const lnbBox = useRef(null)
    const lnbNav = useRef(null)

    useEffect(() => {
        if (windowWidth < 400) {
            lnbNav.current.style.width = '150px'
            lnbNav.current.style.left = '-80%'
            if (isMenuOpen) {
                lnbNav.current.style.transform = 'translateX(140%)'
            } else {
                lnbNav.current.style.transform = 'translateX(0%)'
            }
        } else if (windowWidth < 900) {
            if (isMenuOpen) {
                const lnbBoxWidth = lnbBox.current.offsetWidth
                lnbNav.current.style.width = (lnbBoxWidth * 2.5) + 'px'
                lnbNav.current.style.left = '0px'
            } else {
                lnbNav.current.style.width = '0px'
            }
        } else {
            if (isMenuOpen) {
                const lnbBoxWidth = lnbBox.current.offsetWidth
                lnbNav.current.style.width = (lnbBoxWidth * 1.5) + 'px'
                lnbNav.current.style.left = '0px'
            } else {
                lnbNav.current.style.width = '0px'
            }
        }
    }, [isMenuOpen, windowWidth])

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className={classNames('viewport', darkToggle ? 'darkmode' : '')}>

                <div className="viewport-top">
                    {/* {isHome && } */}
                    {/* The main header section on top of the screen */}
                    <div className="layout-wrap" style={{ display: 'flex' }}>
                        <aside className="lnb-wrap">
                            <div ref={lnbBox} className='lnb-bg'></div>
                        </aside>
                        <div ref={lnbNav} className={classNames('lnb-nav')}>
                            <span style={{ cursor: 'pointer' }}><IoIosArrowBack onClick={handleMenuOpen} style={{ color: '#fff', fontSize: '30px' }} /></span>
                            <div className="site-lnb-nav"><Navigation data={site.navigation} navClass="site-lnb-nav-item" /></div>
                        </div>
                        <div className="content-wrap">
                            <header className="site-head">
                                <div style={{ display: 'flex' }}>
                                    <span className="btn-circle">
                                        <GiHamburgerMenu style={{ fontSize: '20px', color: '#fff' }} onClick={handleMenuOpen} /></span>
                                    <div className="toggle-button">
                                        <div className="toggle-bg">
                                            <div
                                                className={classNames('click', toggleShift ? 'dark' : '')}
                                                onClick={handleToggleClick}
                                            ></div>
                                            <RiMoonFill style={{ color: '#fff', fontSize: '16px' }} />
                                            <HiOutlineSun style={{ color: '#fff', fontSize: '16px' }} />
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <main className="site-main">
                                {/* All the main content gets inserted here, index.js, post.js */}
                                {children}
                            </main>
                            <div className="viewport-bottom">
                                {/* The footer at the very bottom of the screen */}
                                <footer className="site-foot">
                                    <div className="site-foot-nav container">
                                        <div className="site-foot-nav-left">
                                            {/* <Link to="/">{site.title}</Link> */}
                                             © 2021 Published with <a style={{ display: 'inline-block' }} className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>
                                            <span style={{ display: 'block' }}>Designed by Seungha</span>
                                        </div>
                                    </div>
                                </footer>

                            </div>
                        </div>

                    </div>


                </div>
            </div >

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
