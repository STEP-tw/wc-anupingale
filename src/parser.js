const startsWithDash = option => option.startsWith("-");

const hasMultipleOption = option => option.length > 1;

const removeDash = function(options) {
  return options.map(option => option.slice(1)).join("");
};

const parse = function(args) {
  let option = args.filter(arg => startsWithDash(arg));
  let options = removeDash(option) || "lcw";
  if (hasMultipleOption(options)) {
    return { options, files: args.slice(option.length) };
  }
  return { options, files: args.slice(1) };
};

module.exports = parse;
