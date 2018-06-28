// @ts-check

"use strict";

const shared = require("./shared");

const halfsymbolRe = /[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]/g;///\W/; 

const fullsymbolRe = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;

const fullsymbolReL = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5] /g;

const fullsymbolReR = / [\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;

const chineseRe = /[\u4e00-\u9fa5]/g;
//const specialunitRe1 = /[\d] %/g
//const specialunitRe2 = /[\d] °/g

module.exports = {
  "names": [ "MD017", "symbol_space" ],
  "description": "中文请使用全角标点且与其他字符之间没有空格,英文请使用半角",
  "tags": [ "space", "symbol"],
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
      //let re = line.match(halfsymbolRe);
      let re1 = line.match(fullsymbolReL);
      let re2 = line.match(fullsymbolReR)
      //console.log(re);
      if(line.match(chineseRe)){
      if (( re1 || re2) && (listItemLineNumbers.indexOf(lineNumber) === -1)) {
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
    }else{
        if(line.match(fullsymbolRe)){
          let check = false;
          const actual = line.length - shared.trimRight(line).length;
           if (!check) {
          shared.addError(onError, lineNumber,
            "Expected: " + (expected === 0 ? "" : "0 or ") +
              expected + "; Actual: " + actual,
            null,
            shared.rangeFromRegExp(line, check));
        }
        }
    }
    }); 
  }
};
