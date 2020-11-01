import React from 'react'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

import './SidebarOption.css'

const SidebarOption = () => {
    return (
        <div className="options">
            <div className="thumbnail">
                <CollectionsBookmarkIcon className="icon" style={{ fontSize: 20 }}/>
                <h6 className="title font-weight-bold active">Boards</h6>
            </div>
        </div>
    )
}

export default SidebarOption
