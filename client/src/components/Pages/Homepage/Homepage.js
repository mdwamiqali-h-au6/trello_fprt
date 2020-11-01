import React, {Fragment} from 'react'
import './Homepage.css'

import SidebarOptions from '../../SidebarOption/SidebarOption'
import Board from '../../Board/Board'

const Homepage = () => {
    return (
        <Fragment>
            <div className="container-fluid myconatiner">
                <div className="sidebar">
                    <SidebarOptions/>
                </div>
                <div className="boards">
                    <Board/>
                </div>
            </div>
        </Fragment>
    )
}

export default Homepage
