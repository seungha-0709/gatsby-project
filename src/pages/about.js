import React from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby'
import { Layout } from '../components/common'
import { HiOutlineMail } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const aboutList = [{
  title: 'Info',
  background: '#2274C0',
  content: '<p>김승하.</p> <p>웹 프론트엔드 개발자. (언젠가는 백엔드도 할 줄 아는 게 꿈입니다.)</p> <p>어딘가에서 어느 기업용 소프트웨어를 만들고 있습니다.</p>'
}, {
  title: 'Career',
  background: '#224E95',
  content: '<p>2020년, 내 나이 서른한 살이던 어느 여름날 처음 개발 공부를 시작했고 그 해 겨울에 신입 개발자로 취업.</p><p>첫 직장은 서울에 있는 어느 국가기관이었음. 전직 7급 공무원.</p><p>영어를 포함하여 7과목을 시험보던 시절, 그 7급 공무원도 면접을 두 번이나 떨어져서 겨우 붙은 거였지만 2년 만에 퇴사...</p><p>그 이후로 여러 직장을 전전했음. 첫 직장을 포함하여, 어딜 가도 나는 조직 부적응자였음. 공무원 퇴사한 거 솔직히 후회도 많이 함. </p><p>그러다 어찌저찌 우연히 개발의 길로 들어섰는데 생각했던 것보다 훨씬 내 적성에 잘 맞아서, 요즘은 재밌게 즐겁게 회사생활 하고 있음.</p><p>나는 태어날 때부터 사회 부적응자인 줄 알았는데 그건 아니었음.</p>'
}, {
  title: 'Tech Stack',
  background: '#1F456A',
  content: '<p>주로 <code>React</code>를 사용하여 개발합니다.</p><p><code>HTML</code> <code>CSS</code> <code>SCSS</code> <code>Javascript</code></p><p><code>React</code> <code>Vue</code> <code>Next.js</code> <code>Nuxt.js</code> <code>Mobx</code> <code>Recoil</code> <code>GraphQL</code></p>'
}, {
  title: 'Contact',
  background: '#04283F',
  content: ''
}
]

const colorList = [
  '#2274C0',
  '#224E95',
  '#1F456A',
  '#04283F',
]

const About = () => {

  const AboutCardUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
  `
  const AboutCardLi = styled.li`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  `
  const AboutCardTitle = styled.div`
    width: 100px;
    height: 100px;
    margin: 0;
    padding: 10px;
    font-size: 0.8rem;
    color: #fff;
    margin: 0 40px 0 0;
    &:hover + div {
      display: block;
    }
  `
  const AboutCardContent = styled.div`
    display: none;
    width: 100%;
    position: absolute;
    top: 80px;
    left: 200px;
    margin: 0;
    font-size: 0.9rem;
    p {
      line-height: 1.4;
      margin: 0 0 10px 0;
      &:nth-of-type(1) {
        margin-bottom: 60px;
      }
    }
    @media screen and (max-width: 1300px) {
      display: block;
      position: static;
      padding: 20px 0 20px 0;
      p {
        font-size: 0.9rem;
        margin: 0 0 20px 0;
        line-height: 1.8;
        &:nth-of-type(1) {
          margin-bottom: 20px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
`
  const AboutCardIcon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #BFD8F0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    a {
      color: #fff;
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      &:hover {
        text-decoration: none;
      }
    }
  `

  return (
    <Layout>
      <div className="container" style={{ position: 'relative' }}>
        <AboutCardUl>
          {aboutList.map((v, i) => (
            <AboutCardLi key={i}>
              <AboutCardTitle style={{ background: v.background }}>
                {v.title}
              </AboutCardTitle>
              { i < aboutList.length - 1 &&
                <AboutCardContent>
                  <section
                    dangerouslySetInnerHTML={{ __html: v.content }}>
                  </section>
                </AboutCardContent>}
              { i === aboutList.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '400px', height: '100px' }}>
                  <AboutCardIcon style={{ background: colorList[0] }}>
                    <a href='mailto:sk.kim.x928@gmail.com' noreferrer noopener><HiOutlineMail /></a>
                  </AboutCardIcon>
                  <AboutCardIcon style={{ background: colorList[1] }}>
                    <Link to='//github.com/seungha-0709'><FaGithub /></Link>
                  </AboutCardIcon>
                  <AboutCardIcon style={{ background: colorList[2] }}>
                    <Link to='//linkedin.com/seunghakim'><FaLinkedin /></Link>
                  </AboutCardIcon>
                </div>
              )}
            </AboutCardLi>))}
        </AboutCardUl>
      </div>
    </Layout>
  )
}

export default About
