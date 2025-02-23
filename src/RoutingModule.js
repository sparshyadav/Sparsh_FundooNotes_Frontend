import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import DashboardContainer from './components/DashboardContainer/DashboardContainer';
import NotesContainer from './components/NotesContainer/NotesContainer';
import TrashContainer from './components/TrashContainer/TrashContainer';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer';
import Login from './components/Login/Login';

const RoutingModule = () => {
    const route = createBrowserRouter([
        {
            path: '',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/dashboard',
            element: <DashboardContainer />,
            children: [
                {
                    path: 'notes',
                    element: <NotesContainer />
                },
                {
                    path: 'trash',
                    element: <TrashContainer />
                },
                {
                    path: 'archive',
                    element: <ArchiveContainer />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;
