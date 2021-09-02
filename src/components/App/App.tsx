import React from 'react';
import './App.css';
import { Link } from '../Link/Link';

function App() {

  return (
    <div>
      <h2>Hola desde App</h2>

      <nav className="App__nav">
        <Link
          text="Docs"
          url="https://reactjs.org/docs/getting-started.html"
          active />
        <Link
          text="Tutorial"
          url="https://reactjs.org/tutorial/tutorial.html"></Link>
        <Link
          text="Blog"
          url="https://reactjs.org/blog/"></Link>
        <Link
          text="Community"
          url="https://reactjs.org/community/support.html"></Link>
      </nav>
    </div>
  );
}

export default App;
