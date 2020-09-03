import React from 'react'
import { XCircleFillIcon } from '@primer/octicons-react'
import PropTypes from 'prop-types'
/**
 * @example ./Header.md
 */
const Header =(props)=>{
    return(
        <div>
            <h2>{props.note}</h2>
            <XCircleFillIcon />
        </div>
        

    )
}

Header.propTypes = {
    note: PropTypes.string.isRequired
}

export default Header;