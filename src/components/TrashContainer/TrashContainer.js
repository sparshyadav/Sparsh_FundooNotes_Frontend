import React, { useEffect, useState } from 'react';
import { getNotes } from '../../utils/API';
import NoteCard from '../NoteCard/NoteCard';

const TrashContainer = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      let deletedNotes = (response?.data?.data?.data || []).filter((note) => note.isDeleted);
      setNotes(deletedNotes.reverse());
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const updateNoteList = async (response) => {
    const { action, data } = response;

    if (action === 'trash') {
      setNotes(notes.filter((note) => {
        return note.id !== data.id;
      }))
    }
  };

  return (
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
  );
};

export default TrashContainer;
