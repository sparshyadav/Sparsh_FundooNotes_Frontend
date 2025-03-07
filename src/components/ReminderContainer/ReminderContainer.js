import React, { useEffect, useState } from "react";
import { Archive } from "lucide-react";
import "./ReminderContainer.scss";
import { getReminderNotes } from "../../utils/API";
import Masonry from "@mui/lab/Masonry";
import NoteCard from "../NoteCard/NoteCard";

function ReminderContainer() {
  const [reminderNotes, setReminderNotes] = useState([]);

  useEffect(() => {
    getReminderNotes()
      .then((res) => {
        console.log("Reminder Notes: ", res);
        setReminderNotes(res?.data?.data?.data || []);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="reminder-main-container">
      {reminderNotes.length > 0 ? (
        <div className="notes-main-container">
          <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {reminderNotes.map((note, index) => (
              <NoteCard
                key={note.id || index}
                title={note.title}
                description={note.description}
                noteDetails={note}
              />
            ))}
          </Masonry>
        </div>
      ) : (
        <div className="reminder-center-container">
          <Archive className="icon" />
          <p className="text">Your Reminders Appear Here</p>
        </div>
      )}
    </div>
  );
}

export default ReminderContainer;
