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
        <P>철학과 윤리학에 관심이 많습니다.</P>
        <P>어릴 적부터 이런 저런 사상들을 좋아했고 뼛속까지 본투비 문과라는 소리를 듣고 자라왔지만<br />
          놀랍게도 직업은 웹 프런트엔드 개발자. 판교에서 일하고 있습니다.
        </P>
        <hr />
      </div>
    </Layout>
  )
}

export default About
