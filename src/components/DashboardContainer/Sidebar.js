import React from 'react';
import './DashboardContainer.scss';
import { Lightbulb, FolderDown, Trash2 } from "lucide-react";
import './Sidebar.scss';
import { NavLink, useLocation } from 'react-router-dom';

const sidebarItemsList = [
    {
        name: "Notes",
        icon: Lightbulb,
        path: '/dashboard/notes'
    },
    {
        name: "Archive",
        icon: FolderDown,
        path: '/dashboard/archive'
    },
    {
        name: "Trash", 
        icon: Trash2,
        path: '/dashboard/trash'
    }
];

const Sidebar = ({ isCollapsed }) => {
    const location = useLocation();

    return (
        <div className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            {sidebarItemsList.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                return (
                    <NavLink to={item.path} key={index}>
                        <div className={`sidebar-column ${isActive ? "notes" : ""}`}>
                            <IconComponent className='sidebar-icon' />
                            <p className='sidebar-text'>{item.name}</p>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;
