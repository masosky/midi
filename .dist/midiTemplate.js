"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FORMAT = 0;
var TICKS_PER_BEAT = 480;
exports.getMidiJson = function (numTracks, trackNames) {
    var midi = {};
    var header = buildHeader(numTracks);
    midi.header = header;
    midi.tracks = buildTracks(numTracks, trackNames);
    return midi;
};
var buildHeader = function (numTracks) {
    return { format: FORMAT, numTracks: numTracks, ticksPerBeat: TICKS_PER_BEAT };
};
var buildTracks = function (numTracks, trackNames) {
    var tracks = [];
    for (var index = 0; index < numTracks; index++) {
        var name_1 = trackNames[index];
        var track = buildTrack(name_1);
        tracks.push(track);
    }
    return tracks;
};
var buildTrack = function (trackName) {
    return [
        { deltaTime: 0, meta: true, type: "channelPrefix", channel: 1 },
        { deltaTime: 0, meta: true, type: "trackName", text: trackName },
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
            noteNumber: 60,
            velocity: 64,
        },
        {
            deltaTime: 120,
            channel: 1,
            type: "noteOff",
            noteNumber: 60,
            velocity: 64,
        },
        { deltaTime: 1800, meta: true, type: "endOfTrack" },
    ];
};
