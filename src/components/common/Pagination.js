import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className="pagination" role="navigation">
            <div className="pagination-location">Page {humanPageNumber} of {numberOfPages}</div>
            <div className="pagination-box">
                {previousPagePath ? (

                    <Link to={previousPagePath} rel="prev">
                        <span className="pagination-link">Prev</span>
                    </Link>

                ) : (<span className="pagination-nolink">Prev</span>)}

                {nextPagePath ? (

                    <Link to={nextPagePath} rel="next">
                        <span className="pagination-link">Next</span>
                    </Link>
                ) : (
                    <span className="pagination-nolink">Next</span>
                )}
            </div>
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
