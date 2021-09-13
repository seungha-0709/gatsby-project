import React, { useEffect } from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby'
import { Layout } from '../components/common'
import { HiOutlineMail } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'


const About = () => {

  const P = styled.p`
    font-family: 'Noto Serif CJK';
    font-weight: 300;
    font-size: 0.9rem;
  `
  const SmallP = styled.p`
    font-family: 'Noto Serif CJK';
    font-weight: 300;
    font-size: 0.8rem;
  `

  return (
    <Layout>
      <div className="container" style={{ position: 'relative' }}>

        <P>김승하</P>
        <P>원래는 개발 공부 기록하려고 만든 블로그인데 어쩌다 일기장이 되어버린 웹 사이트.</P>
        <hr />
      </div>
    </Layout>
  )
}

export default About
