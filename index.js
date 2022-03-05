const fs = require("fs");
const querystring = require("querystring");

// BT 1
const arr = [1, 2, 3, 4, 5, 6, 6, 6, 7, 8, 8, 9, 10];
console.log([...new Set(arr.filter((n) => n % 2 === 0))]);

// BT 2
let rawdata = fs.readFileSync("data/json-data.json");
const data = JSON.parse(rawdata);
console.log(data);

// BT 3
const decoded = querystring.encode(data);
console.log(decoded);

// BTVN
const file1 = fs.readFileSync("data/file1.txt", "utf-8");
const file2 = fs.readFileSync("data/file2.txt", "utf-8");
fs.writeFileSync("data/finish-sync.txt", `${file1} ${file2}`);
