import logo from './logo.svg';
import './App.css';
import Todo from './todos/todoForm';
import TodoDisplay from './todos/todoDisplay';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="App-title">
      <h1 className="text-danger border-bottom border-danger border-3">TODO App</h1>
      </div>
      <br></br>
      <h3 className="mb-3 text-warning">New Todo:</h3>
      <Todo data={{id: '', taskName: '', isCompleted: false}}></Todo>
      <br></br>
      <h3 className="mb-3 text-warning">All Todos:</h3>
      <Todo data={{id: 1, taskName: 'Walk Dog', isCompleted: true}}></Todo>
    </div>

  );
}

export default App;
