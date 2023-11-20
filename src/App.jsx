import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Header from './components/Header';
import Search from './components/Search';
import TodosList from './components/TodosList';

function App() {
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      title: 'First todo',
      body: 'I want to make a good person',
      archived: false,
      createdAt: '3/18/2023',
    },
    {
      id: nanoid(),
      title: 'Second Todo',
      body: 'I want to make a good person',
      archived: false,
      createdAt: '3/18/2023',
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [toggleMode, setToggleMode] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('ts-react-todos-data') || 'null');

    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ts-react-todos-data', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, body, boolean) => {
    const date = new Date();
    const newTodo = {
      id: nanoid(),
      title: title,
      body: body,
      archived: boolean,
      createdAt: date.toLocaleDateString(),
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const deleteTodos = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className={`flex flex-col items-center justify-center w-full h-fit ${toggleMode ? 'bg-black ' : ''}`}>
      <div className="p-5 w-[1300px] h-fit">
        <Header handleToggleMode={setToggleMode} toggleMode={toggleMode} />
        <Search handleSearchText={setSearchText} toggleMode={toggleMode} />
        <TodosList toggleMode={toggleMode} todos={todos.filter((todo) => todo.title.toLowerCase().includes(searchText.toLowerCase()))} handleAddTodo={addTodo} handleDeleteTodo={deleteTodos} />
      </div>
    </div>
  );
}

export default App;
