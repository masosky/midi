var fs = require("fs");
var parseMidi = require("midi-file").parseMidi;
var writeMidi = require("midi-file").writeMidi;
import { getMidiJson } from "./midiTemplate";
const argv = require('yargs').argv

// Read MIDI file into a buffer
//var input = fs.readFileSync('/Users/xaviermasleszkiewicz/Downloads/Zedd-ft-Selena-Gomez-I-Want-You-To-Know-djzang-20150607210336-nonstop2k.com.mid')
var input = fs.readFileSync("/Users/xaviermasleszkiewicz/Downloads/test4.mid");

// Parse it into an intermediate representation
// This will take any array-like object.  It just needs to support .length, .slice, and the [] indexed element getter.
// Buffers do that, so do native JS arrays, typed arrays, etc.
var parsed = parseMidi(input);
console.log("------");
console.log(JSON.stringify(parsed));
console.log("------");

const midi = getMidiJson(1, ["test"])

// Turn the intermediate representation back into raw bytes
var output = writeMidi(midi);

// Note that the output is simply an array of byte values.  writeFileSync wants a buffer, so this will convert accordingly.
// Using native Javascript arrays makes the code portable to the browser or non-node environments
var outputBuffer = new Buffer(output);

// Write to a new MIDI file.  it should match the original
fs.writeFileSync("copy_star_wars.mid", outputBuffer);
