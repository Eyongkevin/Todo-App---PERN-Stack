import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a progress bar with a percentage that portrays the number of completed tasks
 * 
 * @param { number } props.progress - percentage of completed tasks 
 */
const ProgressBar=(props)=>{
    const { progress } = props;

    return(
        <div className="container">
            <div className="progressbar-container">
                <div className="progressbar-complete" style={{width: `${progress}%`}}>
                    <div className="progressbar-liquid"></div>
                </div>
                <span className="progress">{progress}%</span>
            </div>
      </div>
    )
}

ProgressBar.propTypes={
    progress: PropTypes.number
}

export default ProgressBar;