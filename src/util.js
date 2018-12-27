const empty = "";

const splitContent = (seperator, file) => file.split(seperator);

const isNotempty = element => element != empty;

module.exports = {
  splitContent,
  isNotempty
};
