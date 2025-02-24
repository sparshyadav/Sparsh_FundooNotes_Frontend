import React from 'react';
import './NoteCard.scss'
import { BellPlus, UserPlus, Image, FolderDown } from 'lucide-react';
import LongMenu from './LongMenu';

const MAX_DESCRIPTION_LENGTH = 125;  

const NoteCard = ({ title, description }) => {
    const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;
    const truncatedDescription = isLongDescription 
        ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..." 
        : description;

    return (
        <div className={`note-card-main-container ${isLongDescription ? 'expanded-card' : ''}`}>
            <div className='card-container-info'>
                <h3 className='card-title'>{title}</h3>
                <p className='card-desc'>{truncatedDescription}</p>
            </div>
            <div className='card-container-options'>
                <BellPlus className='icons' />
                <UserPlus className='icons' />
                <Image className='icons' />
                <FolderDown className='icons' />
                <LongMenu className='icons menu-icon' />
            </div>
        </div>
    );
};

export default NoteCard;

