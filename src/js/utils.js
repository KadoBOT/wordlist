function unique(arrArg){
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

function checkIfExists(array, value) {
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
    let value = value;
  }
}

function inArray(array){
  let word_list = ['angel', 'brave', 'Braev', 'Don', 'Engel', 'go', 'goal', 'son', 'sunny', 'Tom', 'Tooonnnnyyyy']
  word_list.map( value => {
    checkIfExists(array, value.toLowerCase());
  })
}

export function findLetter(word){
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
  return inArray(unique(validLetters))
}
