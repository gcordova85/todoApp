import React from 'react';
import './Layout.css'
const Layout: React.SFC = props => {
    return (
        <div className="Layout-main">
            <div className="Layout-card">
                {props.children}
            </div>
        </div>
    );
};

export default Layout;