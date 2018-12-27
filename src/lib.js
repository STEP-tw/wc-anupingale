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
  return [empty, lineCount, wordCount, byteCount];
};

const getFileContent = function(fs, file) {
  let { readFileSync, existsSync } = fs;
  let content = readContent(readFileSync, file);
  let count = getAllcounts(content);
  return { file, count };
};

const formatter = function(fileDetail) {
  let { file, count } = fileDetail;
  return [count.join(tabspace), space, file].join("");
};

const getTotalCount = function(result, fileDetail) {
  let { count } = fileDetail;
  let { line, byte, word } = result;
  line = line + count[1];
  word = word + count[2];
  byte = byte + count[3];
  return { line, byte, word };
};

const getDataAsPerOption = function(fs, args) {
  let { readFileSync } = fs;
  let { options, files } = args;
  let content = readFileSync(files[0], "utf8");
  let output = "";

  if (options.includes("l")) {
    output += "\t" + getLinesCount(content) - 1;
  }

  if (options.includes("w")) {
    output += "\t" + getWordCount(content);
  }

  if (options.includes("c")) {
    output += "\t" + getBytesCount(content);
  }
  return output + " " + files[0];
};

const readMultipleFilecontent = function(fs, files) {
  let fetchContent = getFileContent.bind(null, fs);
  let fileDetails = files.map(fetchContent);
  let count = fileDetails.reduce(getTotalCount, {
    line: 0,
    word: 0,
    byte: 0
  });

  fileDetails.push({
    count: ["", count.line, count.word, count.byte],
    file: "total"
  });
  return fileDetails.map(formatter).join("\n");
};

const wc = function(args, fs) {
  let { files } = args;
  if (files.length == 1) {
    return getDataAsPerOption(fs, args);
  }
  return readMultipleFilecontent(fs, files);
};

module.exports = { wc, getAllcounts, getDataAsPerOption };
