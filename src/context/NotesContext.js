import { createContext, useContext, useEffect, useState } from "react";
import { getNotes } from "../utils/API";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [searchedText, setSearchedText] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await getNotes();

            if (response.status !== 200) {
                throw new Error(response?.data?.message);
            }

            const fetchedNotes = (response?.data?.data?.data || []).filter(
                (note) => !note.isArchived && !note.isDeleted
            );

            setNotes(fetchedNotes.reverse());
        } catch (error) {
            console.error("Error Fetching Notes: ", error);
        }
    };

    const filteredNotes = notes.filter((note) => {
        if (!searchedText.trim()) return true;
        const searchText = searchedText.toLowerCase();
        return (
            (note?.title?.toLowerCase() || "").includes(searchText) ||
            (note?.description?.toLowerCase() || "").includes(searchText)
        );
    });

    const updateNoteList = (response) => {
        const { action, data } = response;

        setNotes((prevNotes) => {
            if (action === "add") {
                return [{ ...data }, ...prevNotes];
            } else if (action === "archive" || action === "trash") {
                return prevNotes.filter((note) => note.id !== data.id);
            } else if (action === "unarchive") {
                return [{ ...data, isArchived: false }, ...prevNotes];
            } else if (action === "edit") {
                return prevNotes.map((note) => (note.id === data.id ? data : note));
            } else if (action === "reminder") {
                return prevNotes.map((note) =>
                    note.id === data.id ? { ...note, reminder: [data.reminder] } : note
                );
            }
            else if (action === 'removeReminder') {
                return prevNotes.map((note) =>
                    note.id === data.id ? { ...note } : note
                );
            }

            return prevNotes;
        });
    };

    return (
        <NotesContext.Provider value={{ notes, setNotes, updateNoteList, searchedText, setSearchedText, filteredNotes }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);
