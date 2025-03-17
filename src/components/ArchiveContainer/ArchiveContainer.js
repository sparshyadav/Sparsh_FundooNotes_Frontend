import React, { useEffect, useState } from "react";
import { getNotes } from "../../utils/API";
import NoteCard from "../NoteCard/NoteCard";
import Masonry from "@mui/lab/Masonry";
import "./ArchiveContainer.scss";

const ArchiveContainer = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes()
      .then((response) => {
        let archivedNotes = (response?.data?.data?.data || []).filter(
          (note) => note.isArchived
        );

        setNotes(archivedNotes.reverse());

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

    if (action === "archive" || action === "trash") {
      setNotes(notes.filter((note) => note.id !== data.id));
    }
  };

  return (
    <div className="notes-main-container">
      <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2}>
        {notes.map((note, index) => (
          <NoteCard
            key={note.id || index}
            title={note.title}
            description={note.description}
            noteDetails={note}
            updateList={updateNoteList}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default ArchiveContainer;
