import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import styled from 'styled-components';

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {

  const posts = data.allGhostPost.edges

  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = () => {
    axios("/.netlify/functions/fetch").then(res => {
      const { posts } = res.data.data
      setContent([...res.data.data.posts])
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  const Section = styled.section`
      /* width: 900px; */
      @media (max-width: 1200px) {
        width: 100%;
      }
    `



  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="post-container">
          <Section>
            {/* <InfiniteScroll
              dataLength={content.length}
              hasMore={true}
              next={() => fetchPosts()}
              loader={
                <p>Loading...</p>
              }
            > */}
            {!loading && content.map((node) => (
              // The tag below includes the markup for each post - components/common/PostCard.js
              <PostCard key={node.id} post={node} />
            ))}
            {/* </InfiniteScroll> */}
          </Section>
          {/* <Pagination pageContext={pageContext} /> */}
        </div>
      </Layout>
    </>
  )
}

Index.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
