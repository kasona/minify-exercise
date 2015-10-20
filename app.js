/*
Make app.css turn into app.min.css

- Need to use Node fs module to read file as readable stream
- Node util method to extend native Transform stream class
- piping?
- Accep targuments fmor the commandline

Transform streams are readable and writable streams
- Data goes into transform stream and can be returned modified or unchanged or not returned at all

npm install minimist

In command line
$ node app.js --input bears.txt --output actualbears.min.txt
$ node mainFile --input FileToBeRead --output FileToBeWritten/Minified
*/

var fs = require('fs');
var Transform = require('stream').Transform;
var inherits = require('util').inherits;
var argv = require('minimist')(process.argv.slice(2));

function ActualBears() {
  Transform.call(this);
}

inherits(ActualBears, Transform);

ActualBears.prototype._transform = function(chunk, enc, done) {
  chunk = chunk.toString().replace(/(\r\n|\n|\r)/gm,'');
  this.push(chunk);
  console.log(this);
  console.log(chunk.toString().replace(/(\r\n|\n|\r)/gm,''));
};

var read = fs.createReadStream(argv.input);
var write = fs.createWriteStream(argv.output);

console.log(argv);

read.pipe(new ActualBears()).pipe(write);