import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import DashboardContainer from './components/DashboardContainer/DashboardContainer';
import NotesContainer from './components/NotesContainer/NotesContainer';
import TrashContainer from './components/TrashContainer/TrashContainer';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer';
import Login from './components/Login/Login';
import { NotesProvider } from './context/NotesContext';
import ReminderContainer from './components/ReminderContainer/ReminderContainer';
import LabelContainer from './components/LabelContainer/LabelContainer';

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
            element: <NotesProvider>
                        <DashboardContainer />
                    </NotesProvider>,
            children: [
                {
                    path: 'notes',
                    element: <NotesContainer />
                },
                {
                    path: 'notes/:noteId',
                    element: <NotesContainer />
                },
                {
                    path: 'trash',
                    element: <TrashContainer />
                },
                {
                    path: 'archive',
                    element: <ArchiveContainer />
                },
                {
                    path: "reminder",
                    element: <ReminderContainer />
                },
                {
                    path: "labels",
                    element: <LabelContainer />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={route} />
    )
}

export default RoutingModule;
