const FORMAT: Number = 0;
const TICKS_PER_BEAT: Number = 480;

export const getMidiJson = (
  numTracks: Number,
  trackNames: Array<String>
): MidiJson => {
  const midi: any = {};
  const header = buildHeader(numTracks);
  midi.header = header;
  midi.tracks = buildTracks(numTracks, trackNames);
  return midi;
};

const buildHeader = (numTracks: Number) => {
  return { format: FORMAT, numTracks, ticksPerBeat: TICKS_PER_BEAT };
};

const buildTracks = (numTracks: Number, trackNames: Array<String>) => {
  const tracks: Array<Array<Object>> = [];
  for (let index = 0; index < numTracks; index++) {
    const name: String = trackNames[index];
    const track: Array<Object> = buildTrack(name);
    tracks.push(track);
  }
  return tracks;
};

const buildTrack = (trackName: String): Array<Object> => {
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

interface MidiJson {
  header: any;
  tracks: Array<Object>;
}
