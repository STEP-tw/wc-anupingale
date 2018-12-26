const {
  space,
  newline,
  empty,
  tabspace,
  splitContent,
  getLength,
  isNotempty
} = require("./util.js");

const getLines = splitContent.bind(null, newline);

const getBytes = splitContent.bind(null, empty);

const removeSpaceAndNewline = splitContent.bind(null, /[ \n]+/);

const readContent = (readFileSync, file) => readFileSync(file, "utf8");

const getWords = file => removeSpaceAndNewline(file).filter(isNotempty);

const getAllcounts = function(content) {
  let lineCount = getLength(getLines(content)) - 1;
  let wordCount = getLength(getWords(content));
  let byteCount = getLength(getBytes(content));
  return [empty, lineCount, wordCount, byteCount].join(tabspace);
};

const wc = function(fileNames, { readFileSync }) {
  let file = readContent(readFileSync, fileNames[0]);
  let counts = getAllcounts(file);
  return [counts, space, fileNames].join("");
};

module.exports = { wc, getAllcounts };
