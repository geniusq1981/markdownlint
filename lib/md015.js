// @ts-check

"use strict";

const shared = require("./shared");

const enwordReL = /[a-zA-Z][\u4e00-\u9fa5]/g;///\W/;  

const enwordReR = /[\u4e00-\u9fa5][a-zA-Z]/g;

module.exports = {
  "names": [ "MD015", "word_space" ],
  "description": "中英文之间需要增加空格",
  "tags": [ "space", "word" ],
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
      let reL = line.match(enwordReL);
      let reR = line.match(enwordReR)
      //console.log(re);
      if ((reL || reR) && (listItemLineNumbers.indexOf(lineNumber) === -1)) {
        console.log(reL);
        console.log(reR);
        let check = false;
        /*let templine = line;
        re.forEach(function(num,index){
          console.log(templine);
            let str = templine.split(num);
            //console.log(str);
            str.forEach(function(s,index){
              if(s.length){
              let first = s.charAt(0);
              let last = s.charAt(s.length-1);       
              if(chwordRe.test(first) && index != 0){ 
                //console.log("first enter");
                check = false;
              }
              if(chwordRe.test(last) && index != str.length-1){
                //console.log("last enter");
                //console.log(last.search(symbal));
                //console.log(index);
                //console.log(str.length-1);
                check = false;
              }
              }
            });
            templine = str.join('');
        });*/
        const actual = line.length - shared.trimRight(line).length;
        if (!check) {
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
