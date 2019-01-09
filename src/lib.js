const newline = "\n";
const empty = "";
const space = " ";
const tabspace = "\t";

const { splitContent, isNotempty } = require("./util.js");

const getLines = splitContent.bind(null, newline);

const getBytes = splitContent.bind(null, empty);

const removeSpaceAndNewline = splitContent.bind(null, /[ \n]+/);

const getWords = file => removeSpaceAndNewline(file).filter(isNotempty);

const getLinesCount = file => getLines(file).length - 1;

const getBytesCount = file => getBytes(file).length;

const getWordCount = file => getWords(file).length;

const formatter = ({ allCounts, file }) =>
	[allCounts.join(tabspace), space, file].join("");

const calculateTotal = function(firstList, secondList) {
	let total = [];
	for (let counter = 0; counter < firstList.length; counter++) {
		total[counter] = firstList[counter] + secondList[counter];
	}
	return total;
};

const getSingleFileContent = function(options, content) {
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
	return allCounts;
};

const singleFileContents = function(fileCounts) {
	process.stdout.write(formatter(fileCounts[0]));
	return;
};

const multipleFileContent = function(fileCounts) {
	let counts = fileCounts.map(e => e.allCounts);
	let totalOfCounts = {
		allCounts: counts.reduce(calculateTotal),
		file: "total"
	};
	fileCounts.push(totalOfCounts);
	let finaloutput = fileCounts.map(formatter).join("\n");
	process.stdout.write(finaloutput);
};

const wc = function(args, fs) {
	let fileCounts = [];
	let { files, options } = args;
	for (let index in files) {
		fs.readFile(files[index], "utf8", function(err, content) {
			let allCounts = getSingleFileContent(options, content);
			fileCounts[index] = { allCounts, file: files[index] };
			if (fileCounts.filter(x => x).length == files.length) {
				if (files.length == 1) {
					return singleFileContents(fileCounts);
				}
				return multipleFileContent(fileCounts);
			}
		});
	}
};

module.exports = { wc, getSingleFileContent };
