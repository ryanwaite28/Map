import React from 'react'
import PropTypes from 'prop-types'

const AppTitle = (props) => {
  return(
      <div className="header" tabIndex ="0">
        <h1 className="project-title"> { props.title } </h1>
      </div>
  )
}

AppTitle.defaultProps = {
  title: 'Central Java Map'
}

AppTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default AppTitle
