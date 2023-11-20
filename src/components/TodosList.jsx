import PropTypes from 'prop-types';
import { useState } from 'react';
import AddTodos from './AddTodos';
import Todo from './Todos';

function TodosList({ todos, handleDeleteTodo, handleAddTodo, toggleMode }) {
  const [archivedTodos, setArchivedTodos] = useState([]);

  const handleArchiveClick = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      const todoArchive = { ...todos[todoIndex] };
      todoArchive.archived = true;

      const updatedTodos = [...todos];
      updatedTodos.splice(todoIndex, 1);

      handleDeleteTodo(todoId);
      setArchivedTodos((prevArchivedTodos) => [...prevArchivedTodos, todoArchive]);
    }
  };

  const handleDeleteArchivedTodo = (todoId) => {
    const archivedTodoIndex = archivedTodos.findIndex((todo) => todo.id === todoId);
    if (archivedTodoIndex !== -1) {
      const updatedArchivedTodos = [...archivedTodos];
      updatedArchivedTodos.splice(archivedTodoIndex, 1);
      setArchivedTodos(updatedArchivedTodos);
    }
  };
  return (
    <div className={`flex flex-col h-fit py-4 ${toggleMode ? 'bg-black' : ''}`}>
      <div className="flex flex-col items-center">
        <h1 className={`text-xl font-semibold ${toggleMode ? 'text-white' : 'text-black'}`}>Add Your Todo Here...</h1>
        <AddTodos handleAddTodo={handleAddTodo} />
      </div>
      <div className="flex flex-col mt-2">
        <h1 className={`text-lg font-semibold ${toggleMode ? 'text-white' : 'text-black'}`}>Todo List</h1>
        <div className="w-full grid grid-cols-3 gap-[30px]">
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <Todo key={todo.id} id={todo.id} title={todo.title} body={todo.body} archived={false} createdAt={String(todo.createdAt)} handleDeleteTodo={handleDeleteTodo} handleArchiveClick={() => handleArchiveClick(todo.id)} />
            ))
          ) : (
            <div>GGG</div>
          )}
        </div>
      </div>
      <div className="flex flex-col py-4 mb-8">
        <h1 className={`text-lg font-semibold ${toggleMode ? 'text-white' : 'text-black'}`}>Archive</h1>
        <div className="w-full grid grid-cols-3 gap-[30px]">
          {archivedTodos.map((todo) => (
            <Todo key={todo.id} id={todo.id} title={todo.title} body={todo.body} archived={true} createdAt={String(todo.createdAt)} handleDeleteTodo={handleDeleteArchivedTodo} handleArchiveClick={() => handleArchiveClick(todo.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  toggleMode: PropTypes.bool.isRequired,
};

export default TodosList;
