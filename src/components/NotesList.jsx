import PropTypes from 'prop-types';
import { useState } from 'react';
import AddNotes from './AddNotes';
import Note from './Notes';

function NotesList({ notes, handleDeleteNote, handleAddNote, toggleMode }) {
  const [archivedNotes, setArchivedNotes] = useState([]);

  const handleArchiveClick = (noteId) => {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      const noteArchive = { ...notes[noteIndex] };
      noteArchive.archived = true;

      const updatedNotes = [...notes];
      updatedNotes.splice(noteIndex, 1);

      handleDeleteNote(noteId);
      setArchivedNotes((prevArchivedNotes) => [...prevArchivedNotes, noteArchive]);
    }
  };

  const handleDeleteArchivedNote = (noteId) => {
    const archivedNoteIndex = archivedNotes.findIndex((note) => note.id === noteId);
    if (archivedNoteIndex !== -1) {
      const updatedArchivedNotes = [...archivedNotes];
      updatedArchivedNotes.splice(archivedNoteIndex, 1);
      setArchivedNotes(updatedArchivedNotes);
    }
  };
  return (
    <div className={`flex flex-col h-fit py-4 ${toggleMode ? 'bg-black' : ''}`}>
      <div className="flex flex-col items-center">
        <h1 className={`text-xl font-semibold ${toggleMode ? 'text-white' : 'text-black'}`}>Add Your Note Here...</h1>
        <AddNotes handleAddNote={handleAddNote} />
      </div>
      <div className="flex flex-col mt-2">
        <h1 className={`text-lg font-semibold ${toggleMode ? 'text-white' : 'text-black'}`}>Note List</h1>
        <div className="w-full grid grid-cols-3 gap-[30px]">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <Note key={note.id} id={note.id} title={note.title} body={note.body} archived={false} createdAt={String(note.createdAt)} handleDeleteNote={handleDeleteNote} handleArchiveClick={() => handleArchiveClick(note.id)} />
            ))
          ) : (
            <div className={`${toggleMode ? 'text-white' : 'text-black'}`}>Silahkan mengisi catatan untuk tambahkan Note List</div>
          )}
        </div>
      </div>
      <div className="flex flex-col py-4 mb-8">
        <h1 className={`text-lg font-semibold ${toggleMode ? 'text-white' : 'text-black'}`}>Archive</h1>
        <div className="w-full grid grid-cols-3 gap-[30px]">
          {archivedNotes.length > 0 ? (
            archivedNotes.map((note) => (
              <Note key={note.id} id={note.id} title={note.title} body={note.body} archived={true} createdAt={String(note.createdAt)} handleDeleteNote={handleDeleteArchivedNote} handleArchiveClick={() => handleArchiveClick(note.id)} />
            ))
          ) : (
            <div className={`${toggleMode ? 'text-white' : 'text-black'}`}>Belum ada catatan yang diarsipkan</div>
          )}
        </div>
      </div>
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleAddNote: PropTypes.func.isRequired,
  toggleMode: PropTypes.bool.isRequired,
};

export default NotesList;
