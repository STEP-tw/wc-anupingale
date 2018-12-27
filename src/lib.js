const {
  space,
  newline,
  empty,
  tabspace,
  splitContent,
  isNotempty
} = require("./util.js");

const getLines = splitContent.bind(null, newline);

const getBytes = splitContent.bind(null, empty);

const removeSpaceAndNewline = splitContent.bind(null, /[ \n]+/);

const getWords = file => removeSpaceAndNewline(file).filter(isNotempty);

const getLinesCount = file => getLines(file).length - 1;

const getBytesCount = file => getBytes(file).length;

const getWordCount = file => getWords(file).length;

const formatter = function(details) {
  let { allCounts, file } = details;
  return [allCounts.join(tabspace), " ", file].join("");
};

const getDataAsPerOption = function(fs, options, file) {
  let { readFileSync } = fs;
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

let getTotal = function(firstList, secondList) {
  let outputSum = [];
  for (let counter = 0; counter < firstList.length; counter++) {
    outputSum[counter] = firstList[counter] + secondList[counter];
  }
  return outputSum;
};

const readMultipleFilecontent = function(fs, args) {
  let { options, files } = args;
  let getContent = getDataAsPerOption.bind(null, fs, options);
  let counts = files.map(getContent);
  let countsArray = counts.map(e => e.allCounts);
  counts.push({ allCounts: countsArray.reduce(getTotal), file: "total" });
  return counts.map(formatter).join("\n");
};

const wc = function(args, fs) {
  let { files, options } = args;
  if (files.length == 1) {
    let requiredData = getDataAsPerOption(fs, options, files[0]);
    return formatter(requiredData);
  }
  return readMultipleFilecontent(fs, args);
};

module.exports = { wc, getDataAsPerOption };
