import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import styled from 'styled-components';

const Category = () => {

  const CategoryDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: flex-end;
    width: 120px;
    font-family: 'Spoqa Han Sans';
  `

  const CategoryP = styled.p`
    color: #fff;
    margin: 0 0 10px 0;
    font-size: 0.9rem;
    width: 100%;
    text-align: right;
    font-family: 'Spoqa Han Sans';
  `

  const CategoryUl = styled.ul`
    list-style: none;
    font-size: 0.9rem;
    color: #0079bb;
    margin: 0 0 10px 0;
    padding: 0;
    width: 100%;
    font-family: 'Spoqa Han Sans';
  `

  const CategoryLi = styled.li`
    margin: 0;
    padding: 0;
    /* text-align: right; */
  `

  const CategoryA = styled.a`
    color: #13A4F2;
    font-size: 0.75rem;
    display: inline-block;
    border-bottom: 1px dotted #13A4F2;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'Spoqa Han Sans';
    font-weight: 400;
  `

  const data = useStaticQuery(graphql`
  query CategoryQuery {
    allGhostPage {
      nodes {
        id
        title
        slug
      }
    }
    allGhostTag {
      nodes {
          id
          name
          url
          slug
          count {
            posts
          }
      }
    }
  }
  `)

  const { allGhostTag } = data;
  const { nodes: tagList } = allGhostTag;

  const { allGhostPage } = data;
  const { nodes: pageList } = allGhostPage

  return (
    <CategoryDiv>
      <CategoryUl>
        <CategoryLi>
          <CategoryA href={'/'} noopener noreferrer>
            <span>Home</span>
          </CategoryA>
        </CategoryLi>
        <CategoryLi>
          <CategoryA href={'/about'} noopener noreferrer>
            <span>About</span>
          </CategoryA>
        </CategoryLi>
        {/* {pageList.map(v => (
          <CategoryLi>
            <CategoryA href={'/' + `${v.slug}`} noopener noreferrer>
              <span>{v.title}</span>
            </CategoryA>
          </CategoryLi>
        ))} */}
      </CategoryUl>
      <CategoryUl>
        {tagList.map(v => (
          <CategoryLi key={v.id}>
            <CategoryA href={'/tag/' + `${v.slug}`} noreferrer noopener>
              <span>{v.name}</span>
              <span>{'(' + `${v.count.posts}` + ')'}</span>
            </CategoryA>
          </CategoryLi>
        ))}
      </CategoryUl>
    </CategoryDiv>
  )
}




export default Category
