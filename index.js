(function () {
  "use strict";
  var fs = require('fs')
    , stream = require('stream')
    , JPEG_HEADER_BUF
    , JPEG_HEADER_STRING
    , JpgStreamer
    ;

  JPEG_HEADER_BUF = new Buffer([0xFF, 0xD8, 0xFF]);
  JPEG_HEADER_STRING = JPEG_HEADER_BUF.toString('binary');

  JpgStreamer =  (function () {
    function JpgStreamer(subprocess, cb) {
      var self = this
        ;
      this.cb = cb;
      this.acc = '';
      subprocess.stdout.on('data', function(data) {
        self.acc += data.toString('binary');
        self.acc = self.searchForJpg(self.acc, self.cb);
      });
    }

    JpgStreamer.prototype.searchForJpg = function(dataString, cb) {
      var files
        , loc
        , jpgFile
        ;

      loc = dataString.indexOf(JPEG_HEADER_STRING, 1);
      if (loc === -1) {
        return dataString;
      }

      files = dataString.split(JPEG_HEADER_STRING);
      jpgFile = new Buffer(JPEG_HEADER_STRING + files[0] + files[1], 'binary');
      this.newestImage = jpgFile;
      cb(null, jpgFile);
      return this.searchForJpg(JPEG_HEADER_STRING + files.slice(2).join(JPEG_HEADER_STRING), cb);
    };

    return JpgStreamer;
  })();

  module.exports = JpgStreamer;
}());
