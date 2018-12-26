const startsWithDash = option => option.startsWith("-");

const hasAllOptions = option => startsWithDash(option) && option.length > 2;

const parse = function(args) {
  let option = args[0].slice(1);

  if (hasAllOptions(option)) {
    return { option, files: args.slice(1) };
  }
  return { option: "lcw", files: args.slice(0) };
};

module.exports = { parse };
