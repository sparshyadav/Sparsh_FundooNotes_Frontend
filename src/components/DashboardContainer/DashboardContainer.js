import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './DashboardContainer.scss';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardContainer = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        console.log("Value: ", isCollapsed);
        setIsCollapsed(prev => !prev);
        console.log("Value: ", isCollapsed);
    };

    return (
        <div className='dashboard-main-body'>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className='dashboard-main-center'>
                <Sidebar isCollapsed={isCollapsed} />
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardContainer;
