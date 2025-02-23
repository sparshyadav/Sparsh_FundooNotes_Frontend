import React from 'react'
import './ClosedAddNote.scss'
import { SquareCheck, Brush, Image } from 'lucide-react';

function ClosedAddNote({toggleView}) {
    return (
        <div className='closed-addnote-main-container'>
            <div className='closed-container-input-field' onClick={toggleView}>
                <input type='text' placeholder='Take a Note...' />
            </div>
            <div className='closed-container-icons'>
                <SquareCheck className='addnote-icons' />
                <Brush className='addnote-icons' />
                <Image className='addnote-icons' />
            </div>
        </div>
    )
}

export default ClosedAddNote
