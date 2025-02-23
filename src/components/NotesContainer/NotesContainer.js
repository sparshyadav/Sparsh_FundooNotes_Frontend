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
                setNotes(response?.data?.data?.data || []);

                if (response.status !== 200) {
                    throw new Error(response?.data?.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching notes:", error);
            });
    }, []);

    const updateNoteList = (data) => {
        setNotes((prevNotes) => [data, ...prevNotes]);
        console.log("Notes: ", notes);
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
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesContainer;
