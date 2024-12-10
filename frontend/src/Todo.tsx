import React from 'react';
import './App.css';

export type TodoType = {
  title: string,
  description: string,
}

function Todo({ title, description }: TodoType) {
  return (
    <div className="todo">
      <div className="todo-details">
        <p className="todo-title">{title}</p>
        <p className="todo-description">{description}</p>
      </div>
    </div>
  );
}

export default Todo;
