const fs = require('fs');
const csv = require('csv-parser');
const stripBom = require('strip-bom-stream');
const {
    spawn
} = require('child_process')
const process = require('process');


const debug = false;
var basePath = `videos/`;
var SplitFolders = basePath + "Split Files";
var CombineFolder = basePath + "CombineFolders";


var csvName = `csv/${process.argv[2]}.csv`
var index = 0;
var runFfmpeg = true;
combinegroup = {}
fs.createReadStream(csvName)
    .pipe(stripBom())
    .pipe(csv())
    .on('data',
        (row) => {
            // console.log(row)
            index++;
          
            if (row['Split File']) {
                if (!(row['Combined File'] in combinegroup)) {

                    combinegroup[row['Combined File']] = []
                }
                combinegroup[row['Combined File']].push(row['Split File']+".mp4")
            }
        })
    .on('end', function () {
        console.log(combinegroup)
        combineFiles()
    });

function toSeconds(atime) {
    var hh = parseInt(atime.split(":")[0]);
    var mm = parseInt(atime.split(":")[1]);
    var ss = parseInt(atime.split(":")[2]);
    var deciseconds = parseInt(atime.split(".")[1]) || 0;
    // console.log(atime,hh,mm,ss,deciseconds)
    return hh * 3600 + mm * 60 + ss + deciseconds / 100;
}

function combineFiles() {

    Object.keys(combinegroup).forEach((key) => {
        mylist = "";
        combinegroup[key].forEach((group) => {
            mylist += `file '${SplitFolders}/${group.replace("'", "'\\''")}'\n`
        })
       
        fs.writeFile(`${key}.txt`, mylist, function (err) {
        doFF(key);
          
        });
   
    })


    //row['Topic'], row['Subtopic'],row['Filename'], row['Video Start Time'],  row['Video End Time']



    // var currentVideo = `${SplitFolders}/${row['Topic']}/${row['Subtopic']}`
    var currentVideo = `${SplitFolders}`

    var copy=["-c","copy","-copyts"]
    var copy=[];
    // fs.mkdir(currentVideo, {
    //     recursive: true
    // }, (err) => {
    //     if (err) {
    //         throw err;
    //     } else {
    //         if (runFfmpeg) {
    //             var outFile = `${currentVideo}/${row['Filename']}.mp4`.replace(" ", "\ ")
    function doFF(key){
                 var loglevel = debug ? 'debug' : 'error';
                const ffmpeg = spawn('ffmpeg', ["-y","-f", "concat","-safe", "0","-i",`${key}.txt`,...copy ,'-loglevel', `${loglevel}`,`${CombineFolder}/${key}.mp4` ]);
                ffmpeg.stdout.on('data', (data) => {
                   //   console.log(`stdout: ${data}`);
                });

                ffmpeg.stderr.on('data', (data) => {
                  console.log(`stderr: ${data}`);
                });

                ffmpeg.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });
            }
    //         }





    //     }
    // })
}