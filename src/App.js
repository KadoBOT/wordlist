import React, { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = { words: null, word: null, match: false, validWords: []}
    this.returnedWords = []
  }

  readFile = (e) => {
    this.setState({words: null, word: null, match: false, validWords: []})
    let file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = (e) => {
      let content = e.target.result.split("\n");
      this.setState({
        words: content
      })
    }
    reader.readAsText(file);
  }

  handleSubmit(e){
    e.preventDefault();
  }

  unique = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });
  }

  checkIfExists = (array, value) => {
    let stringArray = value.split('');
    let result = true;
    stringArray.map( (letter, i) => {
      if (i != 0 && (letter.toLowerCase() === 'a' || letter.toLowerCase() === 'e' || letter.toLowerCase() === 'i' || letter.toLowerCase() === 'h' || letter.toLowerCase() === 'o' || letter.toLowerCase() === 'u' || letter.toLowerCase() === 'w' || letter.toLowerCase() === 'y')) {
        return null;
      }
      if(result){
        if(!array.includes(letter)){
          result = false;
        }
      }
    })

    if(result){
      this.returnedWords.push(value)
      this.setState({validWords: this.unique(this.returnedWords)})
    }
  }

  inArray = (array) => {
    let word_list = this.state.words
    word_list.map( value => {
      this.checkIfExists(array, value.toLowerCase());
    })
  }

  findLetter = (e) => {
    let word = e.target.value;
    let lettersArrays = [
      ['A', 'E', 'I', 'O', 'U'],
      ['C', 'G', 'J', 'K', 'Q', 'S', 'X', 'Y', 'Z'],
      ['B', 'F', 'P', 'V', 'W'],
      ['D', 'T'],
      ['M', 'N']
    ];
    let validLetters = []
    let letters = word.split("")
    letters = letters.filter(letter => /^[a-zA-Z0-9.]*$/.test(letter) )

    letters.map((letter, i) => {
      if (i != 0 && (letter.toLowerCase() === 'a' || letter.toLowerCase() === 'e' || letter.toLowerCase() === 'i' || letter.toLowerCase() === 'h' || letter.toLowerCase() === 'o' || letter.toLowerCase() === 'u' || letter.toLowerCase() === 'w' || letter.toLowerCase() === 'y')) {
        return null;
      } else {
        validLetters.push(letter)
        lettersArrays.map(array => {
          for (let j of array) {
            if (letter === j.toLowerCase()) {
              array.map(letter => validLetters.push(letter.toLowerCase()))
            }
          }
        })
      }
    })
    this.returnedWords = []
    return this.inArray(this.unique(validLetters))
  }


  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="file" onChange={this.readFile} />
          </form>
          {!this.state.words ? "Upload a file using the button above" : null}
          {this.state.words ?
            <div>
              <h4>Insert a word in the box below to see if it matches the words on the file</h4>
              <input placeholder="Type a word here" value={this.state.word} onChange={this.findLetter}/>
              <h3>Contents of the file:</h3>
            </div>
            : null
          }
          <pre id="file-content">{this.state.validWords ? this.state.validWords.map((word, i) => <p key={i}>{word}</p>) : null}</pre>
          <pre id="file-content">{this.state.words && !this.state.validWords.length ? this.state.words.map(word => <p key={word} className={this.state.match}>{word}</p>) : null}</pre>
        </div>
      </div>
    );
  }
}
