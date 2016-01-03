(function () {
  "use strict";

  var JpgStreamer = require('../')
    , assert = require('assert')
    , fs = require('fs')
    , spawn = require('child_process').spawn
    , individualImageFiles = ['1.jpg', '2.jpg']
    ;

  function compareFilesWithCounter(counter, fileName, file, done) {
    return function(err, data) {
      if (err) {
        throw err;
      }
      assert.equal(file.toString('hex'), data, "Unequal stuff in " + counter);
      if (counter === 1) {
        done();
      }
    };
  };

  describe('jpgStreamer', function() {
    it('correctly finds jpeg file from a stream', function(done) {
      var jpgStreamer
        , testFileStream
        , timesCalled = 0
        ;

      timesCalled = 0;
      testFileStream = spawn('cat', ['test/3.jpg']);
      jpgStreamer = new JpgStreamer(testFileStream, function(err, data) {
        var fileName;
        if (err) {
          throw err;
        }
        fileName = "test/" + individualImageFiles[timesCalled++];
        fs.readFile(fileName, 'hex', compareFilesWithCounter(timesCalled, fileName, data, done));
      });
    });
  });
}());
