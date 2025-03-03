import React from "react";
import NoteCard from "../NoteCard/NoteCard";
import "./NotesContainer.scss";
import AddNote from "../AddNote/AddNote";
import { useNotes } from "../../context/NotesContext";
import Masonry from "@mui/lab/Masonry";

const NotesContainer = () => {
    const { filteredNotes, updateNoteList } = useNotes();

    return (
        <div className="notes-container">
            <div className="notes-addnote-component">
                <AddNote updateList={updateNoteList} />
            </div>
            <div className="notes-main-container">
                <Masonry
                    columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} 
                    spacing={2}
                >
                    {filteredNotes.map((note, index) => (
                        <NoteCard
                            key={note.id || index}
                            className="note-card"
                            style={{
                                backgroundColor: note.color || "white",
                            }}
                            title={note.title}
                            description={note.description}
                            noteDetails={note}
                            updateList={updateNoteList}
                        />
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default NotesContainer;
