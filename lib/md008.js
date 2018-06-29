// @ts-check

"use strict";

const shared = require("./shared");

//const numRe = /\d+/g;

//const symbal = /^[^\u4e00-\u9fa5a-zA-Z\d]+$/;///\W/;  

const numReL = /[\d][\u4e00-\u9fa5]/g;///\W/;  

const numReR = /[\u4e00-\u9fa5][\d]/g;

module.exports = {
  "names": [ "MD008", "num_space" ],
  "description": "中文与数字之间需要增加空格",
  "tags": [ "space", "number" ],
  "function": function MD008(params, onError) {
    
    shared.forEachLine(function forLine(line, lineIndex) {
     const lineNumber = lineIndex + 1;
      let reL = line.match(numReL);
      let reR = line.match(numReR)
      if ( reL || reR ) {
        console.log(reL);
        console.log(reR);
         let check = false;
         let rangeReg ;
        if(reL){
          rangeReg = reL[0];
        }else if(reR){
          rangeReg = reR[0];
        }
        const actual = line.length - shared.trimRight(line).length;
        if (!check) {
          shared.addError(onError, lineNumber,
            "Expected: 增加空格",
            null,
            shared.rangeFromRegExp(line, rangeReg));
        }
      }
    });
  }
};
