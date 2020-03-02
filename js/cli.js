"use strict";
exports.__esModule = true;
var Dataset_1 = require("./Dataset");
var workout_1 = require("./workout");
console.log("argv: " + process.argv);
var filename = process.argv[2];
console.log("filename: " + filename);
var hr = workout_1.readFileSync(filename).map(function (o) { return o.hr; });
console.log("hr: " + hr);
var dataset = new Dataset_1.Dataset(hr, 5);
console.log(dataset.signal());
