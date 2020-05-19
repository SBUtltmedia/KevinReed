ffmpeg -i '.\blank.mp4' -vf
"[in]drawtext='fontfile=c\:/Windows/Fonts/Effra-Regular.ttf:fontsize=40:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/4:text=Module
1',drawtext='fontfile=c\:/Windows/Fonts/Effra-Regular.ttf:fontsize=30:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/1.5:text=Distribution
of',drawtext='fontfile=c\:/Windows/Fonts/Effra-Regular.ttf:fontsize=30:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/1.2:text=Rain Formation I'" -y out.mp4