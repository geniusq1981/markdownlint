// @ts-check

"use strict";

const shared = require("./shared");

const inlineCodeSpansRe = /(?:^|[^\\])((`+)((?:.*?[^`])|)\2(?!`))(?:$|[^\\])/g;

module.exports = {
  "names": [ "MD038", "no-space-in-code" ],
  "description": "代码块内不能以空格开始结束，代码块与其他文字之间需要空格",
  "tags": [ "whitespace", "code" ],
  "function": function MD038(params, onError) {
    shared.forEachInlineChild(params, "code_inline",
      function forToken(token) {
        const line = params.lines[token.lineNumber - 1];
        let match = null;
        while ((match = inlineCodeSpansRe.exec(line)) !== null) {
          console.log(match);
          const inlineCodeSpanC = match[0];
          const inlineCodeSpan = match[1];
          const content = match[3];
          const length = inlineCodeSpan.length;
          const column = match.index + 1 ;//+ (match[0].length - length);
          const range = [ column, length ];
          if (/^\s([^`]|$)/.test(content)) {
            shared.addErrorContext(onError, token.lineNumber,
              inlineCodeSpan, true, false, range);
          } else if (/[^`]\s$/.test(content)) {
            shared.addErrorContext(onError, token.lineNumber,
              inlineCodeSpan, false, true, range);
          } else if (/^[\u4e00-\u9fa5_a-zA-Z0-9]/.test(inlineCodeSpanC)){
            shared.addErrorContext(onError, token.lineNumber,
              inlineCodeSpan, true, false, range);
          } else if (/[\u4e00-\u9fa5_a-zA-Z0-9]$/.test(inlineCodeSpanC)){
            shared.addErrorContext(onError, token.lineNumber,
              inlineCodeSpan, true, false, range);
          }
        }
      });
  }
};
