import React, { useState } from 'react';
import './NoteCard.scss';
import { BellPlus, UserPlus, Image, FolderDown, ArchiveRestore, Trash2 } from 'lucide-react';
import LongMenu from './LongMenu';
import { archiveNoteApi, deleteNoteForeverApi, trashNoteApi } from '../../utils/API';
import Modal from '@mui/material/Modal';
import AddNote from '../AddNote/AddNote';

const MAX_DESCRIPTION_LENGTH = 125;

const NoteCard = ({ title, description = "", noteDetails, updateList }) => {
    const [editNote, setEditNote] = useState(false);

    const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;
    const truncatedDescription = isLongDescription
        ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
        : description;

    const handleIconClick = async (action, data = null) => {
        if (action === 'edit') {
            setEditNote(false);
            updateList({ action: 'edit', data })
        }
        try {
            if (action === 'archive') {
                await archiveNoteApi({ "noteIdList": [`${noteDetails.id}`], "isArchived": !noteDetails.isArchived });
                updateList({ action: "archive", data: { ...noteDetails, isArchived: !noteDetails.isArchived } });
            } else if (action === 'trash') {
                let response = await trashNoteApi({ "noteIdList": [`${noteDetails.id}`], "isDeleted": !noteDetails.isDeleted });

                if (response.status === 200) {
                    updateList({ action: "trash", data: { ...noteDetails, isDeleted: !noteDetails.isDeleted } });
                }
            }
            else if (action === 'deleteForever') {
                await deleteNoteForeverApi({ "noteIdList": [`${noteDetails.id}`] });
                updateList({ action: "trash", data: { ...noteDetails, isDeleted: false } });
            }
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    return (
        <div className={`note-card-main-container ${isLongDescription ? 'expanded-card' : ''}`} >
            <div className='card-container-info' onClick={() => setEditNote(true)}>
                <h3 className='card-title'>{title}</h3>
                <p className='card-desc'>{truncatedDescription}</p>
            </div>
            <div className='card-container-options'>
                {noteDetails?.isDeleted ? (
                    <>
                        <ArchiveRestore onClick={() => handleIconClick('trash')} className='icons' />
                        <Trash2 onClick={() => handleIconClick('deleteForever')} className='icons' />
                    </>
                ) : (
                    <>
                        <BellPlus className='icons' />
                        <UserPlus className='icons' />
                        <Image className='icons' />
                        <FolderDown onClick={() => handleIconClick('archive')} className='icons' />
                        <LongMenu handleIconClick={handleIconClick} className='icons menu-icon' />
                    </>
                )}
            </div>
            <Modal
                open={editNote}
                onClose={() => setEditNote(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddNote expanded={true} noteDetails={noteDetails} handleIconClick={handleIconClick} />
            </Modal>
        </div>

    );
};

export default NoteCard;
