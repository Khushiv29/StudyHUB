import React, { useState, useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  const [noteInput, setNoteInput] = useState("");
  const [fileInput, setFileInput] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (noteInput.trim() === "" && !fileInput) return;

    const newNote = {
      id: Date.now(),
      text: noteInput,
      file: fileInput,
    };

    setNotes([...notes, newNote]);
    setNoteInput("");
    setFileInput(null);
  }

  function deleteNote(id) {
    setNotes(notes.filter(n => n.id !== id));
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileInput({
        name: file.name,
        data: reader.result,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="container py-5">
      <h2>Notes</h2>

      <div className=" row mb-3">
        <div className=" col"> 
            <input
          type="text"
          className="form-control"
          placeholder="New note"
          value={noteInput}
          onChange={e => setNoteInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") addNote(); }}
        />
        </div>
        <div className=" col"> 
          <input
          type="file"
          className="form-control"
          onChange={handleFileUpload}
          accept="image/*,.pdf"
        />
          
        </div>
      
        <div className="mt-3">
        <button className="btn btn-primary" onClick={addNote}>Add Note</button>
          
        </div>
      </div>

      <ul className="list-group">
        {notes.map(note => (
          <li key={note.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                {note.text && <p>{note.text}</p>}
                {note.file && (
                  <>
                    <p><strong>Attached:</strong> {note.file.name}</p>
                    {note.file.type.includes("image") ? (
                      <img src={note.file.data} alt="Uploaded" style={{ maxWidth: "200px" }} />
                    ) : (
                      <a href={note.file.data} download={note.file.name} target="_blank" rel="noreferrer">
                        Download PDF
                      </a>
                    )}
                  </>
                )}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
