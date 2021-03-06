import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Utterances from '../components/Utterances'
import moment from 'moment';
import { Link } from 'gatsby'
import styled from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {

    const post = data.ghostPost

    const { allGhostPost } = data;
    const { edges } = allGhostPost;

    const postIndex = edges.findIndex(item => item.node.uuid === post.uuid)

    const prevPost = postIndex !== edges.length - 1 && edges[postIndex + 1]
    const nextPost = postIndex !== 0 && edges[postIndex - 1]

    const postEl = useRef(null)
    const indexBoxEl = useRef(null)

    useEffect(() => {
        let toc = '';
        const headings = postEl.current.querySelectorAll('h1, h2, h3, h4, h5, h6')
        headings.forEach((heading) => {
            let title = heading.innerHTML
            let tagName = heading.tagName
            let href = encodeURI(`${tagName}-${title}`)
            heading.id = href
            toc += `<li class="${tagName}" key="${tagName}"><a href="#${href}">${title}</a></li>`;
        })
        indexBoxEl.current.innerHTML = `<ul>${toc}</ul>`;
    })

    const PostTitle = styled.h2`
      font-size: 1.8rem;
      margin-top: 20px;
      @media screen and (max-width: 400px) {
          font-size: 1.4rem;
      }
    `

    const PrevNext = styled.div`
      margin-bottom: 20px; 
      p {
        font-size: 0.8rem;
        font-family: 'Spoqa Han Sans';
        margin: 8px;
        line-height: 1.4;
      }
      a {
          color: #6d747a;
      }
      @media screen and (max-width: 900px) {
          width: 100%;
      }
    `

    const PostSpan = styled.p`
      font-family: 'Spoqa Han Sans';
      color: #757575;
      font-size: 0.8rem;
      margin: 25px 0 0;
    `

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <article className="post-container">
                    <div className="post-wrapper">
                        <header className="post-header">
                            {post.tags && post.tags.map((tag, i) => { return <span key={i} className="post-tags-title">{tag.name + '. '}</span> })}
                            <h2 className="post-title">{post.title}</h2>

                            <PostSpan><span>written by </span>
                                <strong>{post.authors.map(v => { return v.name })}</strong>
                            </PostSpan>
                            <PostSpan><span>{moment(post.published_at).format('YYYY MMMM DD')}</span></PostSpan>
                        </header>

                        <div className="post-content" ref={postEl}>
                            {post.feature_image && <img className="post-featured-image" src={post.feature_image} alt={post.title} />}
                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}>
                            </section>
                        </div>

                        <footer className="post-footer clearfix">
                            {/* {post.tags && 'Tag: ' + post.tags.map((tag, i) => {
                                return tag.name
                            })} */}
                            {/* <div>
                                <Utterances repo='seungha-0709/blog-comments' theme='github-light' />
                            </div> */}
                            <div style={{ width: '100%', marginTop: '60px' }}>
                                <div>
                                    {prevPost && <PrevNext>
                                        <p><GrFormPrevious /> Prev</p>
                                        <Link to={`/${prevPost.node.slug}/`}><p>{prevPost.node.title}</p></Link>
                                    </PrevNext>}
                                </div>
                                <div>
                                    {nextPost && <PrevNext>
                                        <p style={{ textAlign: 'right' }}>Next <GrFormNext /></p>
                                        <Link to={`/${nextPost.node.slug}/`}><p style={{ textAlign: 'right' }}>{nextPost.node.title}</p></Link>
                                    </PrevNext>}
                                </div>


                            </div>
                        </footer>
                    </div>
                    <div className="index-box-wrapper">
                        <div className="index-box" ref={indexBoxEl}>
                        </div>
                    </div>
                </article>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
        allGhostPost {
            edges {
                node {
                    id
                    published_at
                    uuid
                    title
                    slug
                    excerpt
                }
            }
        }
    }
`
