const assert = require("assert");
const parse = require("../src/parser.js");

describe("parse", function() {
  it("should return object of options(-l) and filename", function() {
    actualOutput = parse(["-l", "file1"]);
    expectedOutput = { options: "l", files: ["file1"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return object of option(-c) and filename", function() {
    actualOutput = parse(["-c", "file1"]);
    expectedOutput = { options: "c", files: ["file1"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return object of option(-w) and filename", function() {
    actualOutput = parse(["-w", "file1"]);
    expectedOutput = { options: "w", files: ["file1"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  describe("should return object of multiple options if multiple options are specified", function() {
    it("lwc file1", function() {
      actualOutput = parse(["-lcw", "file1"]);
      expectedOutput = { options: "lcw", files: ["file1"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("wlc file1", function() {
      actualOutput = parse(["-wlc", "file1"]);
      expectedOutput = { options: "wlc", files: ["file1"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("clw file1", function() {
      actualOutput = parse(["-clw", "file1"]);
      expectedOutput = { options: "clw", files: ["file1"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  it("should return lcw as default option if options are not specified", function() {
    actualOutput = parse(["file1"]);
    expectedOutput = { options: "lcw", files: ["file1"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return multiple options when multiple options are specified with having space in betn", function() {
    actualOutput = parse(["-l", "-c", "-w", "file1"]);
    expectedOutput = { options: "lcw", files: ["file1"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return all options when only file name is specified without options", function() {
    actualOutput = parse(["file1"]);
    expectedOutput = { options: "lcw", files: ["file1"] };
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
