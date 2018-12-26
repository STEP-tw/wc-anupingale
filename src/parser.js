const startsWithDash = option => option.startsWith("-");

const parse = function(args) {
  let options = args.filter(arg => startsWithDash(arg));
  if (options.length == 0) {
    options = ["-l", "-w", "-c"];
  }

  if (args.length == 1) {
    return { options, files: args };
  }
  return { options, files: args.slice(1) };
};

module.exports = parse;
