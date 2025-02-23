import React from 'react';
import './NoteCard.scss'
import { BellPlus, UserPlus, Image, FolderDown, EllipsisVertical } from 'lucide-react';

const NoteCard = ({ title, description }) => {
    return (
        <div className='note-card-main-container'>
            <div className='card-container-info'>
                <h3 className='card-title' >{title}</h3>
                <p className='card-desc' >{description}</p>
            </div>
            <div className='card-container-options'>
                <BellPlus className='icons' />
                <UserPlus className='icons' />
                <Image className='icons' />
                <FolderDown className='icons' />
                <EllipsisVertical className='icons' />
            </div>
        </div>
    );
};

export default NoteCard

