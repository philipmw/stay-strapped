module.exports = function () {
  return {
    files: [
      '*.ts',
      '!*.test.ts'
    ],

    tests: [
      '*.test.ts'
    ],

    env: {
      type: 'node'
    },

    "testFramework": "jest"
  };
};