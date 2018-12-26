const space = " ";
const newline = "\n";
const empty = "";
const tabspace = "\t";

const splitContent = (seperator, file) => file.split(seperator);

const isNotempty = element => element != empty;

module.exports = {
  space,
  newline,
  empty,
  tabspace,
  splitContent,
  isNotempty
};
