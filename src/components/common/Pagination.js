import React from 'react'
import PropTypes from 'prop-types'
import { FaCircle } from 'react-icons/fa'
import { Link } from 'gatsby'
import styled from 'styled-components'
import classNames from 'classnames'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, pageNumber, numberOfPages } = pageContext

    console.log(pageContext)

    const LinkIcon = styled.div`
      display: flex;
      width: 30px;
      height: 30px;
      justify-content: center;
      align-items: center;
      &:hover {
          transition: 0.8s ease-out;
          transform: translateY(-10px);
      }
    `

    return (
        <nav className="pagination" role="navigation">
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
                {Array.from({ length: numberOfPages }).map((num, index) => {
                    if (index === 0) {
                        return (
                            <LinkIcon>
                                <Link to="/">
                                    <FaCircle color={index === pageNumber ? "#0079bb" : "#ddd"} size="12px" />
                                </Link>
                            </LinkIcon>)
                    } else
                        return (
                            <LinkIcon>
                                <Link to={`${'/page/' + (index + 1)}`}>
                                    <FaCircle color={index === pageNumber ? "#0079bb" : "#ddd"} size="12px" /></Link>
                            </LinkIcon>
                        )
                })}
            </div>
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
