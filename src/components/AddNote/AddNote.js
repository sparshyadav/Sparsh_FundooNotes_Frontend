import React, { useState } from 'react'
import { addNoteApi, editNoteApi } from '../../utils/API';
import './AddNote.scss'
import ClosedAddNote from './ClosedAddNote';
import ExpandedAddNote from './ExpandedAddNote';
import { successToast } from '../../utils/Toast';

const AddNote = ({ updateList, expanded = false, noteDetails, handleIconClick }) => {
    const [title, setTitle] = useState(noteDetails ? noteDetails.title : "");
    const [description, setDescription] = useState(noteDetails ? noteDetails.description : "")
    const [isExpanded, setIsExpanded] = useState(expanded);

    const handleAddNote = () => {
        if (isExpanded && (title || description) && !noteDetails) {

            addNoteApi({ title, description })
                .then((response) => {

                    if (response.status !== 200) {
                        throw new Error(response?.data?.message);
                    }
                    updateList({ action: "add", data: response.data.status.details });
                    successToast("Note Created Successfully");
                })
                .catch((error) => {
                    console.error("Error Adding Note:", error);
                });

            setTitle('');
            setDescription('');
        }

        if (noteDetails) {
            editNoteApi({ ...noteDetails, title, description, noteId: noteDetails.id });
            handleIconClick('edit', { ...noteDetails, title, description });
        }

        setIsExpanded(prev => !prev);
    };

    return (
        <div className='addnote-main-container'>
            {isExpanded ?
                <ExpandedAddNote toggleView={handleAddNote} setFunctions={{ setTitle, setDescription }} values={{ title, description }} />
                :
                <ClosedAddNote toggleView={handleAddNote} />
            }
        </div>
    )
}

export default AddNote
