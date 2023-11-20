import { useState } from 'react';
import PropTypes from 'prop-types';

function AddTodos({ handleAddNote }) {
  const [noteText, setNoteText] = useState({
    id: '0',
    title: '',
    body: '',
    archived: false,
    createdAt: '',
  });

  const characterLimitTitle = 25;
  const handleChangeTitle = (e) => {
    if (e.target.value.trim().length <= characterLimitTitle) {
      setNoteText({
        ...noteText,
        title: e.target.value,
      });
    }
  };

  const characterLimitBody = 50;
  const handleChangeBody = (e) => {
    if (e.target.value.trim().length <= characterLimitBody) {
      setNoteText({
        ...noteText,
        body: e.target.value,
      });
    }
  };

  const handleSaveClick = () => {
    if (noteText.body.trim().length > 0) {
      handleAddNote(noteText.title, noteText.body, noteText.archived, noteText.createdAt);
      setNoteText({ ...noteText, title: '', body: '' });
    }
  };

  return (
    <div className="flex flex-col drop-shadow-md justify-between mt-6 p-4 w-[400px] border h-[200px] bg-blue-400 rounded-xl">
      <input className="justify-start w-full h-[20px] m-1 text-lg font-semibold placeholder-gray-600 bg-blue-400" onChange={handleChangeTitle} value={noteText.title} placeholder="Texting this title" />
      <textarea className="justify-start w-full h-full m-1 text-xs placeholder-gray-600 bg-blue-400" onChange={handleChangeBody} value={noteText.body} placeholder="Texting here your description" />
      <div className="flex flex-row items-center justify-between">
        <p className="">{characterLimitBody - noteText.body.length} remaining</p>
        <button className="p-1 px-3 rounded-lg bg-slate-200" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
}

AddTodos.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
};

export default AddTodos;
