import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

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

    const postEl = useRef(null)
    const indexBoxEl = useRef(null)
    console.log(postEl)

    useEffect(() => {
        let toc = '';
        const headings = postEl.current.querySelectorAll('h1, h2, h3, h4, h5, h6')
        console.log(headings)
        headings.forEach((heading) => {
            let title = heading.innerHTML
            let tagName = heading.tagName
            let href = encodeURI(`${tagName}-${title}`)
            heading.id = href
            toc += `<li class="${tagName}" key="${tagName}"><a href="#${href}">${title}</a></li>`;
        })
        indexBoxEl.current.innerHTML = `<ul>${toc}</ul>`;
    })

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
                            {post.tags && post.tags.map((tag, i) => { return <span key={i} className="post-tags-title">{tag.name}</span> })}
                            <h1 className="post-title">{post.title}</h1>

                            <p className="post-date"><span>written by </span>
                                <strong>{post.authors.map(v => { return v.name })}</strong>
                            </p>
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
                            {post.tags && 'Tag: ' + post.tags.map((tag, i) => {
                                return tag.name
                            })}
                            <div>
                                <script src="https://utteranc.es/client.js"
                                    repo="seungha-0709/blog-comments"
                                    issue-term="pathname"
                                    theme="github-light"
                                    crossOrigin="anonymous"
                                    async>
                                </script>
                            </div>
                            <div className="prev-next-wrap">

                                {/* {{#prev_post}}
		        <a href="{{url}}">
                <div className="prev-next">
                  <span className="prev-next-tag">prev post</span>
                  <p className="prev-next-title">{{title}}</p>
                  <p className="prev-next-excerpt">{{excerpt words="20"}}<span>...</span></p>
                </div>
                </a>
                
	        {{/prev_post}}

	        {{#next_post}}
		        <a href="{{url}}">
                <div className="prev-next">
                    <span className="prev-next-tag">next post</span>
                    <p className="prev-next-title">{{title}}</p>
                    <p className="prev-next-excerpt">{{excerpt words="15"}}</p>
                </div>
                </a>
	        {{/next_post}} */}
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
    }
`
