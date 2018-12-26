const utf8Reader = function(expectedFilePaths, expectedEncoding) {
  return function(actualFilePath, actualEncoding) {
    if (expectedEncoding === actualEncoding) {
      return expectedFilePaths[actualFilePath];
    }
  };
};

const existsSync = function(expectedFilePaths) {
  return function(actualFileName) {
    return actualFileName in expectedFilePaths;
  };
};

const mockReader = function(expectedFilePaths) {
  return {
    readFileSync: utf8Reader(expectedFilePaths, "utf8"),
    existsSync: existsSync(expectedFilePaths)
  };
};

module.exports = mockReader;
