# jpg-streamer

A little module for splitting out individual JPEG files from streams.

## Example
```js
var JpgStreamer = require('jpg-streamer');
var spawn = require('child_process').spawn;

ffmpeg = spawn('ffmpeg', ffmpegArgs);

new JpgStreamer(ffmpeg, , function(err, buffer){
    if (err) throw err;

    fs.writeFile('screenshot_' + fileIndex++ + '.jpg', buffer, function (err) {
      if (err) throw err;
    });
});
```
