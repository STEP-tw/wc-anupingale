const { wc } = require("./src/lib.js");
const fs = require("fs");

const main = function() {
  let args = process.argv.slice(2);
  console.log(wc(args, fs));
};

main();
