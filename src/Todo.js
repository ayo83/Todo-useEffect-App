import React from 'react';

const Todo = ({ todo, toggleTodo }) => {
    
    const handleTodoClick = () => {
        toggleTodo(todo.id);
    }
  return (
    <div>
      <label>
        <input type='checkbox' checked={todo.completed} onChange={handleTodoClick} />
        {todo.name}
      </label>
    </div>
  );
};

export default Todo;
