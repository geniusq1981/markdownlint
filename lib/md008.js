// @ts-check

"use strict";

const shared = require("./shared");

const trailingSpaceRe = /\d+/;

var check = false;

module.exports = {
  "names": [ "MD008", "space-between-number-with-word" ],
  "description": "space should have around number",
  "tags": [ "space", "number" ],
  "function": function MD008(params, onError) {
    let brSpaces = params.config.br_spaces;
    if (brSpaces === undefined) {
      brSpaces = 2;
    }
    const listItemEmptyLines = params.config.list_item_empty_lines;
    const allowListItemEmptyLines =
      (listItemEmptyLines === undefined) ? false : !!listItemEmptyLines;
    const listItemLineNumbers = [];
    if (allowListItemEmptyLines) {
      shared.filterTokens(params, "list_item_open", function forToken(token) {
        for (let i = token.map[0]; i < token.map[1]; i++) {
          listItemLineNumbers.push(i + 1);
        }
      });
    }
    const expected = (brSpaces < 2) ? 0 : brSpaces;
    shared.forEachLine(function forLine(line, lineIndex) {
      const lineNumber = lineIndex + 1;
      let re = trailingSpaceRe.exec(line);
      if (re && (listItemLineNumbers.indexOf(lineNumber) === -1)) {
        console.log(re);
        re.forEach(function(num,index){
            let str = line.split(num);
            console.log(str);
            str.forEach(function(s,index){
              if(s.length){
              let first = s.charAt(0);
              let last = s.charAt(s.length-1);
              console.log(first);
              console.log(last);
              let symbal = /\W/g;             
              if((first.search(symbal)||first==" ")&&index!=0){ 
                console.log("first enter");
                check = true;
              }
              if((last.search(symbal)||last==" ")&&index!=str.length-1){
                console.log("last enter");
                check = true;
              }
              }
            });
              console.log(check);
        });
        const actual = line.length - shared.trimRight(line).length;
        if (expected !== actual) {
          shared.addError(onError, lineNumber,
            "Expected: " + (expected === 0 ? "" : "0 or ") +
              expected + "; Actual: " + actual,
            null,
            shared.rangeFromRegExp(line, check));
        }
      }
    });
  }
};
