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

    const PrevNext = styled.div`
      p {
        font-size: 0.8rem;
        margin: 8px;
      }
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
                            <h1 className="post-title">{post.title}</h1>

                            <p className="post-date"><span>written by </span>
                                <strong>{post.authors.map(v => { return v.name })}</strong>
                            </p>
                            <p className="post-date"><span>{moment(post.published_at).format('YYYY MMMM DD')}</span></p>
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
                            <div className="prev-next-wrap">
                                <div>
                                    {prevPost && <PrevNext>
                                        <p><GrFormPrevious /> Prev</p>
                                        <Link to={`/${prevPost.node.slug}/`}><p>{prevPost.node.title}</p></Link>
                                    </PrevNext>}
                                </div>
                                <div>
                                    {nextPost && <PrevNext>
                                        <p style={{ textAlign: 'right' }}>Next <GrFormNext /></p>
                                        <Link to={`/${nextPost.node.slug}/`}><p>{nextPost.node.title}</p></Link>
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
