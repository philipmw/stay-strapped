import { Dataset } from './Dataset';
import { readFileSync } from './workout';

console.log("argv: " + process.argv);

const filename = process.argv[2];
console.log("filename: " + filename);

const hr = readFileSync(filename).map((o) => o.hr);
console.log("hr: " + hr);

const dataset = new Dataset(hr, 50);

console.log(dataset.signal());
