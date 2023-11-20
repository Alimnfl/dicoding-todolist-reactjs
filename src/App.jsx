import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Header from './components/Header';
import Search from './components/Search';
import NotesList from './components/NotesList';
import { getInitialData, showFormattedDate } from './utils/index';

function App() {
  const [notes, setNotes] = useState(getInitialData());

  const [searchText, setSearchText] = useState('');
  const [toggleMode, setToggleMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('ts-react-notes-data') || 'null');

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ts-react-notes-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, body, boolean) => {
    const newNote = {
      id: nanoid(),
      title: title,
      body: body,
      archived: boolean,
      createdAt: showFormattedDate(new Date().toISOString()),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNotes = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`flex flex-col items-center justify-center w-full h-fit ${toggleMode ? 'bg-black ' : ''}`}>
      <div className="p-5 w-[1300px] h-fit">
        <Header handleToggleMode={setToggleMode} toggleMode={toggleMode} />
        <Search handleSearchText={setSearchText} toggleMode={toggleMode} />
        <NotesList toggleMode={toggleMode} notes={notes.filter((note) => note.title.toLowerCase().includes(searchText.toLowerCase()))} handleAddNote={addNote} handleDeleteNote={deleteNotes} />
      </div>
    </div>
  );
}

export default App;
