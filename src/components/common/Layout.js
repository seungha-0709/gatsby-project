import React, { useEffect, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import classNames from 'classnames'
import { GiConsoleController, GiHamburgerMenu } from "react-icons/gi"
import { HiOutlineSun } from 'react-icons/hi'
import { RiMoonFill } from 'react-icons/ri'
import { FiChevronsLeft } from 'react-icons/fi'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { isDarkShift, isToggle } from '../../store/dark'
import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';



import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'
import '../../styles/fonts.css'

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

    const [isDark, setIsDark] = useRecoilState(isDarkShift)
    const [isToggleDark, setIsToggleDark] = useRecoilState(isToggle)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleToggleClick = () => {
        setIsToggleDark(!isToggleDark)
        setIsDark(!isDark)
    }

    const handleMenuOpen = useCallback(() => {
        setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen])

    const [windowWidth, setWindowWidth] = useState(null)
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize);
        return () => { // cleanup 
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const lnbBox = useRef(null)
    const lnbNav = useRef(null)

    useEffect(() => {
        lnbNav.current.style.display = 'flex'
        if (windowWidth < 400) {
            lnbNav.current.style.width = '100px'
            lnbNav.current.style.left = '-100px'
            if (isMenuOpen) {
                lnbNav.current.style.width = windowWidth / 1.2 + 'px'
            } else {
                lnbNav.current.style.width = '100px'
            }
        } else {
            lnbNav.current.style.left = '-10%'
            lnbNav.current.style.width = '0px'
            if (isMenuOpen) {
                lnbNav.current.style.width = windowWidth / 2 + 'px'
            } else {
                lnbNav.current.style.width = '0px'
            }
        }
    }, [isMenuOpen, windowWidth])

    useEffect(() => {
        hljs.highlightAll();
    }, [])

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className={classNames('viewport', isDark ? 'darkmode' : '')}>

                <div className="viewport-top">
                    {/* {isHome && } */}
                    {/* The main header section on top of the screen */}
                    <div className="layout-wrap" style={{ display: 'flex' }}>
                        <aside className="lnb-wrap">
                            <div ref={lnbBox} className='lnb-bg'></div>
                        </aside>
                        <div ref={lnbNav} className={classNames('lnb-nav')} style={{ display: 'none' }}>
                            <span style={{ cursor: 'pointer' }}><FiChevronsLeft onClick={handleMenuOpen} style={{ color: '#fff', fontSize: '30px' }} /></span>
                            <div className="site-lnb-nav"><Navigation data={site.navigation} navClass="site-lnb-nav-item" /></div>
                            <div className="lnb-message">아직 개발이 진행 중인 블로그입니다.<br /> 다소 불안정할 수 있습니다.</div>
                        </div>
                        <div className="content-wrap">
                            <header className="site-head">
                                <div style={{ display: 'flex' }}>
                                    <span className="btn-circle">
                                        <GiHamburgerMenu style={{ fontSize: '20px', color: '#fff' }} onClick={handleMenuOpen} /></span>
                                    <div className="toggle-button">
                                        <div className="toggle-bg">
                                            <div
                                                className={classNames('click', isToggleDark ? 'dark' : '')}
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
                                             © 2021 Published with <br /> <a style={{ display: 'inline-block' }} className="site-foot-nav-item" href="https://ghost.org" target="_blank" rel="noopener noreferrer">Ghost</a>, Gatsby and Netlify
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
