import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const storedTodos = JSON.parse(todoString);
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const completedTasks = todos.filter((todo) => todo.isCompleted).length;
  const pendingTasks = todos.length - completedTasks;
  const taskAccuracy = todos.length === 0 ? 0 : (completedTasks / todos.length) * 100;

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-4 bg-violet-200 min-h-[100vh] md:w-3/4">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todo tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo Task</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-4 py-2' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-indigo-900 disabled:bg-violet-700 px-4 py-2 text-sm font-bold text-white rounded-md'>Add</button>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished Tasks</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className="text-xl font-bold">Your Todo Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-8'>No todo tasks to display!!</div>}
          {todos.filter(item => showFinished ? item.isCompleted : !item.isCompleted).map(item => (
            <div key={item.id} className="todo flex md:w-2/3 my-4 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={() => handleCheckbox(item.id)} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={() => handleEdit(item.id)} className='bg-violet-800 hover:bg-indigo-900 p-4 py-2 text-sm font-bold text-white rounded-md mx-2'><FaEdit /></button>
                <button onClick={() => handleDelete(item.id)} className='bg-violet-800 hover:bg-indigo-900 p-4 py-2 text-sm font-bold text-white rounded-md mx-2'><MdDeleteSweep /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="summary mx-3 md:container md:mx-auto p-7 bg-indigo-900 text-white rounded-md mt-5 md:w-4/5">
        <div className="flex justify-between">
          <div className="completed-ttasks">
            <h3 className='text-xl font-bold'>Completed Tasks</h3>
            <p>{completedTasks}</p>
          </div>
          <div className="pending-tasks">
            <h3 className='text-xl font-bold'>Pending Tasks</h3>
            <p>{pendingTasks}</p>
          </div>
          <div className="task-accuracy">
            <h3 className='text-xl font-bold'>Task Accuracy</h3>
            <p>{taskAccuracy.toFixed(2)}%</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

