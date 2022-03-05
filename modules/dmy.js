const { getDateInYMD } = require("./ymd");

const dateInYMD = getDateInYMD();

const dateInDMY = [
  dateInYMD.getDay(),
  dateInYMD.getMonth(),
  dateInYMD.getFullYear(),
].join("/");

console.log(dateInYMD);
