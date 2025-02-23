import axios from "axios"

export const loginApiCall = async (payload) => {
    try {
        let response = await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/login', payload)
        return response;
    }
    catch(error){
        console.log("Error: ", error);
    }
}

export const signinApiCall=async(payload)=>{
    try{
        let response=await axios.post('https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', payload);
        return response;
    }
    catch(error){
        console.log("Error: ", error);
    }
}

export const getNotes=()=>{
    return axios.get('https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}

export const addNoteApi = async(payload) => {
    return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", payload, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}