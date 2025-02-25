import axios from "axios";

export const loginApiCall = async (payload) => {
    try {
        let response = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/login', payload);
        return response;
    } catch (error) {
        console.error("Error in loginApiCall: ", error);
        throw error;
    }
};

export const signinApiCall = async (payload) => {
    try {
        let response = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', payload);
        return response;
    } catch (error) {
        console.error("Error in signinApiCall: ", error);
        throw error;
    }
};

export const getNotes = async () => {
    try {
        return await axios.get('https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in getNotes: ", error);
        throw error;
    }
};

export const addNoteApi = async (payload) => {
    try {
        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in addNoteApi: ", error);
        throw error;
    }
};

export const archiveNoteApi = async (payload) => {
    try {
        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in archiveNoteApi: ", error);
        throw error;
    }
};

export const trashNoteApi = async (payload) => {
    try {
        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in trashNoteApi: ", error);
        throw error;
    }
};

export const deleteNoteForeverApi = async (payload) => {
    try {

        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in deleteNoteForeverApi: ", error);
        throw error;
    }
};


export const editNoteApi = async (payload) => {
    try {

        return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes", payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in editNoteApi: ", error);
        throw error;
    }
};
