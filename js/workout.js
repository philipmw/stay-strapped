"use strict";
exports.__esModule = true;
var fs = require('fs');
function readFileSync(filename) {
    return fs.readFileSync(filename)
        .toString('ascii')
        .split('\r\n')
        .map(function (line, i) {
        if (line === "" || i === 0) {
            return null;
        }
        else {
            return csvLineToObject(line);
        }
    })
        .filter(function (o) { return o !== null; });
}
exports.readFileSync = readFileSync;
function csvLineToObject(line) {
    var attrs = line.split(',').map(function (quotedAttr) { return quotedAttr.slice(1, -1); });
    return {
        'n': Number(attrs[0]),
        'time_secs': Number(attrs[1]),
        'dist_m': Number(attrs[2]),
        'pace_sec': Number(attrs[3]),
        'watts': Number(attrs[4]),
        'calhr': Number(attrs[5]),
        'strokerate': Number(attrs[6]),
        'hr': Number(attrs[7])
    };
}
