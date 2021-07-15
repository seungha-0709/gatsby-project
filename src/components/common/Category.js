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
  `

  const CategoryP = styled.p`
    color: #fff;
    margin: 0 0 10px 0;
    font-size: 0.9rem;
    width: 100%;
    text-align: right;
  `

  const CategoryUl = styled.ul`
    list-style: none;
    font-size: 0.9rem;
    color: #fff;
    margin: 0 0 10px 0;
    padding: 0;
    width: 100%;
  `

  const CategoryLi = styled.li`
    margin: 0;
    padding: 0;
    text-align: right;
  `

  const CategoryA = styled.a`
    color: #fff;
    font-size: 0.8rem;
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

  console.log(tagList)

  return (
    <CategoryDiv>
      <CategoryUl>
        <CategoryLi>
          <CategoryA href={'/'} noopener noreferrer>
            <span>Home</span>
          </CategoryA>
        </CategoryLi>
        {/* <CategoryLi>
          <CategoryA href={'/about'} noopener noreferrer>
            <span>About</span>
          </CategoryA>
        </CategoryLi> */}
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
