import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TailSpin } from 'react-loading-icons'
import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import styled from 'styled-components';
import { next } from 'cheerio/lib/api/traversing'

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
  const [hasMore, setHasMore] = useState(true)

  const fetchPosts = () => {
    axios("/.netlify/functions/fetch").then(res => {
      console.log(res)
      const { posts } = res.data
      const postIds = posts.map(item => item.id)
      let contentIds
      if (content.length === 0) {
        setContent(posts.splice(0, 8))
        setLoading(false)
      } else {
        contentIds = content.map(item => item.id)
        const loadedPostsIds = postIds.filter(id => !contentIds.includes(id))
        const loadedPosts = posts.filter(item => loadedPostsIds.includes(item.id))

        setContent([...content, ...loadedPosts.splice(0, 5)])
        setLoading(false)
        if (loadedPosts.length === 0) setHasMore(false)
      }
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

  const next = param => {
    console.log("param", param)
  }

  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="post-container">
          <Section>
            {/* {loading && <TailSpin stroke="#13A4F2" strokeWidth={4} width={20} />} */}
            <InfiniteScroll
              dataLength={5}
              hasMore={hasMore}
              next={() => fetchPosts()}
              loader={
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <TailSpin stroke="#13A4F2" strokeWidth={4} width={25} />
                </div>
              }
            >
              {!loading && content.map((node) => (
                // The tag below includes the markup for each post - components/common/PostCard.js
                <PostCard key={node.id} post={node} />
              ))}
            </InfiniteScroll>
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
