import React, { useState } from 'react';
import './NoteCard.scss';
import { CircleX, UserPlus, Image, FolderDown, ArchiveRestore, Trash2, Palette } from 'lucide-react';
import LongMenu from './LongMenu';
import ReminderIcon from './ReminderIcon'
import { addReminderAPI, archiveNoteApi, changeColorAPI, deleteNoteForeverApi, removeReminderAPI, trashNoteApi } from '../../utils/API';
import Modal from '@mui/material/Modal';
import AddNote from '../AddNote/AddNote';
import { useNavigate } from 'react-router-dom';
import { useChangeView } from '../../context/ViewChangeContext';

const MAX_DESCRIPTION_LENGTH = 360;
const MAX_TITLE_LENGTH = 75;

const NoteCard = ({ title, description = "", noteDetails, updateList }) => {
    const navigate = useNavigate();
    const { view } = useChangeView();

    const [editNote, setEditNote] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [selectedColor, setSelectedColor] = useState(noteDetails?.color || '#FFFFFF');


    const colors = [
        "#FFFFFF", "#FAAFA8", "#F39F76", "#FFF8B8",
        "#E2F6D3", "#B4DDD3", "#D4E4ED", "#AECCDC",
        "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1"
    ];

    const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;
    const isLongTitle = title.length > MAX_TITLE_LENGTH;
    const truncatedDescription = isLongDescription ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..." : description;
    const truncatedTitle = isLongTitle ? title.substring(0, MAX_TITLE_LENGTH) + "..." : title;

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
                await trashNoteApi({ "noteIdList": [`${noteDetails.id}`], "isDeleted": !noteDetails.isDeleted });
                updateList({ action: "trash", data: { ...noteDetails, isDeleted: true } });
            }
            else if (action === 'untrash') {
                await trashNoteApi({ "noteIdList": [`${noteDetails.id}`], "isDeleted": !noteDetails.isDeleted });
                updateList({ action: "untrash", data: { ...noteDetails, isDeleted: false } });
            } else if (action === 'deleteForever') {
                await deleteNoteForeverApi({ "noteIdList": [`${noteDetails.id}`] });
                updateList({ action: "trash", data: { ...noteDetails, isDeleted: false } });
            }
            else if (action === 'color') {
                setShowColors(false);
                changeColorAPI({ "noteIdList": [`${noteDetails.id}`], color: data });
                updateList({ action: 'color', data: { ...noteDetails, color: selectedColor } });
            }
            else if (action === 'reminder') {
                await addReminderAPI({ "noteIdList": [`${noteDetails.id}`], reminder: data })
                updateList({ action: 'reminder', data: { ...noteDetails, reminder: data } })
            }
            else if (action === 'removeReminder') {
                removeReminderAPI({ "noteIdList": [`${noteDetails.id}`] }).then((res) => console.log("response: ", res));
                updateList({ action: 'removeReminder', data: { ...noteDetails } })
            }
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    return (
        <div
            className={`note-card-main-container ${isLongDescription ? 'expanded-card' : ''} ${view ? 'grid-view' : ''}`}
            style={{ backgroundColor: selectedColor }}
        >
            <div className='card-container-info' onClick={() => {
                setEditNote(true);
                navigate(`/dashboard/notes/${noteDetails.id}`);
            }}>
                <h3 className='card-title'>{truncatedTitle}</h3>
                <p className='card-desc'>{truncatedDescription}</p>
            </div>
            <div className='reminder-container'>
                {Array.isArray(noteDetails?.reminder) && noteDetails.reminder.length > 0 && (
                    <div className='reminder-container'>
                        <div className="reminder-box">
                            <span className="reminder-text">
                                {new Date(noteDetails.reminder[0]).toLocaleString()}
                            </span>
                        </div>
                        <div className='reminder-close' onClick={() => handleIconClick('removeReminder', noteDetails)}>
                            <CircleX className='reminder-close-icon' />
                        </div>
                    </div>
                )}
            </div>
            <div className='card-container-options'>
                {noteDetails?.isDeleted ? (
                    <>
                        <ArchiveRestore className='icons' onClick={() => handleIconClick('untrash')} />
                        <Trash2 className='icons' onClick={() => handleIconClick('deleteForever')} />
                    </>
                ) : (
                    <>
                        <ReminderIcon className='icons menu-icon' handleIconClick={handleIconClick} />
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
                                            onClick={() => {
                                                setSelectedColor(color);
                                                handleIconClick('color', color)
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <FolderDown onClick={() => handleIconClick('archive')} className='icons' />
                        <div className="long-menu-container">
                            <LongMenu className='icons menu-icon' handleIconClick={handleIconClick} />
                        </div>

                    </>
                )}
            </div>
            <Modal
                open={editNote}
                onClose={() => {
                    setEditNote(false);
                    navigate(`/dashboard/notes`);
                }}
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




