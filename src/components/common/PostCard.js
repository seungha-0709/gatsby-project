import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import moment from 'moment';
import styled from 'styled-components';
import { isDarkShift, isToggle } from '../../store/dark'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`

    const Container = styled.div`
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      margin: 20px 0;
    `
    const Date = styled.div`
      width: 80px;
      margin-right: 20px;
      font-size: 0.8rem;
      text-align: right;
      @media screen and (max-width: 400px) {
          font-size: 0.6rem;
      }
    `
    const PostBox = styled.div`
      width: 100%;
      padding-left: 20px;
      padding-bottom: 40px;
      border-left: 1px solid #ddd;
    `

    const PostCardTags = styled.div`
      display: block;
      width: 100%;
      font-size: 0.8rem;
      color: #0079bb;
      font-weight: 600;
      padding: 0;
      margin: 0;
      font-weight: 300;
      @media screen and (max-width: 400px) {
          font-size: 0.6rem;
      }
    `
    const PostCardTitle = styled.h2`
      display: block;
      width: 100%;
      font-weight: 600;
      font-size: 1.2rem;
      margin: 4px 0 12px 0;
      @media screen and (max-width: 400px) {
          font-size: 1rem;
      }
    `
    const PostCardExcerpt = styled.div`
      display: block;
      width: 100%;
      font-size: 0.8rem;
      line-height: 1.5;
      color: #24292e;
      font-weight: 400;
      margin-top: 5px;
      margin-bottom: 5px;
      font-family: 'Noto Serif CJK';
      font-weight: 300;
      letter-spacing: -0.2px;
      @media screen and (max-width: 400px) {
          display: none;
      }
    `

    const PostCardExcerptMobile = styled.div`
      display: none;
      
      @media screen and (max-width: 400px) {
        display: block;
        width: 100%;
        font-size: 0.7rem;
        line-height: 1.5;
        color: #24292e;
        font-weight: 400;
        margin-top: 5px;
        margin-bottom: 5px;
        font-family: 'Noto Serif CJK';
        font-weight: 300;
      }
    `


    return (
        <Link to={url} className="none-underline">
            <Container>

                <Date>
                    {moment(post.published_at).format('MMMM.DD YYYY')}
                </Date>

                <PostBox>
                    <header className="post-card-header">
                        {post.tags && <PostCardTags> <Tags post={post} visibility="public" autolink={false} /></PostCardTags>}
                        {post.featured && <span>Featured</span>}
                        <PostCardTitle>{post.title}</PostCardTitle>
                    </header>
                    <PostCardExcerpt>{post.excerpt.substr(0, 243)}</PostCardExcerpt>
                    <PostCardExcerptMobile>{post.excerpt.substr(0, 80)}</PostCardExcerptMobile>

                </PostBox>

            </Container>
        </Link>

    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
