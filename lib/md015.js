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
    
    shared.forEachLine(function forLine(line, lineIndex) {
      const lineNumber = lineIndex + 1;
      let reL = line.match(enwordReL);
      let reR = line.match(enwordReR)
      if ( reL || reR ) {
        console.log(reL);
        console.log(reR);
        let check = false;
         let rangeReg;
        if(reL){
          rangeReg = reL[0];
        }else if(reR){
          rangeReg = reR[0];
        }
        const actual = line.length - shared.trimRight(line).length;
        if (!check) {
          shared.addError(onError, lineNumber,
            "Expected: 增加空格" ,
            null,
            shared.rangeFromRegExp(line, rangeReg));
        }
      }
    });
  }
};
