const assert = require("assert");
const { wc } = require("../src/lib.js");
const mockReader = require("./util.js");

let expectedFilePaths = {
  digits: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
  numbers: " one\n two\n three\n four\n five\n six\n seven\n eight\n nine\n ten"
};

const fs = mockReader(expectedFilePaths);

describe("wc", function() {
  it("should return line, byte and word count when only file name is specified", function() {
    actualOutput = wc(["digits"], fs);
    expectedOutput = "\t10\t10\t20 digits";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return line, byte and word count when file content includes "\\n" and " " as a seperators', function() {
    actualOutput = wc(["numbers"], fs);
    expectedOutput = "\t10\t10\t58 numbers";
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
