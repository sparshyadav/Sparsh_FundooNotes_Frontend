import React, { useEffect, useState } from 'react';
import { getNotes } from '../../utils/API';
import NoteCard from '../NoteCard/NoteCard';

const TrashContainer = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      console.log("Response: ", response);
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
    const { action } = response;

    if (action === 'trash' || action === 'archive') {
      await fetchNotes();
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
