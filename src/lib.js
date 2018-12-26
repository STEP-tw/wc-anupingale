const space = " ";
const newline = "\n";
const empty = "";
const tabspace = "\t";

const splitContent = (seperator, file) => file.split(seperator);
const getLength = content => content.length;
const isNotempty = element => element != empty;

const getLines = splitContent.bind(null, newline);
const getBytes = splitContent.bind(null, empty);
const removeSpaceAndNewline = splitContent.bind(null, /[ \n]+/);

const getWords = function(file) {
  return removeSpaceAndNewline(file).filter(isNotempty);
};

const wc = function(fileNames, fs) {
  let { readFileSync } = fs;
  let counts = [empty];
  let file = readFileSync(fileNames[0], "utf8");
  counts.push(getLength(getLines(file)) - 1);
  counts.push(getLength(getWords(file)));
  counts.push(getLength(getBytes(file)));
  return [counts.join(tabspace), space, fileNames].join("");
};

module.exports = { wc };
