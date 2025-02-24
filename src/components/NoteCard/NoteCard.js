import React from 'react';
import './NoteCard.scss';
import { BellPlus, UserPlus, Image, FolderDown, ArchiveRestore, Trash2 } from 'lucide-react';
import LongMenu from './LongMenu';
import { archiveNoteApi, deleteNoteForeverApi, trashNoteApi } from '../../utils/API';

const MAX_DESCRIPTION_LENGTH = 125;

const NoteCard = ({ title, description = "", noteDetails, updateList }) => {
    const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;
    const truncatedDescription = isLongDescription
        ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
        : description;

    const handleIconClick = async (action) => {
        try {
            if (action === 'archive') {
                await archiveNoteApi({ "noteIdList": [`${noteDetails.id}`], "isArchived": !noteDetails.isArchived });
                updateList({ action: "archive", data: { ...noteDetails, isArchived: !noteDetails.isArchived } });
            } else if (action === 'trash') {
                let response = await trashNoteApi({ "noteIdList": [`${noteDetails.id}`], "isDeleted": !noteDetails.isDeleted });
                console.log("Response From API: ", response);

                if (response.status === 200) {
                    updateList({ action: "trash", data: { ...noteDetails, isDeleted: !noteDetails.isDeleted } });
                }
            }
            else if (action === 'deleteForever') {
                console.log("Inside Delete Forever");
                let response = await deleteNoteForeverApi({ "noteIdList": [`${noteDetails.id}`] });
                console.log("Response Delete Forever: ", response);
                updateList({ action: "trash", data: { ...noteDetails, isDeleted: false } });
            }
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    return (
        <div className={`note-card-main-container ${isLongDescription ? 'expanded-card' : ''}`}>
            <div className='card-container-info'>
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
        </div>
    );
};

export default NoteCard;
