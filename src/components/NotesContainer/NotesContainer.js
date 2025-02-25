import React, { useEffect, useState } from 'react';
import { getNotes } from '../../utils/API';
import NoteCard from '../NoteCard/NoteCard';
import './NotesContainer.scss'
import AddNote from '../AddNote/AddNote';

const NotesContainer = () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        getNotes()
            .then((response) => {
                let normalNotes = (response?.data?.data?.data || []).filter((note) => {
                    return (!note.isArchived && !note.isDeleted);
                })
                setNotes(normalNotes.reverse());

                if (response.status !== 200) {
                    throw new Error(response?.data?.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching notes:", error);
            });
    }, []);

    const updateNoteList = (response) => {
        const { action, data } = response;

        if (action === 'add') {
            setNotes([{ title: data.title, description: data.description, id: data.id }, ...notes]);
        }
        else if (action === 'archive' || action === 'trash') {
            setNotes(notes.filter((note) => {
                return note.id !== data.id;
            }))
        }
        else if (action === 'edit') {
            setNotes(notes.map((note) => {
                if (note.id === data.id) {
                    return data;
                }

                return note;
            }))
        }
    }

    return (
        <div className='notes-container'>
            <div className='notes-addnote-component'>
                <AddNote updateList={updateNoteList} />
            </div>
            <div className='notes-main-container'>
                {notes.map((note, index) => (
                    <NoteCard
                        key={note.id || index}
                        title={note.title}
                        description={note.description}
                        noteDetails={note}
                        updateList={updateNoteList}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesContainer;
