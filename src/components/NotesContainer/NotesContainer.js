import React from "react";
import NoteCard from "../NoteCard/NoteCard";
import "./NotesContainer.scss";
import AddNote from "../AddNote/AddNote";
import { useNotes } from "../../context/NotesContext";
import Masonry from "@mui/lab/Masonry";
import { useChangeView } from "../../context/ViewChangeContext";

const NotesContainer = () => {
    const { filteredNotes, updateNoteList } = useNotes();
    const { view } = useChangeView();

    return (
        <div className="notes-container">
            <div className="notes-addnote-component">
                <AddNote updateList={updateNoteList} />
            </div>
            <div className="notes-main-container">
                {
                    view ?
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
                        </Masonry> :
                        filteredNotes.map((note, index) => (
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
                        ))

                }
            </div>
        </div>
    );
};

export default NotesContainer;
