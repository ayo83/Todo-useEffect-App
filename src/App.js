import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

const App = () => {

  /** Init State and Set State */
  const [todos, setTodos] = useState([]);

  /** Setting Use Ref to a variable name */
  const todoNameRef = useRef();



  /** Get Todos from Local DB */
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);




  /** Save Todos to Local Storage */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);




  /** Toggle check box */
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }




  /** Add Todo to list */
  const handleAddTodo = () => {
    const inputValue = todoNameRef.current.value;

    const todoModel = {
      id: uuidv4(),
      name: inputValue,
      completed: false
    };

    if (inputValue === '') return alert('Please Enter a Todo');

    setTodos(prevTodos => {
      return [...prevTodos, todoModel]
    });
    todoNameRef.current.value = ''
  }


  /** Clear Completed Todos */
  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  

  return (
    <div>
      <h1>TODO APPLICATION</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.completed).length} left to do</div>
    </div>
  );
}

export default App;