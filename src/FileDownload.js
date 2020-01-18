import React, { Component } from 'react';

class FileDownload extends Component {
    constructor() {
        super();
        this.state = {
            data : []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target.value);

        // get the first file in the node's file list as a File object
        const csvFile = document.getElementById('fileItem').files[0];
        console.log(csvFile);
    }

    render() {
        return(
            <form 
            onSubmit={this.handleSubmit}>
                <label 
                htmlFor="fileItem"
                className="visuallyHidden"
                >Upload CSV File</label>
                <input 
                type="file" 
                id="fileItem" 
                accept=".csv"/>
                <button>Upload CSV File</button>
            </form>
        )
    }
}

export default FileDownload;