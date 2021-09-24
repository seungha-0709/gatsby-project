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
      <div className="post-container" style={{ position: 'relative' }}>
        <div className="post-wrapper">
          <P>김승하</P>
          <P>원래는 개발 공부 기록하려고 만든 블로그인데 어쩌다 일기장이 되어버린 웹 사이트.</P>
          <hr />
          <P>누구도 궁금하지 않겠지만 이 사이트에 대해 잠시 설명을 하자면, 그렇습니다. 개발자들은 기술 블로그라고 해서 자신이 공부한 내용을 블로그에 정리하는 경우가 많습니다. 개발업계가 워낙에 집단지성(?)이 발휘되는 영역이니만큼 자신이 공부한 내용을 기꺼이 세상과 나누는 것은 많은 사람들에게 도움이 됩니다.
            그래서 저도 제가 공부한 내용들을 기록해가기 위해 이렇게 블로그를 만들게 되었습니다. 처음부터 끝까지 제가 만들었고(물론 <code>Gatsby</code>라는 훌륭한 라이브러리가 있었기에 가능했지만), 제작에는 <code>React.js</code>와 <code>graphql</code>, <code>NginX</code>가 사용되었으며, 이래 봬도 무려 한 달에 7달러 정도의 서버 비용을 내고 운영되는 블로그입니다.
          </P>
          <P>
            그런데 일을 하면서 공부를 하기가 생각보다 쉽지 않았고, 공부한 것을 글로 정리하는 것은 더더욱 쉽지 않았습니다. 그래서 월 7달러를 내고 운영하는 블로그는 껍데기만 만들어 있는 채로 오랫동안 비어 있었습니다.
            그러다 어쩌다 저쩌다 제가 쓴 일기를 저의 정신과 주치의 선생님께 보여드릴 필요성을 느끼게 되어, 잠시 이 블로그를 전부 비공개로 닫아두고, 제가 손으로 쓴 일기들을 여기에 타이핑해 옮겨둔 뒤 오직 의사선생님만 볼 수 있게 해놓았습니다.
          </P>
          <P>
            지금은 이 블로그를 공개로 열어둔 상태입니다. 검색엔진에도 잡힐 수 있도록 작업해 놓았으니, 이런 사이트를 대체 무슨 검색어를 타고 들어올 수 있을지는 모르겠지만, 아무튼 그렇습니다. 원래는 개발 공부 기록하려고 만든 사이트인데 앞으로도 쭉 여기에는 저의 일상 일기가 올라갈 것 같습니다.
          </P>
          <P>이상 블로그 소개 끝.</P>
          <hr />
          <P>이것 역시 누구도 궁금하지 않겠지만 제 소개를 간단히 하자면 아주 작은 회사에서 웹 프런트엔드 개발자로 일하고 있습니다. 언젠가는 웹 전반을 다룰 수 있는 개발자로 성장하고 싶은 새내기 개발자입니다.<br />
            전공은 생뚱맞지만 교육학(문과)이었고, 별의별 직업 다 거쳐서 독학으로 공부해 나이 서른 넘어 개발자가 되었습니다.<br />
            이곳에 올라오는 글의 내용이 다소 어둡습니다. 왜냐하면 제가 우울한 인간이기 때문입니다.
          </P>
        </div>
      </div>
    </Layout>
  )
}

export default About
