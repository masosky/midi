var fs = require("fs");
var parseMidi = require("midi-file").parseMidi;
var writeMidi = require("midi-file").writeMidi;
import { getMidiJson } from "./midiTemplate";
const argv = require("yargs").argv;

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

const midi = getMidiJson(1, ["test"]);

// Turn the intermediate representation back into raw bytes
var output = writeMidi({
    header: { format: 0, numTracks: 1, ticksPerBeat: 480 },
    tracks: [
      [
        { deltaTime: 0, meta: true, type: "channelPrefix", channel: 1 },
        { deltaTime: 0, meta: true, type: "trackName", text: "The Final Lead" },
        {
          deltaTime: 0,
          meta: true,
          type: "instrumentName",
          text: "The Final Lead",
        },
        {
          deltaTime: 0,
          meta: true,
          type: "timeSignature",
          numerator: 4,
          denominator: 4,
          metronome: 24,
          thirtyseconds: 8,
        },
        { deltaTime: 0, meta: true, type: "keySignature", key: 0, scale: 0 },
        {
          deltaTime: 0,
          meta: true,
          type: "smpteOffset",
          frameRate: 25,
          hour: 1,
          min: 0,
          sec: 0,
          frame: 0,
          subFrame: 0,
        },
        {
          deltaTime: 0,
          meta: true,
          type: "setTempo",
          microsecondsPerBeat: 500000,
        },
        {
          deltaTime: 0,
          channel: 1,
          type: "noteOn",
          noteNumber: 72,
          velocity: 64,
        },
        {
          deltaTime: 120,
          channel: 1,
          type: "noteOff",
          noteNumber: 72,
          velocity: 64,
        },
        { deltaTime: 1800, meta: true, type: "endOfTrack" },
      ],
    ],
  });

// Note that the output is simply an array of byte values.  writeFileSync wants a buffer, so this will convert accordingly.
// Using native Javascript arrays makes the code portable to the browser or non-node environments
var outputBuffer = new Buffer(output);

// Write to a new MIDI file.  it should match the original
fs.writeFileSync("copy_star_wars.mid", outputBuffer);
