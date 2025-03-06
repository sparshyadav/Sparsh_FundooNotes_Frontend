import React from 'react'
import { Archive } from 'lucide-react';
import "./ReminderContainer.scss"

function ReminderContainer() {
    return (
        <div className='reminder-main-container'>
            <div className='reminder-center-container'>
                <Archive className='icon' />
                <p className='text'>Your Reminders Appear Here</p>
            </div>
        </div>
    )
}

export default ReminderContainer
