import './App.css';
import Todo from './todos/todoForm';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, Fragment } from 'react';
import axios from "axios";

function App() {
  const [todos, setTodos] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onUpdate = () => {
    setFormSubmitted(!formSubmitted);
  }

  useEffect(() => {
    axios.get("https://localhost:7271/api/todoItems/GetList/")
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.log(err.toJSON()));
  }, [formSubmitted])

  return (
    <Fragment>
      {todos === null ? <div></div> :
        <div className="App">
          <div className="App-title">
            <h1 className="text-danger border-bottom border-danger border-3">TODO App</h1>
          </div>
          <br></br>
          <div className="App-section">
            <h3 className="border-bottom border-warning border-3 text-warning">New Todo:</h3>
          </div>
          <Todo data={{ id: 0, name: '', isCompleted: false }} onUpdate={onUpdate}></Todo>
          <br></br>
          <br></br>
          <div className="App-section">
            <h3 className="border-bottom border-warning border-3 text-warning text-warning">All Todos:</h3>
          </div>
          {todos.map((todo) => {
            return (<Fragment key={todo.name+todo.id}><Todo data={todo} onUpdate={onUpdate}/><br></br></Fragment>)
          })
          }
        </div>
      }
    </Fragment>
  );
}

export default App;
