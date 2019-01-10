"use strict";
function countWords(sentence) {
    return sentence.split(' ').length;
}
var n = countWords("I am just trying");
var b = countWords('3456');
console.log(n);
