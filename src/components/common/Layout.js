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
import Category from './Category'
import { isDarkShift, isToggle } from '../../store/dark'
import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu'




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

    // const [windowWidth, setWindowWidth] = useState(null)
    // const handleResize = () => {
    //     setWindowWidth(window.innerWidth)
    // }

    // useEffect(() => {
    //     setWindowWidth(window.innerWidth)
    //     window.addEventListener('resize', handleResize);
    //     return () => { // cleanup 
    //         window.removeEventListener('resize', handleResize);
    //     }
    // }, []);

    // const lnbBox = useRef(null)
    // const lnbNav = useRef(null)

    // useEffect(() => {
    //     lnbNav.current.style.display = 'flex'
    //     if (windowWidth < 400) {
    //         lnbNav.current.style.width = '100px'
    //         lnbNav.current.style.left = '-100px'
    //         if (isMenuOpen) {
    //             lnbNav.current.style.width = windowWidth / 1.2 + 'px'
    //         } else {
    //             lnbNav.current.style.width = '100px'
    //         }
    //     } else {
    //         lnbNav.current.style.left = '-10%'
    //         lnbNav.current.style.width = '0px'
    //         if (isMenuOpen) {
    //             lnbNav.current.style.width = windowWidth / 2.5 + 'px'
    //         } else {
    //             lnbNav.current.style.width = '0px'
    //         }
    //     }
    // }, [isMenuOpen, windowWidth])

    useEffect(() => {
        hljs.highlightAll();
    })


    const Lnb = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      width: 400px;
      height: 100vh; 
      .darkmode {
        background-color: #212121;
      }
      @media screen and (max-width: 1500px) {
          width: 300px;
      }
      @media screen and (max-width: 800px) {
          display: none;
      }
    `

    const LeftSide = styled.div`
        width: 100%;
        padding-top: 150px;
        padding-left: 100px;
        @media screen and (max-width: 1200px) {
          padding-left: 60px;
      }
    `
    const Copyright = styled.footer`
        font-size: 0.8rem;
        margin-top: 20px;
    `
    const SquareLogo = styled.div`
        width: 60px;
        height: 60px;
        border-width: 2px;
        border-style: solid;
        border-color: #0079bb #13A4F2 #13A4F2 #0079bb;
        margin-bottom: 40px;
        padding: 2px;
        line-height: 1;
        color: #13A4F2;
        font-size: 0.4rem;
    `
    const ContentWrap = styled.div`
        margin-left: 400px;
        width: 100%;
        @media screen and (max-width: 1500px) {
          margin-left: 300px;
          padding: 0 40px;
          width: calc(100% - 300px);
      }
        @media screen and (max-width: 800px) {
            margin: 40px 0 0 0;
            width: 100%;
            padding: 20px;
        }
    `

    const LnbFooter = styled.div`
       margin-top: 60px;
       border: 0px;
     `

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className={classNames('viewport', isDark ? 'darkmode' : '')}>

                <header className="site-head">
                    <div>
                        <Menu disableAutoFocus customBurgerIcon={<GiHamburgerMenu style={{ fontSize: '24px' }} />} className={"hamburger"}>
                            <Category />
                            <LnbFooter>
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
                                <div className="lnb-footer">
                                    © 2021 <br /> Published with <br /> Ghost, Gatsby and Netlify
                                    <span style={{ display: 'block' }}>Designed by Seungha Kim</span>
                                </div>
                            </LnbFooter>

                        </Menu>
                    </div>

                </header>

                <div className="viewport-top">
                    <div className="layout-wrap">
                        <aside className="lnb-wrap">
                            <Lnb>
                                <LeftSide>
                                    <SquareLogo>
                                        MY<br />
                                        JOURNAL
                                    </SquareLogo>
                                    <Category />
                                    <div style={{ marginTop: '80px' }}>
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
                                    <Copyright>
                                        © 2021 <br /> Published with <br /> Ghost, Gatsby and Netlify
                                        <span style={{ display: 'block' }}>Designed by Seungha Kim</span>
                                    </Copyright>
                                </LeftSide>
                            </Lnb>
                        </aside>
                        {/* <div ref={lnbNav} className={classNames('lnb-nav')} style={{ display: 'none' }}>
                            <span style={{ cursor: 'pointer' }}><FiChevronsLeft onClick={handleMenuOpen} style={{ color: '#fff', fontSize: '30px' }} /></span>
                            <div className="site-lnb-nav">
                                <Category />
                            </div>
                        </div> */}

                        <ContentWrap>
                            <main className="site-main">
                                {/* All the main content gets inserted here, index.js, post.js */}
                                {children}
                            </main>
                            <div className="viewport-bottom">
                                {/* The footer at the very bottom of the screen */}

                            </div>
                        </ContentWrap>

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
