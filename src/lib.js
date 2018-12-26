const SPACE = " ";
const NEWLINE = "\n";

const getLineCount = function(file) {
  let lineCount = file.split("\n").length;
  return { file, lineCount };
};

const getByteCount = function(file) {
  let byteCount = file.split("").length;
  return { file, byteCount };
};

const replace = function(seperator1, seperator2, element) {
  if (element == seperator2) {
    element = seperator1;
  }
  return element;
};

const isNotEmpty = function(element) {
  return element != "";
};

const replaceSpaceWithNewLine = replace.bind(null, NEWLINE, SPACE);

const getWordCount = function(file) {
  let content = file.split("");
  let wordCount = content
    .map(replaceSpaceWithNewLine)
    .join("")
    .split("\n")
    .filter(isNotEmpty).length;
  return { file, wordCount };
};

const wc = function(fileNames, fs) {
  let { readFileSync } = fs;
  let file = readFileSync(fileNames[0], "utf8");
  let lines = getLineCount(file).lineCount;
  let bytes = getByteCount(file).byteCount;
  let words = getWordCount(file).wordCount;
  return ["", lines, words, bytes].join("\t") + " " + fileNames;
};

module.exports = { wc };
