const startsWithDash = option => option.startsWith("-");

const hasAllOptions = option => startsWithDash(option) && option.length > 2;

const parse = function(args) {
  if (args.length == 1) {
    return { files: args };
  }
  return { files: args.slice(1) };
};

module.exports = { parse };
