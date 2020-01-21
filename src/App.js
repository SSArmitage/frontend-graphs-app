import React, { Component } from 'react';
import './App.css';
import FileDownload from './FileDownload';
import Graph from './Graph'

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      userPickedGraph: false,
      selectedGraph: ''
    }
  }

  hanldeFileData = (data) => {
    // console.log(data);
    
    this.setState({
      data: data,
      userPickedGraph: true
    })
  }

  handleGraphData = (graph) => {
    this.setState({
      selectedGraph: graph
    })
  }

  render() {
    return (
      <div className="wrapper">
        <header className="App-header">
          <h1>Display Data From CSV file</h1>
        </header>
        <main>
          <FileDownload 
          uploadFile={this.hanldeFileData}
          selectedGraph={this.handleGraphData}/>
          {this.state.userPickedGraph
          ?
          <Graph
          chosenGraph={this.state.selectedGraph}
          data={this.state.data} />
          :
          null
          }
         
        </main>
        <footer>Completed by Sarah Armitage</footer>
      </div>
    );
  }
}

export default App;
