// @ts-check

"use strict";

const shared = require("./shared");

const unitRe = /[\d][a-zA-Z]/g;///\W/; 

const specialunitRe1 = /[\d] %/g
const specialunitRe2 = /[\d] °/g

module.exports = {
  "names": [ "MD016", "unit_space" ],
  "description": "数字与单位之间需要增加空格,%/°除外",
  "tags": [ "space", "num", "unit" ],
  "function": function MD008(params, onError) {
   
    shared.forEachLine(function forLine(line, lineIndex) {
      const lineNumber = lineIndex + 1;
      let re = line.match(unitRe);
      let re1 = line.match(specialunitRe1);
      let re2 = line.match(specialunitRe2)
      if ( re || re1 || re2 ) {
        console.log(re);
        let check = false;
        let rangeReg ;
        if(re){
          rangeReg = re[0];
        }else if(re1){
          rangeReg = re1[0];
        }else if(re2){
          rangeReg = re2[0];
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
