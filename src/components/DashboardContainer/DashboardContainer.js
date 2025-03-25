import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './DashboardContainer.scss';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardContainer = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className='dashboard-main-body'>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className='dashboard-main-center'>
                <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <div className='main-content'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardContainer;

