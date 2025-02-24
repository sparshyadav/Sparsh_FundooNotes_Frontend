import React from 'react'
import './ExpandedAddNote.scss';
import { BellPlus, UserPlus, Image, FolderDown, EllipsisVertical } from 'lucide-react';

function ExpandedAddNote({ toggleView, setFunctions }) {
    return (
        <div className='expended-main-container'>
            <div className='expended-title'>
                <input className='title' type='text' placeholder='Title' onChange={(e) => setFunctions.setTitle(e.target.value)} />
            </div>
            <div className='expended-note note'>
                <input className='note' type='textarea' placeholder='Take a Note...' onChange={(e) => setFunctions.setDescription(e.target.value)} />
            </div>
            <div className='expended-options'>
                <div className='options-left'>
                    <BellPlus className='expended-icons' />
                    <UserPlus className='expended-icons' />
                    <Image className='expended-icons' />
                    <FolderDown className='expended-icons' />
                    <EllipsisVertical className='expended-icons' />
                </div>
                <div className='options-right'>
                    <p onClick={toggleView}>Close</p>
                </div>
            </div>
        </div>
    )
}

export default ExpandedAddNote
