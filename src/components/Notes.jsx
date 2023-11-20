import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils';

function Note({ id, body, title, archived, createdAt, handleDeleteNote, handleArchiveClick }) {
  const onDeleteClick = () => {
    handleDeleteNote(id);
  };
  const onArchiveClick = () => {
    handleArchiveClick(id);
  };
  return (
    <div key={id} className="flex flex-col drop-shadow-md justify-between mt-6 p-4 w-[400px] border h-[200px] bg-yellow-200 rounded-xl">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold ">{title}</span>
        <span className="text-xs">{body}</span>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="">{showFormattedDate(createdAt)}</p>
        {!archived ? (
          <button className="px-4 font-semibold bg-yellow-400 border border-yellow-500 rounded-md w-fit" onClick={onArchiveClick}>
            Archive
          </button>
        ) : null}
        <FaTrashAlt onClick={onDeleteClick} className="cursor-pointer" />
      </div>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleArchiveClick: PropTypes.func.isRequired,
};

export default Note;
