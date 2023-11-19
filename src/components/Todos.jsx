import { FaTrashAlt } from 'react-icons/fa';

function Todo(id, body, title, archived, createdAt, handleDeleteTodo, handleArchiveClick) {
  const onDeleteClick = () => {
    handleDeleteTodo(id);
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
        <p className="">{createdAt}</p>
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

export default Todo;
