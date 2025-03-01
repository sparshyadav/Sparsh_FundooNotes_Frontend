import React from 'react';
import './ExpandedAddNote.scss';
import { BellPlus, UserPlus, Image, FolderDown, EllipsisVertical } from 'lucide-react';

function ExpandedAddNote({ toggleView, setFunctions, values = null }) {
    const numLines = values.description ? values.description.split('\n').length : 1;
    const lineHeight = 20; 
    const newHeight = Math.min(numLines, 25) * lineHeight;

    return (
        <div className='expended-main-container'>
            <div className='expended-title'>
                <input 
                    value={values.title} 
                    className='title' 
                    type='text' 
                    placeholder='Title' 
                    onChange={(e) => setFunctions.setTitle(e.target.value)} 
                />
            </div>
            <div className='expended-note note'>
                <textarea
                    value={values.description}
                    className='note-textarea'
                    placeholder='Take a Note...'
                    onChange={(e) => setFunctions.setDescription(e.target.value)}
                    style={{ 
                        height: `${newHeight}px`, 
                        overflowY: numLines > 25 ? 'auto' : 'hidden' 
                    }}
                />
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
    );
}

export default ExpandedAddNote;
