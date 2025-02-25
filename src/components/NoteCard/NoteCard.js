import React, { useState } from 'react';
import './NoteCard.scss';
import { BellPlus, UserPlus, Image, FolderDown, ArchiveRestore, Trash2, Palette } from 'lucide-react';
import LongMenu from './LongMenu';
import { archiveNoteApi, changeColorAPI, deleteNoteForeverApi, trashNoteApi } from '../../utils/API';
import Modal from '@mui/material/Modal';
import AddNote from '../AddNote/AddNote';

const MAX_DESCRIPTION_LENGTH = 125;

const NoteCard = ({ title, description = "", noteDetails, updateList }) => {
    const [editNote, setEditNote] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [selectedColor, setSelectedColor] = useState(noteDetails?.color || '#FFFFFF');

    const colors = [
        "#FFFFFF", "#FAAFA8", "#F39F76", "#FFF8B8",
        "#E2F6D3", "#B4DDD3", "#D4E4ED", "#AECCDC",
        "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1"
    ];

    const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;
    const truncatedDescription = isLongDescription
        ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
        : description;

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setShowColors(false);
        changeColorAPI()
            .then((response) => {
                console.log("Response: ", response);
            })
            .catch((error) => {
                console.error("Error changing color:", error);
            });
        updateList({ action: 'color', data: { ...noteDetails, color } });
    };

    const handleIconClick = async (action, data = null) => {
        if (action === 'edit') {
            setEditNote(false);
            updateList({ action: 'edit', data });
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
            } else if (action === 'deleteForever') {
                await deleteNoteForeverApi({ "noteIdList": [`${noteDetails.id}`] });
                updateList({ action: "trash", data: { ...noteDetails, isDeleted: false } });
            }
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    return (
        <div
            className={`note-card-main-container ${isLongDescription ? 'expanded-card' : ''}`}
            style={{ backgroundColor: selectedColor }}
        >
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
                        <div className="color-picker-container">
                            <Palette className='icons' onClick={() => setShowColors(!showColors)} />
                            {showColors && (
                                <div className="color-picker">
                                    {colors.map((color) => (
                                        <div
                                            key={color}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorSelect(color)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <FolderDown onClick={() => handleIconClick('archive')} className='icons' />
                        <LongMenu handleIconClick={handleIconClick} className='icons menu-icon' />
                    </>
                )}
            </div>
            <Modal
                open={editNote}
                onClose={() => setEditNote(false)}
                className="custom-modal"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddNote expanded={true} noteDetails={noteDetails} handleIconClick={handleIconClick} />
            </Modal>
        </div>
    );
};

export default NoteCard;
