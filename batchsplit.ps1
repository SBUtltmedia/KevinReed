$i =15
 While($true){node .\splitter.js video_stage_$i Lecture_$i
 $i++
    if ($i -gt 15) {
      Break
       } }