import React, { Component } from 'react';
import './App.css';
import FileDownload from './FileDownload';
import Graph from './Graph'

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      csvFileUploaded: false,
      userPickedGraph: false,
      selectedGraph: ''
    }
  }

  hanldeFileData = (data) => {
    
    this.setState({
      data: data,
      csvFileUploaded: true
    
    })
  }

  handleGraphData = (graph) => {
    this.setState({
      selectedGraph: graph,
      userPickedGraph: true
    })
  }

  render() {
    return (
      <div className="wrapper">
        <header className="App-header">
          <h1>Display Data From CSV File</h1>
        </header>
        <main>
          <FileDownload
          csvSelected={this.state.csvFileUploaded} 
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
        <footer>Completed by Sarah Armitage 2020</footer>
      </div>
    );
  }
}

export default App;
