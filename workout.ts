import {file} from "@babel/types";

const fs = require('fs');

interface Stroke {
  n: number;
  time_secs: number;
  dist_m: number;
  pace_sec: number;
  watts: number;
  calhr: number;
  strokerate: number;
  hr: number;
}

export function readFileSync(filename): Stroke[] {
  return fs.readFileSync(filename)
    .toString('ascii')
    .split('\r\n')
    .map((line, i) => {
      if (line === "" || i === 0) {
        return null;
      } else {
        return csvLineToObject(line)
      }
    })
    .filter((o) => o !== null);
}

function csvLineToObject(line): Stroke {
  const attrs = line.split(',').map((quotedAttr) => quotedAttr.slice(1, -1));
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