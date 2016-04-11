import React, { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = { words: null, word: null, match: false}
  }

  handleSubmit(e){
    e.preventDefault();
  }

  readFile = (e) =>{
    let file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = (e) => {
      let content = e.target.result.split("\n");
      this.setState({words: content})
    }
    reader.readAsText(file);
  }

  handleChange = (e) =>{
    this.setState({word: e.target.value});
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="file" onChange={this.readFile} />
          </form>
          {this.state.words ?
            <div>
              <h4>Insert a word in the box below to see if it matches the words on the file</h4>
              <input placeholder="word" value={this.state.word} onChange={this.handleChange}/>
              <h3>Contents of the file:</h3>
              {this.state.word ? <h6>{`${this.state.word} matches are below in red`}</h6> : null}
            </div>
            : null
          }
          <pre id="file-content">{this.state.words ? this.state.words.map(word => <p key={word} className={this.state.match}>{word}</p>) : "Upload a file using the button above"}</pre>
        </div>
      </div>
    );
  }
}
