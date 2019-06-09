export function mean(a) {
    return a.reduce((acc, val) => acc + val, 0) / a.length;
}

export function stddev(a) {
    return Math.sqrt(
        1.0 / (a.length - 1) * a.reduce((acc, val) => acc + Math.pow(val - mean(a), 2), 0)
    );
}

