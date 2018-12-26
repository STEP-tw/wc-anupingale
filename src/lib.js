const {
  space,
  newline,
  empty,
  tabspace,
  splitContent,
  isNotempty
} = require("./util.js");

const readContent = (readFileSync, file) => readFileSync(file, "utf8");

const getLines = splitContent.bind(null, newline);

const getBytes = splitContent.bind(null, empty);

const removeSpaceAndNewline = splitContent.bind(null, /[ \n]+/);

const getWords = file => removeSpaceAndNewline(file).filter(isNotempty);

const getLinesCount = file => getLines(file).length;

const getBytesCount = file => getBytes(file).length;

const getWordCount = file => getWords(file).length;

const getAllcounts = function(file) {
  let lineCount = getLinesCount(file) - 1;
  let wordCount = getWordCount(file);
  let byteCount = getBytesCount(file);
  return [empty, lineCount, wordCount, byteCount].join(tabspace);
};

const wc = function(fileNames, { readFileSync }) {
  let file = readContent(readFileSync, fileNames[0]);
  let counts = getAllcounts(file);
  return [counts, space, fileNames].join("");
};

module.exports = { wc, getAllcounts };
