const startsWithDash = option => option.startsWith("-");

const getIndex = function(element) {
  return !startsWithDash(element);
};

const parse = function(args) {
  let defaultOption = "-lcw";
  let divider = args.findIndex(getIndex);
  if (divider < 0) divider = args.length;
  let options = args.slice(0, divider).join("") || defaultOption;
  let files = args.slice(divider);
  return { options, files };
};

module.exports = parse;
