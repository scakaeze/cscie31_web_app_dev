function countWords(sentence:string):number {
  return sentence.split(' ').length;
}


var n: number = countWords("I am just trying");

var b: number = countWords('3456');

console.log(n);
