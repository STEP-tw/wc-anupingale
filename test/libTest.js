const assert = require("assert");
const { wc, getSingleFileContent } = require("../src/lib.js");
const mockReader = require("./util.js");

let expectedFilePaths = {
  digits: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
  numbers: " one\n two\n three\n four\n five\n six\n seven\n eight\n nine\n ten"
};

const fs = mockReader(expectedFilePaths);

describe("wc", function() {
  it("should return line, byte and word count when only file name is specified", function() {
    actualOutput = wc({ options: "lcw", files: ["digits"] }, fs);
    expectedOutput = "9\t10\t20 digits";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return line, byte and word count when file content includes "\\n" and " " as a seperators', function() {
    actualOutput = wc({ options: "lcw", files: ["numbers"] }, fs);
    expectedOutput = "9\t10\t58 numbers";
    assert.deepEqual(actualOutput, expectedOutput);
  });

  describe('should return line, byte and word count when all options are specified with ""', function() {
    it("lcw", function() {
      actualOutput = wc({ options: "lcw", files: ["numbers"] }, fs);
      expectedOutput = "9\t10\t58 numbers";
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it("clw", function() {
      actualOutput = wc({ options: "clw", files: ["numbers"] }, fs);
      expectedOutput = "9\t10\t58 numbers";
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it("wlc", function() {
      actualOutput = wc({ options: "wlc", files: ["numbers"] }, fs);
      expectedOutput = "9\t10\t58 numbers";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe("multiple files", function() {
    it('should return content of multiple files with total if "lcw" is specified as option', function() {
      actualOutput = wc({ options: "lcw", files: ["numbers", "digits"] }, fs);
      expectedOutput = "9\t10\t58 numbers\n9\t10\t20 digits\n18\t20\t78 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return content of multiple files with total if "clw" is specified as option"', function() {
      actualOutput = wc({ options: "lcw", files: ["numbers", "digits"] }, fs);
      expectedOutput = "9\t10\t58 numbers\n9\t10\t20 digits\n18\t20\t78 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return content of multiple files with total if "wlc" is specified as option"', function() {
      actualOutput = wc({ options: "lcw", files: ["numbers", "digits"] }, fs);
      expectedOutput = "9\t10\t58 numbers\n9\t10\t20 digits\n18\t20\t78 total";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("getSingleFileContent", function() {
  it("should return line count when l is specified as option with filename", function() {
    actualOutput = getSingleFileContent(fs, "l", "numbers");
    expectedOutput = { allCounts: [9], file: "numbers" };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return line count when c is specified as option with filename", function() {
    actualOutput = getSingleFileContent(fs, "c", "numbers");
    expectedOutput = { allCounts: [58], file: "numbers" };
    assert.deepEqual(actualOutput, expectedOutput);
  });
  it("should return line count when w is specified as option with filename", function() {
    actualOutput = getSingleFileContent(fs, "w", "numbers");
    expectedOutput = { allCounts: [10], file: "numbers" };
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
