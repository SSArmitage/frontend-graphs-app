import React, { Component } from 'react';
import './App.css';
import FileDownload from './FileDownload';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Graphing Data</h1>
        </header>
        <main>
          <FileDownload />
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
