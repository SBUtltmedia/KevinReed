
const fs = require('fs');
const csv = require('csv-parser');
const stripBom = require('strip-bom-stream');
const { spawn } = require('child_process')
const process = require('process');

const debug = false;
var basePath=`videos/`;
var SplitFolders =basePath+"Split Files";
var SourceLectures =basePath;
// var startTime = '00:02:20';
// var endTime = '00:06:13';

var csvName = `csv/${process.argv[3]}.csv`
var index = 0;
var runFfmpeg=true;
fs.createReadStream(csvName)
    .pipe(stripBom())
    .pipe(csv())
    .on('data',
        (row) => {
          index++;
          if(row['Video Start Time']){
          makenewVideo(row);
          }
        })
    .on('end', function() {
      // some final operation
    });

function toSeconds(atime) {
var hh =parseInt(atime.split(":")[0]);
var mm =parseInt(atime.split(":")[1]);
var ss =parseInt(atime.split(":")[2]);
var deciseconds =parseInt(atime.split(".")[1])||0;
// console.log(atime,hh,mm,ss,deciseconds)
  return hh*3600+ mm * 60 + ss +deciseconds/100;
}

function makenewVideo(row) {

  fileName= `${process.argv[2]}.mp4`
//row['Topic'], row['Subtopic'],row['Filename'], row['Video Start Time'],  row['Video End Time']

    var recompress=['-codec','copy','-copyts'];;
    var startTimeSeconds = toSeconds(row['Video Start Time'])
    var endTimeSeconds = toSeconds(row['Video End Time'])
    if(row['recompress']) {
      recompress =['-vcodec','libx264'];
      console.log("recompressing",...recompress)
    }

    recompress =['-vcodec','libx264','-copyts'];


    // var currentVideo = `${SplitFolders}/${row['Topic']}/${row['Subtopic']}`
    var currentVideo = `${SplitFolders}`

    var outFile=  `${currentVideo}/${row['Filename']}.mp4`.replace(" ","\ ")

	fs.mkdir(currentVideo, {recursive : true}, (err) => {
      if (err) {
        throw err;
      } else {
        if (runFfmpeg){
          console.log("splitting",outFile,"from",fileName)
          var loglevel = debug ? 'debug' : 'error';
        const ffmpeg = spawn('ffmpeg', ['-ss', `${startTimeSeconds}`,'-y','-i', `${SourceLectures}/${fileName}`, '-to', `${endTimeSeconds}`,...recompress,'-loglevel', `${loglevel}` ,outFile,]);
        ffmpeg.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        ffmpeg.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        });

        ffmpeg.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
}





      }
  })
}
