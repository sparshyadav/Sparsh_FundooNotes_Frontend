import './DashboardContainer.scss';
import { Lightbulb, FolderDown, Trash2, BellPlus, Tag } from "lucide-react";
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
    },
    {
        name: 'Reminder',
        icon: BellPlus,
        path: '/dashboard/reminder'
    },
    {
        name: 'Labels',
        icon: Tag,
        path: '/dashboard/labels'
    }
];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();

    return (
        <div
            className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}
            onMouseEnter={() => toggleSidebar()}
            onMouseLeave={() => toggleSidebar()}>
            {sidebarItemsList.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                return (
                    <NavLink to={item.path} key={index}>
                        <div className={`sidebar-column ${isActive ? "notes" : ""}`}>
                            <IconComponent className='sidebar-icon' />
                            {!isCollapsed && <p className='sidebar-text'>{item.name}</p>}
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;

