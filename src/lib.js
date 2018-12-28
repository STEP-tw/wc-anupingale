const newline = "\n";
const empty = "";
const space = " ";
const tabspace = "\t";

const { splitContent, isNotempty } = require("./util.js");

const getLines = splitContent.bind(null, newline);

const getBytes = splitContent.bind(null, empty);

const removeSpaceAndNewline = splitContent.bind(null, /[ \n]+/);

const hasSingleFile = files => files.length == 1;

const getWords = file => removeSpaceAndNewline(file).filter(isNotempty);

const getLinesCount = file => getLines(file).length - 1;

const getBytesCount = file => getBytes(file).length;

const getWordCount = file => getWords(file).length;

const formatter = ({ allCounts, file }) =>
  [allCounts.join(tabspace), space, file].join("");

const getSingleFileContent = function({ readFileSync }, options, file) {
  let content = readFileSync(file, "utf8");
  let allCounts = [];

  if (options.includes("l")) {
    allCounts.push(getLinesCount(content));
  }

  if (options.includes("w")) {
    allCounts.push(getWordCount(content));
  }

  if (options.includes("c")) {
    allCounts.push(getBytesCount(content));
  }
  return { allCounts, file };
};

let calculateTotal = function(firstList, secondList) {
  let total = [];
  for (let counter = 0; counter < firstList.length; counter++) {
    total[counter] = firstList[counter] + secondList[counter];
  }
  return total;
};

const readMultipleFilecontent = function(fs, { options, files }) {
  let getContent = getSingleFileContent.bind(null, fs, options);
  let details = files.map(getContent);
  let counts = details.map(e => e.allCounts);
  let totalOfCounts = {
    allCounts: counts.reduce(calculateTotal),
    file: "total"
  };
  details.push(totalOfCounts);
  return details.map(formatter).join("\n");
};

const wc = function(args, fs) {
  let { files, options } = args;
  if (hasSingleFile(files)) {
    return formatter(getSingleFileContent(fs, options, files[0]));
  }
  return readMultipleFilecontent(fs, args);
};

module.exports = { wc, getSingleFileContent };
