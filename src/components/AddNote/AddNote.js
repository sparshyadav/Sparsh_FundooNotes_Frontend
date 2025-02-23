import React, { useState } from 'react'
import { addNoteApi } from '../../utils/API';
import './AddNote.scss'
import ClosedAddNote from './ClosedAddNote';
import ExpandedAddNote from './ExpandedAddNote';

const AddNote = ({updateList}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAddNote = ({updateNoteList}) => {
        if (isExpanded && (title || description)) {
            console.log("Title: ", title);
            console.log("Description: ", description);

            addNoteApi({ title, description })
                .then((response) => {

                    if (response.status !== 200) {
                        throw new Error(response?.data?.message);
                    }

                    updateList({title, description});
                })
                .catch((error) => {
                    console.error("Error Adding Note:", error);
                });

            setTitle('');
            setDescription('');
        }

        setIsExpanded(prev => !prev);
    };

    return (
        <div className='addnote-main-container'>
            {isExpanded ?
                <ExpandedAddNote toggleView={handleAddNote} setFunctions={{ setTitle, setDescription }} />
                :
                <ClosedAddNote toggleView={handleAddNote} />
            }
        </div>
    )
}

export default AddNote
