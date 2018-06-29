// @ts-check

"use strict";

const shared = require("./shared");

const halfsymbolRe = /[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]/g;///\W/; 

const fullsymbolRe = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
//。|？|！|，|、|；|：|“|”|‘|’|（|）|《|》|〈|〉|【|】|『|』|「|」|﹃|﹄|〔|〕|…|—|～|﹏|￥

const fullsymbolReL = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5] /g;

const fullsymbolReR = / [\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;

const chineseRe = /[\u4e00-\u9fa5]/g;

const numRe = /[\uFF10-\uFF19]/g;
//const specialunitRe1 = /[\d] %/g
//const specialunitRe2 = /[\d] °/g
/*need ignore [](http://...)中的数字和文字*/

module.exports = {
  "names": [ "MD017", "symbol_space" ],
  "description": "中文请使用全角标点且与其他字符之间没有空格,数字请使用半角",
  "tags": [ "space", "symbol"],
  "function": function MD008(params, onError) {
    
    shared.forEachLine(function forLine(line, lineIndex) {
      const lineNumber = lineIndex + 1;
      //let re = line.match(halfsymbolRe);
      let re1 = line.match(fullsymbolReL);
      let re2 = line.match(fullsymbolReR);
      let re3 = line.match(numRe);
      if(line.match(chineseRe)){
      if ( re1 || re2 || re3) {
        let check = false;
         let rangeReg ;
        if(re1){
          rangeReg = re1[0];
        }else if(re2){
          rangeReg = re2[0];
        }else if(re3){
          rangeReg = re3[0];
        }
        const actual = line.length - shared.trimRight(line).length;
        if (!check) {
          shared.addError(onError, lineNumber,
            "Expected: " ,
            null,
            shared.rangeFromRegExp(line, rangeReg));
        }
      }
    }else{
        let re = line.match(numRe);
        if(re){
          let check = false;
          let rangeReg = re[0];
          const actual = line.length - shared.trimRight(line).length;
           if (!check) {
          shared.addError(onError, lineNumber,
            "Expected: 去掉空格" ,
            null,
            shared.rangeFromRegExp(line, rangeReg));
        }
        }
    }
    }); 
  }
};
