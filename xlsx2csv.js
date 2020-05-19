XLSX = require('xlsx');
// iconv = require('iconv-lite');
// fs=require('fs');
const process = require('process');
const workBook = XLSX.readFile(process.argv[2],{type:"string"});
// originalFile = fs.readFileSync(process.argv[2], {encoding: 'binary'});
// workBook = decode(originalFile, 'iso88591');
var outfile=`${process.argv[2].split('.')[0]}.csv`
XLSX.writeFile(workBook, outfile, { bookType: "csv",type:"string"});