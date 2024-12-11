import React, { useEffect, useState, FormEvent } from 'react';
import './App.css';
import Todo, { TodoType } from './Todo';

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //useEffect to fetch To-Dos
  useEffect(() => {
    fetchTodos();
  }, []);

  //fetch To-Dos
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8080/'); //GET request from GO backend
      if (response.status !== 200) { //if json returns status 200 returning error message
        console.log('Error fetching data');
        return;
      }
      setTodos(await response.json()); //otherwise set our To-dos 
    } catch (e) {
      console.log('Could not connect to server. Ensure it is running. ' + e);
    }
  };

  //submission function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); //preventing reload response
    
    //basic validation and verification for empty title inputs
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }


    //using Post method to store within local main storage
    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.status === 201) {
        fetchTodos(); //refresh the todo after fetch
        setTitle(''); //then set as empty
        setDescription(''); //then set as empty
      } else { 
        console.log('Error adding todo'); //error case
      }
    } catch (e) {
      console.log('Error submitting todo: ' + e); //specific error case
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO</h1>
      </header>
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.title + todo.description}
            title={todo.title}
            description={todo.description}
          />
        ))}
      </div>
      <h2>Add a Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus={true}
        />
        <input
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default App;