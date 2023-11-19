import { useState } from 'react';
import AddTodos from './AddTodos';
import Todo from './Todos';

function TodosList(todos, handleDeleteTodo, handleAddTodo, toggleMode) {
  const [archivedTodos, setArchivedTodos] = useState([]);
  console.log(todos);
  const handleArchiveClick = (todoId) => {
    const todoIndex = todos?.todos?.findIndex((todo) => todo.id === todoId);
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
    <div className="flex flex-col py-4">
      <div className="flex flex-col">
        <h1 className={`text-lg font-semibold ${toggleMode ? 'text-white' : 'text-black'}`}>Todo List</h1>
        <div className="w-full grid grid-cols-3 gap-[30px]">
          {Array.isArray(todos) &&
            todos.map((todo) => <Todo key={todo.id} id={todo.id} title={todo.title} body={todo.body} archived={false} createdAt={todo.createdAt} handleDeleteTodo={handleDeleteTodo} handleArchiveClick={() => handleArchiveClick(todo.id)} />)}
          <AddTodos handleAddTodo={handleAddTodo} />
        </div>
      </div>
      <div className="pt-4">
        <h1 className={`text-lg font-semibold ${toggleMode ? 'text-white' : 'text-black'}`}>Archive</h1>
        <div className="w-full grid grid-cols-3 gap-[30px]">
          {archivedTodos.map((todo) => (
            <Todo key={todo.id} id={todo.id} title={todo.title} body={todo.body} archived={true} createdAt={todo.createdAt} handleDeleteTodo={handleDeleteArchivedTodo} handleArchiveClick={() => handleArchiveClick(todo.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodosList;
