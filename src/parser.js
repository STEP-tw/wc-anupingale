const startsWithDash = option => option.startsWith("-");

const parse = function(args) {
  let options = args.filter(arg => startsWithDash(arg));
  if (options.length == 0 && args.length == 1) {
    options = ["-lcw"];
    return { options, files: args };
  }
  if (options.length > 1) {
    return { options, files: args.slice(options.length) };
  }
  return { options, files: args.slice(1) };
};

module.exports = parse;
