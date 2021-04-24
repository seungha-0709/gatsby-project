import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import classNames from 'classnames'
import { GiHamburgerMenu } from "react-icons/Gi"
import { HiOutlineSun } from 'react-icons/Hi'
import { RiMoonFill } from 'react-icons/Ri'
import { GrPrevious } from 'react-icons/Gr'
import { IoIosArrowBack } from 'react-icons/Io'
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

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [toggleShift, setToggleShift] = useState(false)
    const [isDark, setIsDark] = useState(false)

    const handleToggleClick = () => {
        setToggleShift(!toggleShift)
        setIsDark(!isDark)
    }

    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen)
    }

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
                        <aside className="lnb-wrap" style={{ width: '25%' }}>
                            <div className='lnb-bg'></div>
                            <div className={classNames('lnb-nav', isMenuOpen ? 'open' : '')}>
                                <span style={{ cursor: 'pointer' }}><IoIosArrowBack onClick={handleMenuOpen} style={{ color: '#fff', fontSize: '30px' }} /></span>
                                <div className="site-lnb-nav"><Navigation data={site.navigation} navClass="site-lnb-nav-item" /></div>
                            </div>
                        </aside>
                        <div className="content-wrap" style={{ width: '75%' }}>
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
