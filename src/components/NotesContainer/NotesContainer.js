import React from "react";
import NoteCard from "../NoteCard/NoteCard";
import "./NotesContainer.scss";
import AddNote from "../AddNote/AddNote";
import { useNotes } from "../../context/NotesContext";

const NotesContainer = () => {
    const { filteredNotes, updateNoteList } = useNotes();

    return (
        <div className="notes-container">
            <div className="notes-addnote-component">
                <AddNote updateList={updateNoteList} />
            </div>
            <div className="notes-main-container">
                {filteredNotes.map((note, index) => (
                    <NoteCard
                        style={{ backgroundColor: note.color || "white" }}
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
